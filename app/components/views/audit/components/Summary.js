import React from 'react';
import { withStyles } from '@material-ui/core';
import {
  objectOf,
  oneOfType,
  string,
  array,
  object,
  func,
  number
} from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { iMessage } from 'commons/utils';
import styles from '../styles/summary';

const Summary = ({ classes, data, onClose }) => {
  const dataKeys = Object.keys(data);

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
          variant="h6"
        >
          {iMessage('title', 'auditSummary')}
        </Typography>
        <Divider />
        <List dense>
          {dataKeys.map(key => (
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
              <ListItemSecondaryAction>
                {key !== 'elapsed' && <Button small>View</Button>}
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </CardContent>
      <CardActions>
        <Button size="small" color="secondary" onClick={onClose}>
          Close
        </Button>
      </CardActions>
    </Card>
  );
};

Summary.propTypes = {
  classes: objectOf(string).isRequired,
  data: objectOf(oneOfType([string, array, object, number])).isRequired,
  onClose: func.isRequired
};

export default withStyles(styles)(Summary);
