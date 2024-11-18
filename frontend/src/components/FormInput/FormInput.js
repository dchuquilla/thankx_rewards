import React from 'react';
import './FormInput.css';

const FormInput = ({ label, type, name, value, onChange }) => {
  return (
    <div className="form-input">
      <label>{label}</label>
      <input type={type} name={name} value={value} onChange={onChange} required />
    </div>
  );
};

export default FormInput;
