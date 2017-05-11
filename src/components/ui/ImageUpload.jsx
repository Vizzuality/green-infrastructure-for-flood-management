import React from 'react';
import Dropzone from 'react-dropzone';
import { SvgIcon } from 'vizz-components';
import { toBase64 } from 'utils/general';

export default class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accepted: null,
      rejected: null
    }

    // BINDINGS
    this.onRemoveFile = this.onRemoveFile.bind(this);
  }

  onDrop(acc, rej) {
    acc.length ?
      toBase64(acc[0], (parsedFile) => {
        const parsedPhoto = {
          name: acc[0].name,
          isActive: true,
          size: acc[0].size,
          attachment: parsedFile
        };

        this.setState({
          accepted: parsedPhoto,
          rejected: null
        });
      }) :
      this.setState({
        accepted: null,
        rejected: rej.length ? rej[0] : null
      });
  }

  onRemoveFile() {
    this.setState({
      accepted: null,
      rejected: null
    });
  }

  render() {
    const { accepted, rejected } = this.state;

    return (
      <section>
        <div className="c-dropzone">
          <Dropzone
            name="image"
            maxSize={50000}
            accept="image/jpeg, image/png"
            onDrop={(acc, rej) => this.onDrop(acc, rej)}
            multiple={false}
            activeClassName="active-image"
          >
            <p>Try dropping some files here, or click to select files to upload.</p>
            <p>Only *.jpeg and *.png images will be accepted</p>
          </Dropzone>
        </div>
        <aside>
          {accepted &&
            <div>
              <h2>File accepted</h2>
              <div>
                <img src={accepted.attachment} alt={accepted.name} />
                <p>{accepted.name} - {accepted.size} bytes</p>
                <button className="" onClick={this.onRemoveFile}>
                  <SvgIcon name="icon-cross" className="-small" />
                </button>
              </div>
            </div>
          }

          {rejected &&
            <div>
              <h2>File rejected</h2>
              <div>
                <img src={rejected.attachment} alt={rejected.name} />
                <p>{rejected.name} - {rejected.size} bytes</p>
                <button className="" onClick={this.onRemoveFile}>
                  <SvgIcon name="icon-cross" className="-small" />
                </button>
              </div>
            </div>
          }
        </aside>
      </section>
    );
  }
}

ImageUpload.propTypes = {
  // name: React.PropTypes.string
};
