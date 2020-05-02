import { Hook } from '@oclif/config';

import isInProjectFolder from '../../utils/isInProjectFolder';

const hook: Hook<'prerun'> = async function (opts) {
  if (opts.Command && opts.argv[0] !== '-h' && !isInProjectFolder()) {
    this.error('This is not a Node.js project root folder');
  }
};

export default hook;
