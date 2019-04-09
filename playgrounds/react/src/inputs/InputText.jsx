import React from 'react';
import PropTypes from 'prop-types';
import useField from '@validate-me/react/useField';

export default function InputText(props) {
  const [field, inputProps] = useField('text', props);

  return (
    <div>
      <h3>{props.label}</h3>
      <input {...inputProps} />
      <p style={{ minHeight: '1.15em' }}>
        {field.touched && field.error && (
          <span style={{ color: 'red' }}>{field.error}</span>
        )}
        {!field.error && field.warning && (
          <span style={{ color: 'orange' }}>{field.warning}</span>
        )}
      </p>
    </div>
  );
}

InputText.propTypes = {
  form: PropTypes.any.isRequired,
  rules: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  required: PropTypes.bool,
};
