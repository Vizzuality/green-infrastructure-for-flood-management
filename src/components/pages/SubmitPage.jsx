import React from 'react';
import { Link } from 'react-router';
import { Row } from 'components/ui/Grid';
import { SvgIcon } from 'vizz-components';
import BtnGroup from 'components/ui/BtnGroup';

export default class HomePage extends React.Component {
  render() {
    return (
      <div className="c-submit">
        <img src="/images/submit_image.svg" />
      </div>
    );
  }
}

HomePage.propTypes = {};
HomePage.defaultProps = {};
