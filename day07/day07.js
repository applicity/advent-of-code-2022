const DISK_SIZE = 70000000;
const FREE_SPACE = 30000000;

const cd = (context, line) => {
  const action = line.replace(/^\$ cd /, '');
  if (action === '/') {
    return [''];
  }
  if (action === '..') {
    context.pop();
  } else {
    context.push(action);
  }
  return context;
};

// sort helpers
const depth = (directory) => (directory === '/' ? '' : directory).split('').filter((a) => a === '/').length;
const depthSorter = (a, b) => depth(b) - depth(a);
const numberSorter = (a, b) => a - b;

// Return a string representing the current working directory
const pwd = (context) => (context.length === 1 ? '/' : context.join('/'));

// From a directory return the string for it's parent.
const parent = (dir) => {
  if (dir === '/') return false;
  return `/${dir}`.split('/').slice(0, -1).join('/').replace('//', '/');
};

const day07 = (input, p2) => {
  let directory = [''];

  const directories = {};

  input.forEach((l) => {
    if (l.startsWith('$ cd')) {
      directory = cd(directory, l);
      if (!Object.prototype.hasOwnProperty.call(directories, pwd(directory))) {
        directories[pwd(directory)] = 0;
      }
    } else if (!l.startsWith('$') && !l.startsWith('dir')) {
    //   // skip this command
    // } else if (l.startsWith('dir')) {
    //   // skip this.
    // } else {
      const [size] = l.split(' ');
      directories[pwd(directory)] += parseInt(size, 10);
    }
  });

  // Roll the directory sizes to their parents.
  Object.keys(directories)
    .sort(depthSorter)
    .forEach((k) => {
      const p = parent(k);
      if (p) {
        // Add the total to the parent.
        directories[p] += directories[k];
      }
    });

  // Part one.
  if (!p2) {
    return Object.values(directories)
      .filter((v) => v <= 100000)
      .reduce((a, c) => a + c, 0);
  }

  const requiredSpace = FREE_SPACE - (DISK_SIZE - directories['/']);
  return Object.values(directories).filter((v) => v >= requiredSpace).sort(numberSorter)[0];
};

module.exports = {
  day07,
  cd,
  pwd,
  parent,
};
