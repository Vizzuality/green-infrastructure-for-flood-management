import React from 'react';
import { SvgIcon } from 'vizz-components';
import Spinner from 'components/ui/Spinner';
import classnames from 'classnames';

export default class Modal extends React.Component {
  componentDidMount() {
    this.el.addEventListener('transitionend', () => {
      if (!this.props.open) {
        this.props.setModalOptions({ children: null, className: '' });
      }
    });
  }

  // Close modal when esc key is pressed
  componentWillReceiveProps({ open }) {
    const self = this;
    function escKeyPressListener(evt) {
      document.removeEventListener('keydown', escKeyPressListener);
      return evt.keyCode === 27 && self.props.toggleModal(false);
    }
    // if open property has changed
    if (this.props.open !== open) {
      document[open ? 'addEventListener' : 'removeEventListener']('keydown', escKeyPressListener);
    }
  }

  getContent() {
    return this.props.options.children ? <this.props.options.children {...this.props.options.childrenProps} /> : null;
  }

  render() {
    const cNames = classnames('c-modal', {
      '-hidden': !this.props.open,
      [this.props.options.className]: !!this.props.options.className
    });

    return (
      <section ref={node => this.el = node} className={cNames}>
        <div className="modal-container">
          <button className="modal-close" onClick={() => this.props.toggleModal(false)}>
            <SvgIcon name="icon-cross" className="-big" />
          </button>
          <div className="modal-content">
            {this.props.loading ? <Spinner isLoading /> : this.getContent()}
          </div>
        </div>
        <area className="modal-backdrop" onClick={() => this.props.toggleModal(false)} />
      </section>
    );
  }
}

Modal.propTypes = {
  // STORE
  open: React.PropTypes.bool,
  options: React.PropTypes.object,
  loading: React.PropTypes.bool,
  className: React.PropTypes.string,
  // ACTIONS
  toggleModal: React.PropTypes.func,
  setModalOptions: React.PropTypes.func
};

Modal.defaultProps = {
  open: false,
  options: {}
};
