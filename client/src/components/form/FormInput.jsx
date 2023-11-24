import React from 'react';
import PropTypes from 'prop-types';

/**
 * Form Input Component
 */
const FormInput = ({
  containerClass,
  inputClass,
  label,
  placeholder,
  value,
  type,
  onChange,
  required,
}) => (
  <div className={containerClass}>
    <label>{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      className={inputClass}
      value={value ?? ''}
      onChange={onChange}
      required={required}
    />
  </div>
);

FormInput.propTypes = {
  containerClass: PropTypes.string.isRequired,
  inputClass: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, null])
    .isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool.isRequired,
};

FormInput.defaultProps = {
  containerClass: '',
  inputClass: '',
  label: 'title',
  placeholder: '',
  value: null,
  type: 'text',
  onChange: () => {},
  required: false,
};

export default FormInput;
