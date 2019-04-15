import React from 'react';
import PropTypes from 'prop-types';
import useField from '@validate-me/react/useField';

import NonLabelWrapper from './wrappers/NonLabelWrapper';

export default function InputCheckbox(props) {
  const [field, inputProps] = useField('checkbox', props);

  return (
    <NonLabelWrapper field={field}>
      <label>
        <input {...inputProps} /> {props.label}
      </label>
    </NonLabelWrapper>
  );
}

InputCheckbox.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.bool,
  required: PropTypes.bool,
};
