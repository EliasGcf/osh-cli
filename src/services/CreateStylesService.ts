import fs from 'fs';
import path from 'path';
import Handlebars from 'handlebars';

import reactPath from '../utils/reactPath';

interface CreateStylesServiceData {
  componentName: string;
  folder: string;
  isTypeScript: boolean;
}

class CreateStylesService {
  public async execute({
    componentName,
    folder,
    isTypeScript,
  }: CreateStylesServiceData): Promise<string> {
    const extensionPath = isTypeScript ? 'ts' : 'js';
    const folderWithName = `${folder}/${componentName}`; // src/components/Input

    // src/components/Input/style.{ts||js}
    const fullFolderWithNameAndExtension = `${folderWithName}/style.${extensionPath}`;

    const pathTemplate = path.join(
      __dirname,
      '..',
      'templates',
      reactPath(),
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
