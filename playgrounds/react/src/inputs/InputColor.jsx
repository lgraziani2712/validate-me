import React from 'react';
import PropTypes from 'prop-types';
import useField from '@validate-me/react/useField';

import LabelWrapper from './wrappers/LabelWrapper';

export default function InputColor(props) {
  const [field, inputProps] = useField(
    'color',
    props.value ? props : { ...props, value: '#000001' },
  );

  return (
    <LabelWrapper label={props.label} field={field}>
      <input {...inputProps} />
    </LabelWrapper>
  );
}

InputColor.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
};
