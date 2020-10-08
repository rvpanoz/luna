import React from 'react';
import { string, arrayOf, objectOf } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import CheckIcon from '@material-ui/icons/CheckOutlined';
import { iMessage } from 'commons/utils';
import Toolbar from './Toolbar';
import styles from './styles/doctor';

const DoctorList = ({ classes, data }) => (
  <Grid className={classes.container} container>
    <Grid item sm={12} md={12} lg={12} xl={12}>
      <Paper elevation={2}>
        <div className={classes.toolbar}>
          <Toolbar title={iMessage('title', 'doctorReport')} />
        </div>
        <Divider />
        <List disablePadding>
          {data &&
            data
              .filter(
                (value) =>
                  value.length && value.indexOf('Recommendation') === -1
              )
              .map((dataValue) => (
                <ListItem key={dataValue}>
                  <ListItemAvatar>
                    <Avatar style={{ backgroundColor: '#fff' }}>
                      <CheckIcon color="secondary" />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={dataValue} />
                </ListItem>
              ))}
        </List>
      </Paper>
    </Grid>
  </Grid>
);

DoctorList.propTypes = {
  classes: objectOf(string).isRequired,
  data: arrayOf(string),
};

export default withStyles(styles)(DoctorList);
