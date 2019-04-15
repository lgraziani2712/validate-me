import React from 'react';
import PropTypes from 'prop-types';

export default function LabelWrapper({ label, field, children }) {
  return (
    <label>
      <h3>{label}</h3>
      {children}
      <p style={{ minHeight: '1.15em' }}>
        {field.touched && field.error && (
          <span style={{ color: 'red' }}>{field.error}</span>
        )}
        {!field.error && field.warning && (
          <span style={{ color: 'orange' }}>{field.warning}</span>
        )}
      </p>
    </label>
  );
}

LabelWrapper.propTypes = {
  label: PropTypes.string.isRequired,
  field: PropTypes.any.isRequired,
  children: PropTypes.oneOf([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
};
