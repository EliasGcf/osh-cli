import fs from 'fs';
interface CreateUpdateIndexFileServiceData {
  componentName: string;
  folder: string;
  isTypeScript: boolean;
}

class CreateUpdateIndexFileService {
  public async execute({
    folder,
    componentName,
    isTypeScript,
  }: CreateUpdateIndexFileServiceData): Promise<string> {
    const extensionPath = isTypeScript ? 'ts' : 'js';

    const fullFolderWithNameIndexAndExtension = `${folder}/index.${extensionPath}`;

    const content = `export { default as ${componentName} } from './${componentName}';\n`;

    await fs.promises.appendFile(fullFolderWithNameIndexAndExtension, content);

    return fullFolderWithNameIndexAndExtension;
  }
}

export default new CreateUpdateIndexFileService();
