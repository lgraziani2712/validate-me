import React from 'react';
import PropTypes from 'prop-types';
import useField from '@validate-me/react/useField';

import LabelWrapper from './wrappers/LabelWrapper';

export default function InputSelect(props) {
  const [field, inputProps] = useField('select', props);

  return (
    <LabelWrapper label={props.label} field={field}>
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
    </LabelWrapper>
  );
}

InputSelect.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.objectOf(PropTypes.string),
  required: PropTypes.bool,
  value: PropTypes.string,
};
