import React from 'react';
import PropTypes from 'prop-types';
import useInput from '@validate-me/react/useInput';

export default function MyAwesomeInput(props) {
  const [inputState, inputProps] = useInput(props);

  return (
    <div>
      <input {...inputProps} />
      <div>
        Is valid?{' '}
        {inputState.pristine
          ? ''
          : inputState.error || inputState.warning || 'yes'}
      </div>
      <div>Value: {inputProps.value}</div>
    </div>
  );
}

MyAwesomeInput.propTypes = {
  form: PropTypes.any.isRequired,
  rules: PropTypes.arrayOf(PropTypes.string),
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.oneOf(['number', 'checkbox', 'date']),
};
