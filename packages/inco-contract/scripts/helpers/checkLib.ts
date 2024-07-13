import fs from 'fs'
import path from 'path'

const searchText = '@openzeppelin-upgradeable/contracts';
const replaceText = '@openzeppelin/contracts-upgradeable';

export function traverseDirectory(directory) {
  fs.readdirSync(directory).forEach((file) => {
    const filePath = path.join(directory, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      traverseDirectory(filePath);
    } else if (filePath.endsWith('.sol')) {
      replaceInFile(filePath);
    }
  });
}

function replaceInFile(filePath) {
  let code = fs.readFileSync(filePath, 'utf-8');
  
  if (code.includes(searchText)) {
    code = code.replace(new RegExp(searchText, 'g'), replaceText);
    
    fs.writeFileSync(filePath, code);
    console.log(`File modified: ${filePath}`);
  } else {
    console.log(`No need to modify file: ${filePath}`);
  }
}

