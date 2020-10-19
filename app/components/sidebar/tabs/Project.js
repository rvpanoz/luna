import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import UpdateIcon from '@material-ui/icons/Update';
import { AppLoader } from 'components/common';

import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import ArrowRightIcon from '@material-ui/icons/ArrowRightAlt';

import { iMessage } from 'commons/utils';
import styles from './styles/project';

const ProjectTab = ({
  classes,
  items,
  loading,
  updatedAt,
  fromSearch,
  projectInfo,
  npmEnv,
  mode,
}) => (
  <>
    <Card className={classes.card}>
      <CardContent>
        <>
          <Typography className={classes.cardTitle} color="textSecondary">
            {iMessage('title', 'project-info')}
          </Typography>
          <Divider />
          {loading ? (
            <div className={classes.loading}>Loading..</div>
          ) : (
            <>
              <div className={classes.info}>
                <Typography color="textSecondary" component="div">
                  {mode === 'local' ? projectInfo.name : 'Global packages'}
                </Typography>
                <Typography color="textSecondary" component="div">
                  {projectInfo.version && mode === 'local'
                    ? `v.${projectInfo.version}`
                    : 'N/A'}
                </Typography>
              </div>
            </>
          )}
        </>
      </CardContent>
    </Card>
  </>
);

ProjectTab.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  projectInfo: PropTypes.objectOf(PropTypes.string).isRequired,
  loading: PropTypes.bool,
};

export default withStyles(styles)(ProjectTab);
