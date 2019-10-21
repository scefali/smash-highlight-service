import React from 'react';
import Dropzone from 'react-dropzone';
import { toast } from 'react-toastify';
import { MdCloudUpload } from 'react-icons/md';

import { convertSaveSlippiFiles } from '../services/fileReader';

toast.configure({
  autoClose: 5000,
  draggable: false
});

class DropFile extends React.Component {
  showError(message) {
    toast.error(message, {
      position: toast.POSITION.TOP_CENTER
    });
  }
  onDrop = async acceptedFiles => {
    const slippiFiles = acceptedFiles.filter(file => file.name.endsWith('.slp'));
    if (slippiFiles.length === 0) {
      return this.showError('Must provide at least one .slp file');
    }
    try {
      await convertSaveSlippiFiles(slippiFiles);
    } catch (err) {
      return this.showError(err.message);
    }
  };
  render() {
    return (
      <Dropzone onDrop={this.onDrop}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drag and drop Slippi files or folder</p>
              <MdCloudUpload size={50} />
            </div>
          </section>
        )}
      </Dropzone>
    );
  }
}

export default DropFile;
