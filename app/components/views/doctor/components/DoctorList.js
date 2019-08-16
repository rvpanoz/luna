import React from 'react'
import { string, arrayOf, objectOf } from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import CheckIcon from '@material-ui/icons/CheckOutlined';
import { iMessage } from 'commons/utils';
import ToolbarView from './Toolbar';
import styles from '../styles/doctorList'

const DoctorList = ({ classes, data }) => <Paper elevation={2}>
  <div className={classes.toolbar}>
    <ToolbarView
      title={iMessage('title', 'doctorReport')}
    />
  </div>
  <Divider />
  <List disablePadding>
    {data && data.filter(value => value.length && value.indexOf('Recommendation') === -1).map(dataValue => (
      <ListItem key={dataValue}>
        <ListItemAvatar>
          <Avatar style={{ backgroundColor: '#fff' }}>
            <CheckIcon color="primary" />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={dataValue} />
      </ListItem>
    ))}
  </List>
</Paper>

DoctorList.propTypes = {
  classes: objectOf(string).isRequired,
  data: arrayOf(string)
}

export default withStyles(styles)(DoctorList);