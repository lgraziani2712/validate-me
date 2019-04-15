import React from 'react';
import PropTypes from 'prop-types';
import useField from '@validate-me/react/useField';

import NonLabelWrapper from './wrappers/NonLabelWrapper';

export default function InputCheckboxList(props) {
  const [field, inputProps] = useField('checkbox', props);

  return (
    <NonLabelWrapper field={field}>
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
    </NonLabelWrapper>
  );
}

InputCheckboxList.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.objectOf(PropTypes.string),
  value: PropTypes.objectOf(PropTypes.bool),
};
