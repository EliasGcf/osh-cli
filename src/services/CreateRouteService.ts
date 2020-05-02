import fs from 'fs';
import path from 'path';
import Handlebars from 'handlebars';

import componentExists from '../utils/componentExists';
import AppError from '../errors/AppError';

interface CreateRouteServiceData {
  routeName: string;
  folder: string;
  isTypeScript: boolean;
}

class CreatePageService {
  public async execute({
    routeName,
    folder,
    isTypeScript,
  }: CreateRouteServiceData): Promise<string> {
    const extensionPath = isTypeScript ? 'ts' : 'js';
    const fullFolderWithNameAndExtension = `${folder}/${routeName}.routes.${extensionPath}`;

    if (
      componentExists({
        folder,
        componentName: `${routeName}.routes.${extensionPath}`,
      })
    ) {
      throw new AppError(
        `Route '${fullFolderWithNameAndExtension}' already exists`,
      );
    }

    const pathTemplate = path.join(
      __dirname,
      '..',
      'templates',
      'nodejs',
      'route.hbs',
    );
    const sourceTempalte = await fs.promises.readFile(pathTemplate, 'utf8');
    const source = Handlebars.compile(sourceTempalte)({ routeName });

    await fs.promises.mkdir(folder, { recursive: true });
    await fs.promises.writeFile(fullFolderWithNameAndExtension, source);

    return fullFolderWithNameAndExtension;
  }
}

export default new CreatePageService();
