import fs from 'fs'

interface CheckIfComponentExistsData {
  folder: string;
  componentName: string;
}

export default function ({folder, componentName}: CheckIfComponentExistsData) {
  const componentExists = fs.existsSync(`${folder}/${componentName}`)

  return componentExists
}
