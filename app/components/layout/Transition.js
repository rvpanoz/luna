import React from 'react';
import PropTypes from 'prop-types';
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
    show: true
  };

  render() {
    const { children, type, direction, show } = this.props;

    if (type && !Transitions[type]) {
      console.error(`Transition ${type} is not supported`);
      return <React.Fragment>{children}</React.Fragment>;
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

Transition.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  direction: PropTypes.string,
  show: PropTypes.bool
};

export default Transition;
