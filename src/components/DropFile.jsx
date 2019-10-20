import React from 'react';
import Dropzone from 'react-dropzone';

import { uploadFileToS3 } from '../services/api';
import { readSlippiBuffer } from '../common/slippi';

class DropFile extends React.Component {
  uploadFileToS3 = async (file, data) => {
    await uploadFileToS3(file, data);
  };
  onDrop = acceptedFiles => {
    console.log('start', acceptedFiles);

    acceptedFiles.forEach(file => {
      const reader = new FileReader();

      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = () => {
        // Do whatever you want with the file contents
        // const binaryStr = reader.result;
        // console.log('file', file, binaryStr);
        // this.uploadFileToS3(file, binaryStr);
        
        const result = Buffer.from(reader.result)
        readSlippiBuffer(result);
      };

      // reader.readAsBinaryString(file);
      reader.readAsArrayBuffer(file);
    });
  };
  render() {
    return (
      <Dropzone onDrop={this.onDrop}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
          </section>
        )}
      </Dropzone>
    );
  }
}

export default DropFile;
