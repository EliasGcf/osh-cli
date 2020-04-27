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
}

class CreateComponentService {
  public async execute({
    componentName,
    folder,
    isTypeScript,
  }: CreateComponentServiceData): Promise<string> {
    const extensionPath = isTypeScript ? 'ts' : 'js';
    const folderWithName = `${folder}/${componentName}`; // src/components/Input

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
      reactPath(),
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
