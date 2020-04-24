import {Command, flags} from '@oclif/command'
import * as fs from 'fs'
import path from 'path'
import Handlebars from 'handlebars'

export default class CreateComponent extends Command {
  static description = 'Create new component inside src/components'

  static aliases = ['cp']

  static flags = {
    help: flags.help({char: 'h'}),
    // flag with no value (-t, --ts)
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
    const {args} = this.parse(CreateComponent)
    const componentName = args['file-name']

    const pathTemplate = path.join(__dirname, '..', '..', 'templates', 'reactjs', 'javascript', 'component.hbs')

    const sourceTemplate = await fs.promises.readFile(pathTemplate, 'utf8')

    const template = Handlebars.compile(sourceTemplate)

    const contents = template({componentName})

    await fs.promises.mkdir(`src/components/${componentName}`, {recursive: true})

    await fs.promises.writeFile(`src/components/${componentName}/index.js`, contents)

    this.log(componentName)
  }
}
