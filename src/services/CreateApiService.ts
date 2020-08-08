import fs from 'fs';
import path from 'path';
import Handlebars from 'handlebars';

import componentExists from '../utils/componentExists';
import AppError from '../errors/AppError';

interface CreateApiServiceData {
  folder: string;
  isTypeScript: boolean;
}

class CreateApiService {
  public async execute({
    folder, // src/services
    isTypeScript,
  }: CreateApiServiceData): Promise<string> {
    const extensionPath = isTypeScript ? 'ts' : 'js';
    const apiFileNameWithExtension = `api.${extensionPath}`;

    if (componentExists({ folder, componentName: apiFileNameWithExtension })) {
      throw new AppError(
        `File '${folder}/${apiFileNameWithExtension}' already exists`,
      );
    }

    const fullFolderWithNameAndExtension = `${folder}/${apiFileNameWithExtension}`;

    const pathTemplate = path.join(
      __dirname,
      '..',
      'templates',
      'apiService.hbs',
    );

    const sourceTemplate = await fs.promises.readFile(pathTemplate, 'utf8');
    const source = Handlebars.compile(sourceTemplate)({});

    await fs.promises.mkdir(folder, { recursive: true });
    await fs.promises.writeFile(fullFolderWithNameAndExtension, source);

    return fullFolderWithNameAndExtension;
  }
}

export default new CreateApiService();
