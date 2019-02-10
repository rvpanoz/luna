import React from 'react';
import PropTypes from 'prop-types';
import { useMappedState } from 'redux-react-hook';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';

import { APP_MODES, APP_INFO } from 'constants/AppConstants';
import { BasicCard, DetailsCard } from 'components/atoms/';

import styles from './styles/dashboard';

const mapState = ({
  common: {
    manager,
    mode,
    directory,
    loader: { loading }
  },
  packages: {
    lastUpdatedAt,
    packages,
    packagesOutdated,
    projectName,
    projectVersion,
    projectDescription,
    projectLicense,
    projectAuthor
  }
}) => ({
  manager,
  mode,
  directory,
  loading,
  lastUpdatedAt,
  packages,
  packagesOutdated,
  projectName,
  projectVersion,
  projectDescription,
  projectLicense,
  projectAuthor
});

const Dashboard = props => {
  const { classes } = props;

  const {
    packages,
    packagesOutdated,
    loading,
    directory,
    mode,
    projectName,
    projectVersion,
    projectDescription,
    projectLicense,
    lastUpdatedAt
  } = useMappedState(mapState);

  const title =
    mode === APP_MODES.LOCAL ? `Project ${projectName || ''}` : 'Global';
  const text =
    mode === APP_MODES.LOCAL ? projectDescription : APP_INFO.GLOBAL_MESSAGE;

  return (
    <section className={classes.root}>
      <Grid container justify="space-between">
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
          <DetailsCard
            mode={mode}
            directory={directory}
            title={title}
            aside={projectVersion}
            text={text}
            smallText={projectLicense}
            lastUpdatedAt={lastUpdatedAt || ''}
            loading={loading}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
          <BasicCard title="Dependencies" value={packages && packages.length} />
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={4} xl={4}>
          <BasicCard
            title="Outdated"
            value={packagesOutdated && packagesOutdated.length}
          />
        </Grid>
      </Grid>
    </section>
  );
};

Dashboard.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired
};

export default withStyles(styles)(Dashboard);
