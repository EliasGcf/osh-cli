import { Command, flags } from '@oclif/command';
import chalk from 'chalk';

import AppError from '../../errors/AppError';

import createRouteService from '../../services/CreateRouteService';

export default class CreateRoute extends Command {
  static description = 'Create new express route.(ts|js) inside src/routes';

  static aliases = ['cr'];

  static flags = {
    help: flags.help({ char: 'h' }),
    path: flags.string({
      char: 'p',
      description: 'change the path to your route',
      helpValue: 'src/routes',
      default: 'src/routes',
    }),
    ts: flags.boolean({ description: 'make with TypeScript' }),
  };

  static examples = ['$ osh create:route users'];

  static args = [
    {
      name: 'route-name',
      description: 'Name of route file',
      required: true,
    },
  ];

  async run() {
    const { args, flags } = this.parse(CreateRoute);
    const { ts, path } = flags;
    const routeName = args['route-name'];
    const folder = `${path}`;

    try {
      const routeFullPath = await createRouteService.execute({
        routeName,
        folder,
        isTypeScript: ts,
      });
      this.log(chalk.green(`Created ${routeFullPath}`));
    } catch (err) {
      if (err instanceof AppError) {
        this.warn(err.message);
      }
    }
  }
}
