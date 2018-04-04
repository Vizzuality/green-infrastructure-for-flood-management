import React from 'react';
import { SvgIcon } from 'vizz-components';
import classnames from 'classnames';
import { saveAsFile } from 'utils/general';

export default function SlidingMenu(props) {
  const cNames = classnames('c-sliding-menu', { '-closed': props.closed });

  return (
    <div className={cNames}>
      <div className="sliding-menu-header">
        <button className="sliding-menu-btn" onClick={props.onToggle} type="button">
          {props.title}
          <SvgIcon className="sliding-menu-icon -small" name={props.closed ? 'icon-arrow-down-2' : 'icon-arrow-up-2'} />
        </button>
        {props.download &&
          <button
            className="c-btn -transparent download"
            onClick={() => saveAsFile(props.downloadUrl || '', 'project.csv')}
          >
            Download data
            <SvgIcon name="icon-download-white" className="download -medium" />
          </button>
        }
      </div>
      <div className="sliding-menu-content">{props.children}</div>
    </div>
  );
}

SlidingMenu.propTypes = {
  closed: React.PropTypes.bool,
  children: React.PropTypes.any,
  title: React.PropTypes.string,
  downloadUrl: React.PropTypes.string,
  download: React.PropTypes.bool,
  onToggle: React.PropTypes.func
};

SlidingMenu.defaultProps = { closed: true };
