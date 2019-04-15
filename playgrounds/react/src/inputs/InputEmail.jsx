import React from 'react';
import PropTypes from 'prop-types';
import useField from '@validate-me/react/useField';

import LabelWrapper from './wrappers/LabelWrapper';

export default function InputEmail(props) {
  const [field, inputProps] = useField('email', props);

  return (
    <LabelWrapper label={props.label} field={field}>
      <input {...inputProps} />
    </LabelWrapper>
  );
}

InputEmail.propTypes = {
  rules: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  multiple: PropTypes.bool,
  pattern: PropTypes.string,
  required: PropTypes.bool,
};
