import React from 'react';
import cn from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { useMappedState, useDispatch } from 'redux-react-hook';
import { objectOf, string } from 'prop-types';
import { setActivePage } from 'models/ui/actions';
import { NavigationBar } from 'components/views/navigationBar';
import styles from './styles/appNavigationBar';

const mapState = ({
  common: { mode, directory },
  ui: {
    activePage,
    loaders: {
      loader: { loading }
    }
  },
  npm: { env }
}) => ({
  activePage,
  mode,
  directory,
  env,
  loading
});

const AppNavigationBar = ({ classes, className }) => {
  const { env, mode, directory, activePage } = useMappedState(mapState);

  const dispatch = useDispatch();

  const setActivePageHandler = page =>
    dispatch(
      setActivePage({
        page,
        paused: true
      })
    );

  return (
    <div
      className={cn(classes.root, {
        [className]: className !== undefined
      })}
    >
      <NavigationBar
        mode={mode}
        directory={directory}
        env={env}
        activePage={activePage}
        setActivePage={setActivePageHandler}
      />
    </div>
  );
};

AppNavigationBar.propTypes = {
  classes: objectOf(string).isRequired,
  className: string
};

export default withStyles(styles)(AppNavigationBar);
