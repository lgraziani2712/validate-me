import React from 'react';
import PropTypes from 'prop-types';
import useField from '@validate-me/react/useField';

import LabelWrapper from './wrappers/LabelWrapper';

export default function InputTextarea(props) {
  const [field, inputProps] = useField('textarea', props);

  return (
    <LabelWrapper label={props.label} field={field}>
      <textarea {...inputProps} />
    </LabelWrapper>
  );
}

InputTextarea.propTypes = {
  rules: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  required: PropTypes.bool,
};
