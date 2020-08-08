import { Command, flags } from '@oclif/command';
import chalk from 'chalk';

import AppError from '../../errors/AppError';

import isInProjectFolder from '../../utils/isInProjectFolder';

import createApiService from '../../services/CreateApiService';

export default class CreateApi extends Command {
  static description = 'Create the api service with axios inside src/services';

  static aliases = ['capi'];

  static flags = {
    help: flags.help({ char: 'h' }),
    ts: flags.boolean({ description: 'make with TypeScript' }),
    path: flags.string({
      char: 'p',
      description: 'change the path to your api service',
      helpValue: 'src/services',
      default: 'src/services',
    }),
  };

  static examples = [
    '$ osh create:api --ts',
    '$ osh create:api --path src/utils',
    '$ osh capi --ts',
  ];

  async run() {
    const { flags } = this.parse(CreateApi);
    const { ts, path } = flags;

    try {
      if (!isInProjectFolder()) {
        throw new AppError('This is not a Node.js project root folder');
      }

      const apiServiceFolderFullName = await createApiService.execute({
        folder: path,
        isTypeScript: ts,
      });

      this.log(chalk.green(`Created ${apiServiceFolderFullName}`));
      this.log('Finished 🚀');
    } catch (err) {
      if (err instanceof AppError) {
        this.warn(err.message);
      }
    }
  }
}
