import React from 'react';
import Dropzone from 'react-dropzone';
import { SvgIcon } from 'vizz-components';

export default class ImageUpload extends React.Component {
  render() {
    const { accepted, rejected, onDrop, onRemoveFile, showRejected, accept } = this.props;

    return (
      <section className="c-image-upload">
        <div className="upload">
          <Dropzone
            name="image"
            className="dropzone"
            maxSize={3145728}
            accept={accept}
            onDrop={(acc, rej) => onDrop(acc, rej)}
            multiple={false}
            activeClassName="active-image"
          >
            <SvgIcon name="icon-plus" className="add -huge" />
            <p className="notice">Add photo</p>
          </Dropzone>
          <aside className="file-selected">
            {accepted &&
              <div className="files -accepted">
                <div>
                  <div className="image-uploaded" style={{ backgroundImage: `url(${accepted.attachment})` }}>
                    <div className="viel" />
                    <button className="remove" onClick={() => onRemoveFile()}>
                      <SvgIcon name="icon-cross" className="-huge" />
                    </button>
                  </div>
                </div>
              </div>
            }

            {showRejected && rejected &&
              <div className="files -rejected">
                <h2>File rejected</h2>
                <div>
                  <p>{rejected.name} - {rejected.size} bytes</p>
                  <button className="remove" onClick={() => onRemoveFile()}>
                    <SvgIcon name="icon-cross" className="-huge" />
                  </button>
                </div>
              </div>
            }
          </aside>
        </div>
        <div className="upload-error">
          {!showRejected && rejected && <p className="error">The file has been rejected</p>}
        </div>
      </section>
    );
  }
}

ImageUpload.propTypes = {
  accepted: React.PropTypes.object,
  rejected: React.PropTypes.object,
  showRejected: React.PropTypes.bool,
  accept: React.PropTypes.string,
  // Actions
  onDrop: React.PropTypes.func,
  onRemoveFile: React.PropTypes.func
};
