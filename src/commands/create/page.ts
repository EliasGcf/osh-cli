import { Command, flags } from '@oclif/command';
import chalk from 'chalk';

import AppError from '../../errors/AppError';
import isInProjectFolder from '../../utils/isInProjectFolder';

import createComponentService from '../../services/CreateComponentService';
import createStylesService from '../../services/CreateStylesService';

export default class CreatePage extends Command {
  static description = 'Create new page inside src/pages';

  static flags = {
    help: flags.help({ char: 'h' }),
    path: flags.string({
      char: 'p',
      description: 'change the path to your page',
      helpValue: 'src/pages',
      default: 'src/pages',
    }),
    ts: flags.boolean({ description: 'make with TypeScript' }),
  };

  static aliases = ['cp'];

  static examples = [
    '$ osh create:page SignIn',
    '$ osh create:page -p=src/screens SignUp',
    '$ osh create:page Dashboard --ts',
  ];

  static args = [
    {
      name: 'page-name',
      description: 'Name of the page',
      required: true,
    },
  ];

  async run() {
    const { args, flags } = this.parse(CreatePage);
    const componentName = args['page-name'];
    const { ts, path } = flags;
    const folder = path;

    try {
      if (!isInProjectFolder()) {
        throw new AppError('This is not a Node.js project root folder');
      }

      const componentFolderFullName = await createComponentService.execute({
        componentName,
        folder,
        isTypeScript: ts,
      });
      this.log(chalk.green(`Craeted ${componentFolderFullName}`));

      const stylesFolderFullName = await createStylesService.execute({
        componentName,
        folder,
        isTypeScript: ts,
      });
      this.log(chalk.green(`Craeted ${stylesFolderFullName}`));

      this.log('Finished 🚀');
    } catch (err) {
      if (err instanceof AppError) {
        this.warn(err.message);
      }
    }
  }
}
