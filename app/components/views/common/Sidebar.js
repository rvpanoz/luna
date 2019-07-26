import React from 'react';
import { string, objectOf, func, bool, object, arrayOf } from 'prop-types';
import { withStyles } from '@material-ui/styles';

import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import UpdateIcon from '@material-ui/icons/Update';

import { AppTabs } from 'components/common/';
import {
  PackagesTab,
  ActionsTab,
  HistoryTab
} from 'components/views/sidebar/tabs';
import { iMessage } from 'commons/utils'
import styles from './styles/sidebar';

const Sidebar = ({ classes, loading, mode, history, loadDirectory, updatedAt }) => {
  return <div className={classes.root}>
    <AppTabs>
      <Card className={classes.card}>
        <CardContent>
          <Typography
            className={classes.cardTitle}
            color="textSecondary"
          >
            {iMessage('title', 'overview')}
          </Typography>
          <Divider />
        </CardContent>
        <Divider />
        <CardActions>
          <div className={classes.cardFlexContainer}>
            <UpdateIcon className={classes.updateIcon} />
            <Typography variant="body2" color="textSecondary">
              {iMessage('info', 'updatedAt')}&nbsp;
                        {updatedAt ? updatedAt : '...'}
            </Typography>
          </div>
        </CardActions>
      </Card>
      <ActionsTab
        onClick={() => { }}
        mode={mode}
        loading={loading}
      />
      <HistoryTab
        directories={history}
        onClick={loadDirectory}
        loading={loading}
      />
    </AppTabs>
  </div>
};

Sidebar.propTypes = {
  classes: objectOf(string).isRequired,
  mode: string.isRequired,
  loading: bool,
  history: arrayOf(object),
  loadDirectory: func,
  updatedAt: string,
};

export default withStyles(styles)(Sidebar);
