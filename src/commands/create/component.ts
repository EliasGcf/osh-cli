import {Command, flags} from '@oclif/command'
import chalk from 'chalk'

import AppError from '../../errors/AppError'
import createComponentService from '../../services/CreateComponentService'

export default class CreateComponent extends Command {
  static description = 'Create new component inside src/components'

  static aliases = ['cp']

  static flags = {
    help: flags.help({char: 'h'}),
    ts: flags.boolean({description: 'make with TypeScript'}),
  }

  static args = [
    {
      name: 'file-name',
      description: 'Nome of the component',
      required: true,
    },
  ]

  async run() {
    const {args, flags} = this.parse(CreateComponent)
    const componentName = args['file-name']
    const {ts} = flags

    try {
      const folderFullName = await createComponentService.execute({
        componentName,
        folder: 'src/components',
        isTypeScript: ts,
      })

      this.log(chalk.green(`Craeted ${folderFullName}`))
      this.log('Finished 🚀')
    } catch (err) {
      if (err instanceof AppError) {
        this.warn(err.message)
      }
    }
  }
}
