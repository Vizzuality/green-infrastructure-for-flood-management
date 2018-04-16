import React from 'react';
import { SvgIcon } from 'vizz-components';

export default class ShareModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { copied: false };
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

    return (
      <div className="share-content">
        <h1 className="title">Share this page</h1>

        <div className={`url-container ${this.state.copied && '-copied'}`}>
          <input ref={n => this.input = n} value={url} className="url" readOnly />
          <a
            href={`http://www.facebook.com/sharer/sharer.php?u=${url}`}
            target="_blank"
            rel="noopener noreferrer"
            className="c-btn -primary -transparent"
          >
            <SvgIcon name="icon-facebook" className="-big" />
          </a>
          <a
            href={`https://twitter.com/share?url=${url}&text=Natural Hazards – Nature-based Solutions`}
            target="_blank"
            rel="noopener noreferrer"
            className="c-btn -primary -transparent"
          >
            <SvgIcon name="icon-twitter" className="-big" />
          </a>
          <button className="c-btn -primary -transparent" onClick={() => this.onCopyClick()}>
            {this.state.copied ? 'Copied!' : 'Copy' }
          </button>
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

ShareModal.propTypes = { url: React.PropTypes.string };
