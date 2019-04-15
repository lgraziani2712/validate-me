import React from 'react';
import PropTypes from 'prop-types';
import useField from '@validate-me/react/useField';

import LabelWrapper from './wrappers/LabelWrapper';

export default function InputDate(props) {
  const [field, inputProps] = useField(props.type, props);

  return (
    <LabelWrapper label={props.label} field={field}>
      <input {...inputProps} />
    </LabelWrapper>
  );
}

InputDate.propTypes = {
  type: PropTypes.oneOf(['date', 'time', 'datetime-local', 'week', 'month']),
  min: PropTypes.string,
  max: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  required: PropTypes.bool,
};
