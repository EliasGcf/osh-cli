import fs from 'fs';

export default function () {
  const packageJson = fs.readFileSync('./package.json');

  const packageJsonParsed = JSON.parse(`${packageJson}`);

  const reactPath = packageJsonParsed.dependencies['react-native']
    ? 'react-native'
    : 'reactjs';

  return reactPath;
}
