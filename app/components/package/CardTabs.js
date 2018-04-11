/**
 * Card tabs component
 **/

import { withStyles } from "material-ui/styles";
import { APP_INFO } from "constants/AppConstants";
import { autoBind } from "utils";
import React from "react";
import PropTypes from "prop-types";
import AppBar from "material-ui/AppBar";
import Typography from "material-ui/Typography";
import Tabs, { Tab } from "material-ui/Tabs";
import classnames from "classnames";
import {
  List as ListIcon,
  Group as GroupIcon,
  PermIdentity as UserIcon
} from "material-ui-icons";

const styles = theme => {
  return {
    root: {
      flexGrow: 1,
      marginTop: theme.spacing.unit * 3,
      backgroundColor: theme.palette.white
    }
  };
};

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 6 * 3 }}>
      {props.children}
    </Typography>
  );
}

class CardTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 0
    };
    autoBind(["handleChange"], this);
  }
  handleChange(e, value) {
    this.setState({ active: value });
  }
  getDependencies() {}
  getDevDependencies() {}
  getOpti;
  render() {
    const { classes } = this.props;
    const { active } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs
            value={active}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="inherit"
            fullWidth
          >
            <Tab icon={<ListIcon />} label="Dependencies" />
            <Tab icon={<GroupIcon />} label="Dev Dependencies" />
            <Tab icon={<UserIcon />} label="Maintainers" />
          </Tabs>
        </AppBar>
        {active === 0 && <TabContainer>Dependendencies</TabContainer>}
        {active === 1 && <TabContainer>DevDependencies</TabContainer>}
        {active === 2 && <TabContainer>Maintainers</TabContainer>}
      </div>
    );
  }
}

CardTabs.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CardTabs);
