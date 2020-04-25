import fs from 'fs'
import path from 'path'
import Handlebars from 'handlebars'

import isInProjectFolder from '../utils/isInProjectFolder'
import isReactNative from '../utils/isReactNative'
import componentExists from '../utils/componentExists'

import AppError from '../errors/AppError'

interface CreateComponentServiceData {
  componentName: string;
  folder: string;
  isTypeScript: boolean;
}

class CreateComponentService {
  public async execute({
    componentName,
    folder,
    isTypeScript,
  }: CreateComponentServiceData): Promise<string> {
    if (!isInProjectFolder()) {
      throw new AppError('This is not a Node.js project root folder')
    }

    if (componentExists({folder, componentName})) {
      throw new AppError(`Component '${folder}/${componentName}' already exists`)
    }

    const reactPath = isReactNative() ? 'react-native' : 'reactjs'
    const extensionPath = isTypeScript ? 'ts' : 'js'

    const pathTemplate = path.join(__dirname, '..', 'templates', reactPath, extensionPath, 'component.hbs')
    const sourceTemplate = await fs.promises.readFile(pathTemplate, 'utf8')
    const source = Handlebars.compile(sourceTemplate)({componentName})

    await fs.promises.mkdir(`src/components/${componentName}`, {recursive: true})
    await fs.promises.writeFile(
      `src/components/${componentName}/index.${extensionPath === 'ts' ? 'tsx' : 'js'}`,
      source
    )

    return `src/components/${componentName}/index.${extensionPath === 'ts' ? 'tsx' : 'js'}`
  }
}

export default new CreateComponentService()
