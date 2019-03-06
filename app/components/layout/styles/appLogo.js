import { lighten, darken } from '@material-ui/core/styles/colorManipulator';

const styles = theme => ({
  main_logo: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: 290
  },
  logo_animation_wrapper: {
    position: 'relative',
    width: '100%'
  },
  logo_animation: {
    pointerEvents: 'none',
    overflow: 'visible',
    display: 'flex',
    flexShrink: '0',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 50
  },
  anime_logo: {
    overflow: 'visible',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  anime_logo_signs: {
    overflow: 'visible',
    display: 'flex',
    alignItems: 'space-around',
    position: 'relative',
    width: '100%'
  },
  logo_letter: {
    overflow: 'hidden',
    height: '100%'
  },
  logo_animation__bounce: {
    overflow: 'visible'
  },
  rot: {
    transform: 'rotateX(180deg) scale(-1, 1)'
  },
  flip: {
    transform: 'scale(1, -1)'
  },
  logo_animation__logo_letter_svg: {
    overflow: 'visible',
    fillRule: 'evenodd'
  },
  logo_animation__line: {
    fill: '#fff',
    fillRule: 'evenodd',
    strokeLinecap: 'square',
    strokeWidth: 50
  },
  logo_animation__fill: {
    opacity: '.001',
    stroke: 'currentColor',
    strokeWidth: 40
  },
  primaryColor: {
    stroke: lighten(theme.palette.primary.light, 0.5)
  },
  secondaryColor: {
    stroke: theme.palette.secondary.light
  },
  warningColor: {
    stroke: lighten(theme.palette.warning.light, 0.1)
  },
  errorColor: {
    stroke: lighten(theme.palette.error.light, 0.25)
  }
});

export default styles;
