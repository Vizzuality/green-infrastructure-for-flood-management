import React from 'react';
import { SvgIcon } from 'vizz-components';

export default class ShareModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      copied: false
    };
  }

  onCopyClick() {
    const copyTextarea = this.input;
    copyTextarea.select();

    try {
      document.execCommand('copy');
      this.setState({ copied: true });
    } catch (err) {
      console.warn('Oops, unable to copy');
    }
  }

  getContent() {
    const { url } = this.props;
    const content = (
      <div className="url-container">
        <input ref={n => this.input = n} value={url} className="url" readOnly />
        <button className="c-btn -primary -transparent" onClick={() => this.onCopyClick()}>
          Copy
        </button>
      </div>
    );

    return (
      <div className="share-content">
        <h1 className="title">Share this page</h1>
        {content}
        <div className="media">
          <a
            href={`http://www.facebook.com/sharer/sharer.php?u=${url}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <SvgIcon name="icon-facebook" className="-big" />
          </a>
          <a
            href={`https://twitter.com/share?url=${url}&text=The Nature of Risk Reduction`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <SvgIcon name="icon-twitter" className="-big" />
          </a>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="share-modal">
        {this.getContent()}
      </div>
    );
  }
 }

ShareModal.propTypes = {
  url: React.PropTypes.string
};
