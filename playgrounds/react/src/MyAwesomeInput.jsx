import React from 'react';
import PropTypes from 'prop-types';
import useField from '@validate-me/react/useField';

export default function MyAwesomeInput(props) {
  const [fieldState, inputProps] = useField(props);

  return (
    <div>
      <input {...inputProps} />
      <div>
        Is valid?{' '}
        {fieldState.pristine
          ? ''
          : fieldState.error || fieldState.warning || 'yes'}
      </div>
      <div>Value: {inputProps.value}</div>
    </div>
  );
}

MyAwesomeInput.propTypes = {
  form: PropTypes.any.isRequired,
  rules: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.oneOf(['number', 'checkbox', 'date']),
};
