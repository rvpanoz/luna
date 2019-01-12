/* eslint-disable */

/**
 * Useful transition component
 * based on material-ui transitions https://material-ui-next.com/utils/transitions/
 **/

import React from 'react';
import Fade from '@material-ui/core/Fade';
import Slide from '@material-ui/core/Slide';

const Transitions = {
  Fade,
  Slide
};

class Transition extends React.Component {
  static defaultProps = {
    type: 'Fade',
    direction: 'right',
    show: true,
    mountOnEnter: true,
    unmountOnExit: true
  };

  render() {
    const { children, type, direction, show } = this.props;

    if (type && !Transitions[type]) {
      console.error(`Transition ${type} is not supported`);
      return <div>{children}</div>;
    }

    return React.createElement(
      Transitions[type],
      {
        in: show,
        direction
      },
      children
    );
  }
}

export default Transition;
