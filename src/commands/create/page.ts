import { Command, flags } from '@oclif/command';
import chalk from 'chalk';

import AppError from '../../errors/AppError';

import createComponentService from '../../services/CreateComponentService';
import createStylesService from '../../services/CreateStylesService';
import isInProjectFolder from '../../utils/isInProjectFolder';

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
    ts: flags.boolean({ description: 'make with TypeScript', default: false }),
    web: flags.boolean({
      description: 'force make page for web',
      default: false,
    }),
    mobile: flags.boolean({
      description: 'force make page for mobile',
      default: false,
    }),
  };

  static aliases = ['cp'];

  static examples = [
    '$ osh create:page SignIn',
    '$ osh create:page -p=src/screens SignUp',
    '$ osh create:page Dashboard --ts',
    '$ osh create:page SignUp --mobile --path packages/mobile/src/components',
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
    const { ts, path, web, mobile } = flags;
    const folder = path;

    try {
      if (!isInProjectFolder()) {
        throw new AppError('This is not a Node.js project root folder');
      }

      const componentFolderFullName = await createComponentService.execute({
        componentName,
        folder,
        isTypeScript: ts,
        isWeb: web,
        isMobile: mobile,
      });
      this.log(chalk.green(`Craeted ${componentFolderFullName}`));

      const stylesFolderFullName = await createStylesService.execute({
        componentName,
        folder,
        isTypeScript: ts,
        isWeb: web,
        isMobile: mobile,
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
