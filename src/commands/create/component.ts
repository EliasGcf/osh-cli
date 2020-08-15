import { Command, flags } from '@oclif/command';
import chalk from 'chalk';

import AppError from '../../errors/AppError';

import createComponentService from '../../services/CreateComponentService';
import createStylesService from '../../services/CreateStylesService';
import createUpdateIndexFileService from '../../services/CreateUpdateIndexFileService';
import isInProjectFolder from '../../utils/isInProjectFolder';

export default class CreateComponent extends Command {
  static description = 'Create new component inside src/components';

  static aliases = ['cc'];

  static flags = {
    help: flags.help({ char: 'h' }),
    ts: flags.boolean({ description: 'make with TypeScript', default: false }),
    path: flags.string({
      char: 'p',
      description: 'change the path to your component',
      helpValue: 'src/components',
      default: 'src/components',
    }),
    index: flags.string({
      char: 'i',
      description: 'create index file to export for default your components',
    }), // src/components/${index}
    web: flags.boolean({
      description: 'force make components for web',
      default: false,
    }),
    mobile: flags.boolean({
      description: 'force make components for mobile',
      default: false,
    }),
  };

  static examples = [
    '$ osh create:component Button',
    '$ osh create:component Input --ts',
    '$ osh create:component --path=src/otherFolder Input',
    '$ osh create:component MyInput -i=Form',
    '$ osh create:component Input --web --path packages/web/src/components',
  ];

  static args = [
    {
      name: 'component-name',
      description: 'Name of the component',
      required: true,
    },
  ];

  async run() {
    const { args, flags } = this.parse(CreateComponent);
    const { ts, index: indexFolder, path, web, mobile } = flags;
    const componentName = args['component-name'];
    const folder = indexFolder ? `${path}/${indexFolder}` : `${path}`;

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

      if (indexFolder) {
        const indexFolderFullName = await createUpdateIndexFileService.execute({
          componentName,
          folder,
          isTypeScript: ts,
        });

        this.log(chalk.green(`Craeted|Updated ${indexFolderFullName}`));
      }

      this.log('Finished 🚀');
    } catch (err) {
      if (err instanceof AppError) {
        this.warn(err.message);
      }
    }
  }
}
