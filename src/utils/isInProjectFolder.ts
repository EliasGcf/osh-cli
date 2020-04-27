import fs from 'fs';

export default function () {
  const packageJsonExists = fs.existsSync('package.json');

  return packageJsonExists;
}
