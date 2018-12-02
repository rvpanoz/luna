import React, { useState, useRef } from 'react';
import cn from 'classnames';
import styles from '../../styles/spectre.min.css';
import styleIcons from '../../styles/spectre-icons.min.css';

const {
  loading,
  'd-flex': flex,
  'has-icon-right': iconRight,
  'form-icon': formIcon,
  'form-input': formInput,
  'input-md': inputMedium,
  'form-group': formGroup,
  'form-radio': formRadio,
  'form-inline': formInline
} = styles;

const { icon, 'icon-search': search } = styleIcons;

const ActionsBar = props => {
  const [manager, setManager] = useState('npm');
  const npmInputRef = useRef(null);
  const yarnInputRef = useRef(null);

  const handleManager = e => {
    const { name } = e.currentTarget;
    setManager(name);
  };

  return (
    <div className={flex}>
      <div className={iconRight}>
        <input
          type="text"
          className={cn(formInput, inputMedium)}
          placeholder="search npm.."
        />
        <i
          className={cn(formIcon, icon, {
            [search]: true,
            [loading]: false
          })}
          style={{ color: '#000' }}
        />
      </div>
      <div className={formGroup}>
        <label className={cn(formRadio, formInline)}>
          <input
            type="radio"
            name="npm"
            checked={manager === 'npm'}
            onChange={handleManager}
            ref={npmInputRef}
          />
          <i className={formIcon} /> npm
        </label>
        <label className={cn(formRadio, formInline)}>
          <input
            type="radio"
            name="yarn"
            checked={manager === 'yarn'}
            onChange={handleManager}
            ref={yarnInputRef}
          />
          <i className={formIcon} /> yarn
        </label>
      </div>
    </div>
  );
};

export default ActionsBar;
