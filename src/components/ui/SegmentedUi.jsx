import React from 'react';

export default class SegmentedUi extends React.Component {

  render() {
    const { items, onChange } = this.props;

    return (
      <div className="c-segmented-ui">
        <ul className="segmented-list">
          {items.map((item, index) => <li key={index} className="segmented-item"><button className="segmented-btn" onClick={() => onChange && onChange(item)}>{item.label}</button></li>)}
        </ul>
      </div>
    );
  }
}

SegmentedUi.propTypes = {
  items: React.PropTypes.array,
  onChange: React.PropTypes.func
};

SegmentedUi.defaultProps = {
  items: []
};
