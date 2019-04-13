import React from 'react';
import PropTypes from 'prop-types';
import useField from '@validate-me/react/useField';

export default function InputCheckboxList(props) {
  const [field, inputProps] = useField('checkbox', props);

  return (
    <div>
      <h3>{props.label}</h3>
      {Object.keys(props.options).map(key => (
        <label key={key}>
          <input
            {...inputProps}
            value={key}
            checked={inputProps.value[key] || false}
          />
          {props.options[key]}
        </label>
      ))}
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

InputCheckboxList.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.objectOf(PropTypes.string),
  value: PropTypes.objectOf(PropTypes.bool),
};
