const os = require('os');
const fs = require('fs');

module.exports = (filename, content) => {
  if (fs.existsSync(filename)) {
    const currentInput = fs.readFileSync(filename, 'utf-8');

    if (currentInput !== content) {
      writeFile(filename, content);
    }
  } else {
    writeFile(filename, content);
  }
};

const writeFile = (filename, content) => {
  //Replace new lines with OS-specific new lines
  content = content.replace(/\n/g, os.EOL);

  fs.writeFileSync(filename, content, 'utf8');
};
