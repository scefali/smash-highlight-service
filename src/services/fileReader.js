import { save } from 'save-file'

// import { uploadFileToS3 } from '../services/api';
import { readSlippiBuffer } from '../common/slippi';

export const convertSaveSlippiFiles = async acceptedFiles => {
  const comboJson = await Promise.all(acceptedFiles.map(readOneSlippiFile));
  await save(JSON.stringify(comboJson), 'highlights.json');
};

const readOneSlippiFile = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onabort = () => reject(new Error('file reading was aborted'));
    reader.onerror = () => reject(new Error('file reading has failed'));
    reader.onload = () => {
      const result = Buffer.from(reader.result);
      const output = readSlippiBuffer(result);
      return resolve(output);
    };

    reader.readAsArrayBuffer(file);
  });
};
