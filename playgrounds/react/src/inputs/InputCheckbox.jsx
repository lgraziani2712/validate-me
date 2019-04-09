import React from 'react';
import PropTypes from 'prop-types';
import useField from '@validate-me/react/useField';

export default function InputCheckbox(props) {
  const [field, inputProps] = useField('checkbox', props);

  return (
    <div>
      <label>
        <input {...inputProps} />
        {props.label}
      </label>
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

InputCheckbox.propTypes = {
  form: PropTypes.any.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.bool,
  required: PropTypes.bool,
};
