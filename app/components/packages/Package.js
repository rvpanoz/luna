import React from 'react';
import cn from 'classnames';

const Package = props => {
  const { styles, ...restProps } = props;

  const {
    tile,
    'tile-centered': tileCentered,
    'tile-content': tileContent,
    'tile-action': tileAction,
    'tile-title': tileTitle,
    'tile-subtitle': tileSubTitle,
    'text-bold': textBold
  } = styles;

  return (
    <div className={cn(tile, tileCentered)}>
      <div className={tileContent}>
        <div className={cn(tileTitle, textBold)}>{props.location}</div>
        <div className={cn(tileSubTitle)}>{props.current}</div>
      </div>
      <div className={tileAction} />
    </div>
  );
};

export default Package;
