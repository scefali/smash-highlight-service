import { save } from 'save-file';

import { readSlippiBuffer } from '../common/slippi';
import { toast } from 'react-toastify';

export const convertSaveSlippiFiles = async acceptedFiles => {
  const comboJson = await Promise.all(acceptedFiles.map(readOneSlippiFile));
  toast.success('Parsed slippi files successfully', {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 3000
  });
  await save(JSON.stringify(comboJson, null, 2), 'highlights.json');
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
