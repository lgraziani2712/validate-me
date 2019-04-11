import React from 'react';
import PropTypes from 'prop-types';
import useField from '@validate-me/react/useField';

export default function InputTextarea(props) {
  const [field, inputProps] = useField('textarea', props);

  return (
    <div>
      <h3>{props.label}</h3>
      <textarea {...inputProps} />
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

InputTextarea.propTypes = {
  rules: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  required: PropTypes.bool,
};
