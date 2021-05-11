const path = require('path');
const fs = require('fs');

exports.ReadDirsString = (target, map=new Map()) => {
  const base = path.resolve(target);
  const readDir = function (dir, parent) {
    if (fs.statSync(path.join(parent || '', dir)).isDirectory()) {
      fs.readdirSync(path.join(parent || '', dir), { withFileTypes: true }).forEach(function (_dir) {
        readDir(_dir, path.join(parent || '', dir));
      });
    } else {
      // pathMap.set(parent.replace(base, '').split(path.sep).filter(p => p).join('.'), parent);
      map.set(parent, '*.js');
    }
  };
  readDir(base);

  return map;
};