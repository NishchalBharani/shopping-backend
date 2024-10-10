// services/mlService.js
import { exec } from 'child_process';

export const runModel = (inputData) => {
  return new Promise((resolve, reject) => {
    exec(`python3 path/to/your/script.py ${inputData}`, (error, stdout, stderr) => {
      if (error) {
        reject(`Error: ${error.message}`);
        return;
      }
      if (stderr) {
        reject(`stderr: ${stderr}`);
        return;
      }
      resolve(stdout);
    });
  });
};
