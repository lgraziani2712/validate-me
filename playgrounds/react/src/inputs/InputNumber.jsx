import React from 'react';
import PropTypes from 'prop-types';
import useField from '@validate-me/react/useField';

import LabelWrapper from './wrappers/LabelWrapper';

export default function InputNumber(props) {
  const [field, inputProps] = useField('number', props);

  return (
    <LabelWrapper label={props.label} field={field}>
      <input {...inputProps} />
    </LabelWrapper>
  );
}

InputNumber.propTypes = {
  rules: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  value: PropTypes.string,
  required: PropTypes.bool,
};
