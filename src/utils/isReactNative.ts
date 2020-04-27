import fs from 'fs';

export default function () {
  const packageJson = fs.readFileSync('./package.json');

  const packageJsonParsed = JSON.parse(`${packageJson}`);

  return Boolean(packageJsonParsed.dependencies['react-native']);
}
