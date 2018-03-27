import palette from './palette';
import typography from './typography';
import mixins from './mixins';
import shadows from './shadows';
import transitions from './transitions';
import zIndex from './zIndex';
import styles from './styles';

export default {
  palette,
  typography,
  mixins,
  shadows,
  transitions,
  zIndex,
  styles,
  "direction": "ltr",
  "breakpoints": {
    "keys": [
      "xs",
      "sm",
      "md",
      "lg",
      "xl"
    ],
    "values": {
      "xs": 1,
      "sm": 600,
      "md": 960,
      "lg": 1280,
      "xl": 1920
    }
  },
  "spacing": {
    "unit": 8
  }
}
