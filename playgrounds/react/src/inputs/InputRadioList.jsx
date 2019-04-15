import React from 'react';
import PropTypes from 'prop-types';
import useField from '@validate-me/react/useField';

import NonLabelWrapper from './wrappers/NonLabelWrapper';

export default function InputRadioList(props) {
  const [field, inputProps] = useField('radio', props);

  return (
    <NonLabelWrapper field={field}>
      <h3>{props.label}</h3>
      {Object.keys(props.options).map(key => (
        <label key={key}>
          <input
            {...inputProps}
            value={key}
            checked={inputProps.value === key}
          />
          {props.options[key]}
        </label>
      ))}
    </NonLabelWrapper>
  );
}

InputRadioList.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.objectOf(PropTypes.string),
  required: PropTypes.bool,
  value: PropTypes.string,
};
