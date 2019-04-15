import React from 'react';
import PropTypes from 'prop-types';

export default function NonLabelWrapper({ field, children }) {
  return (
    <div>
      {children}
      <p style={{ minHeight: '1.15em' }}>
        {field.touched && field.error && (
          <span style={{ color: 'red' }}>{field.error}</span>
        )}
        {!field.error && field.warning && (
          <span style={{ color: 'orange' }}>{field.warning}</span>
        )}
      </p>
    </div>
  );
}

NonLabelWrapper.propTypes = {
  field: PropTypes.any.isRequired,
  children: PropTypes.oneOf([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
};
