import React from 'react';
import PropTypes from 'prop-types';
import useField from '@validate-me/react/useField';

export default function InputSelect(props) {
  const [field, inputProps] = useField('select', props);

  return (
    <div>
      <h3>{props.label}</h3>
      <select {...inputProps} value={inputProps.value}>
        <option value="" disabled>
          Select an option
        </option>
        {Object.keys(props.options).map(key => (
          <option key={key} value={key}>
            {props.options[key]}
          </option>
        ))}
      </select>
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

InputSelect.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.objectOf(PropTypes.string),
  required: PropTypes.bool,
  value: PropTypes.string,
};
