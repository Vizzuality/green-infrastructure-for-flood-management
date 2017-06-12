import React from 'react';
import MediaQuery from 'react-responsive';

const BREAKPOINT_MOBILE = 640;
const BREAKPOINT_TABLET = 1024;

export default function OnlyOn(props) {
  const breakpoints = {
    mobile: `(max-width: ${BREAKPOINT_TABLET}px)`,
    desktop: `(min-width: ${BREAKPOINT_TABLET + 1}px)`
  };
  return (
    <MediaQuery query={breakpoints[props.device]}>
      {props.children}
    </MediaQuery>
  );
}

OnlyOn.propTypes = {
  // STORE
  children: React.PropTypes.object,
  device: React.PropTypes.string.isRequired
};
