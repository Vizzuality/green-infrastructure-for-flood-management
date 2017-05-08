import React from 'react';
import Validation from 'react-validation';
import ReactSelect from 'react-select';

function withWrapper(Component) {
  return class extends React.Component {
    render() {
      const { ...props } = this.props;
      return (
        <Component id={props.name} {...props} />
      );
    }
  };
}

const Form = withWrapper(Validation.components.Form);
const Input = withWrapper(Validation.components.Input);
const Textarea = withWrapper(Validation.components.Textarea);
const Select = withWrapper(ReactSelect);
const Button = Validation.components.Button;

export { Input, Button, Form, Textarea, Select };
