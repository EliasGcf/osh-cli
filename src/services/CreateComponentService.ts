import fs from 'fs';
import path from 'path';
import Handlebars from 'handlebars';

import componentExists from '../utils/componentExists';
import AppError from '../errors/AppError';

import reactPath from '../utils/reactPath';

interface CreateComponentServiceData {
  componentName: string;
  folder: string;
  isTypeScript: boolean;
  isWeb: boolean;
  isMobile: boolean;
}

class CreateComponentService {
  public async execute({
    componentName,
    folder,
    isTypeScript,
    isWeb,
    isMobile,
  }: CreateComponentServiceData): Promise<string> {
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

    if (componentExists({ folder, componentName })) {
      throw new AppError(`Component '${folderWithName}' already exists`);
    }

    // src/components/Input/index.{tsx||js}
    const fullFolderWithNameAndExtension = `${folderWithName}/index.${
      extensionPath === 'ts' ? 'tsx' : 'js'
    }`;

    const pathTemplate = path.join(
      __dirname,
      '..',
      'templates',
      environmentPath,
      extensionPath,
      'component.hbs',
    );
    const sourceTemplate = await fs.promises.readFile(pathTemplate, 'utf8');
    const source = Handlebars.compile(sourceTemplate)({ componentName });

    await fs.promises.mkdir(folderWithName, { recursive: true });
    await fs.promises.writeFile(fullFolderWithNameAndExtension, source);

    return fullFolderWithNameAndExtension;
  }
}

export default new CreateComponentService();
