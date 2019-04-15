import React from 'react';
import PropTypes from 'prop-types';
import useField from '@validate-me/react/useField';

import LabelWrapper from './wrappers/LabelWrapper';

export default function InputText(props) {
  const [field, inputProps] = useField('text', props);

  return (
    <LabelWrapper label={props.label} field={field}>
      <input {...inputProps} />
    </LabelWrapper>
  );
}

InputText.propTypes = {
  rules: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  required: PropTypes.bool,
};
