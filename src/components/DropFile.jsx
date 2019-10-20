import React from 'react';
import Dropzone from 'react-dropzone';

import { convertSaveSlippiFiles } from '../services/fileReader';

class DropFile extends React.Component {
  state = {
    error: ''
  };
  onDrop = async acceptedFiles => {
    const slippiFiles = acceptedFiles.filter(file => file.name.endsWith('.slp'));
    if (slippiFiles.length === 0) {
      return this.setState({ error: 'Must provide at least one .slp file' });
    }
    await convertSaveSlippiFiles(slippiFiles);
  };
  render() {
    const { error } = this.state;
    return (
      <Dropzone onDrop={this.onDrop}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drag and drop Slippi files</p>
              {error && <p>{error}</p>}
            </div>
          </section>
        )}
      </Dropzone>
    );
  }
}

export default DropFile;
