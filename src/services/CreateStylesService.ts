import fs from 'fs';
import path from 'path';
import Handlebars from 'handlebars';

import reactPath from '../utils/reactPath';

interface CreateStylesServiceData {
  componentName: string;
  folder: string;
  isTypeScript: boolean;
  isWeb: boolean;
  isMobile: boolean;
}

class CreateStylesService {
  public async execute({
    componentName,
    folder,
    isTypeScript,
    isWeb,
    isMobile,
  }: CreateStylesServiceData): Promise<string> {
    const extensionPath = isTypeScript ? 'ts' : 'js';
    const folderWithName = `${folder}/${componentName}`; // src/components/Input
    let environmentPath = '';

    if (isWeb) {
      environmentPath = 'reactjs';
    } else if (isMobile) {
      environmentPath = 'react-native';
    } else {
      environmentPath = reactPath();
    }

    // src/components/Input/style.{ts||js}
    const fullFolderWithNameAndExtension = `${folderWithName}/styles.${extensionPath}`;

    const pathTemplate = path.join(
      __dirname,
      '..',
      'templates',
      environmentPath,
      'styles.hbs',
    );
    const sourceTemplate = await fs.promises.readFile(pathTemplate, 'utf8');
    const source = Handlebars.compile(sourceTemplate)({});

    await fs.promises.mkdir(folderWithName, { recursive: true });
    await fs.promises.writeFile(fullFolderWithNameAndExtension, source);

    return fullFolderWithNameAndExtension;
  }
}

export default new CreateStylesService();
