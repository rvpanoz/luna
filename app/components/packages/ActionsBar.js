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
    </div>
  );
};

export default ActionsBar;
