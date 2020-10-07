import React from 'react';
import { withStyles } from '@material-ui/core';
import {
  objectOf,
  oneOfType,
  string,
  array,
  object,
  func,
  number,
} from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Tooltip from '@material-ui/core/Tooltip';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ArrowIcon from '@material-ui/icons/ArrowBack';
import { iMessage } from 'commons/utils';
import styles from './styles/summary';

const AuditSummary = ({ classes, mode, data, onClose }) => {
  const dataKeys = Object.keys(data);

  return (
    <div className={classes.container}>
      <Card className={classes.card}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
            variant="h4"
          >
            {iMessage('title', 'auditSummary')}
          </Typography>
          <Divider />
          <List dense>
            {dataKeys.map((key) => (
              <ListItem key={key}>
                <ListItemText
                  primary={
                    key !== 'elapsed' && (
                      <>
                        <Typography variant="subtitle1" color="textSecondary">
                          {key}
                        </Typography>{' '}
                        <Typography color="textSecondary" variant="caption">
                          total&nbsp;{data[key].length}
                        </Typography>
                      </>
                    )
                  }
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
        <CardActions>
          <Tooltip title={iMessage('action', 'close')}>
            <div>
              <IconButton
                disableRipple
                aria-label="close-summary"
                onClick={() => onClose()}
              >
                <ArrowIcon />
              </IconButton>
            </div>
          </Tooltip>
        </CardActions>
      </Card>
    </div>
  );
};

AuditSummary.propTypes = {
  classes: objectOf(string).isRequired,
  data: objectOf(oneOfType([string, array, object, number])).isRequired,
  onClose: func.isRequired,
  mode: string.isRequired,
};

export default withStyles(styles)(AuditSummary);
