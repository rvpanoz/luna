import { withStyles } from "material-ui/styles";
import { styles } from "./styles";
import { showMessageBox, isUrl, autoBind } from "../../utils";
import { remote, ipcRenderer, shell } from "electron";
import List, { ListItem, ListItemText } from "material-ui/List";
import { APP_MODES, APP_ACTIONS, PACKAGE_GROUPS, COMMAND_OPTIONS } from "constants/AppConstants";
import React from "react";
import Collapse from "material-ui/transitions/Collapse";
import Card from "material-ui/Card";
import Chip from "material-ui/Chip";
import classnames from "classnames";
import Divider from "material-ui/Divider";
import InfoIcon from "material-ui-icons/Info";
import LinkIcon from "material-ui-icons/Link";
import CardHeader from "./CardHeader";
import CardContent from "./CardContent";
import CardActions from "./CardActions";
import CardDetails from "./CardDetails";

class PackageCard extends React.Component {
  constructor() {
    super();
    autoBind(
      [
        "doNavigate",
        "doAction",
        "onChangeVersion",
        "handleExpandClick",
        "handleChange",
        "runCommand",
        "_setupGroup",
        "_setupCmdOptions",
        "_buildLink"
      ],
      this
    );
  }
  _setupCmdOptions(group) {
    const { addCommandOption, active, clearCommandOptions, packageJSON } = this.props;

    // clear options
    clearCommandOptions();

    switch (group) {
      case "dependencies":
        addCommandOption("save");
        break;
      case "devDependencies":
        addCommandOption("save-dev");
        break;
      case "optionalDependencies":
        addCommandOption("save-optional");
        break;
      default:
    }

    // save-exact fix
    const groupDependencies = packageJSON[group];
    const name = groupDependencies[active.name];

    if (!isNaN(name.charAt(0))) {
      addCommandOption("save-exact");
    }
  }
  _setupGroup() {
    const {
      mode,
      packageJSON,
      setPackageGroup,
      addCommandOption,
      clearCommandOptions,
      active,
      group
    } = this.props;

    if (mode === APP_MODES.LOCAL) {
      if (!packageJSON) {
        throw new Error("PackageJSON is missing");
      }

      if (!active) {
        return;
      }

      let found = false;

      const groups = Object.keys(PACKAGE_GROUPS).some((group, idx) => {
        const { name } = active;
        found = packageJSON[group] && packageJSON[group][name] ? group : false;
        if (found) {
          setPackageGroup(group);
          this._setupCmdOptions(group);
          return true;
        }
      });
    }
  }
  componentDidMount() {
    this._setupGroup();
  }
  runCommand(action, version) {
    const { mode, directory } = this.props;
    let cmd = [`npm ${action.toLowerCase()} `, active.name];

    if (mode === APP_MODES.LOCAL) {
      cmd.push(` --${options.join(" --")}`);
    }
    setActive(null);
    ipcRenderer.send("ipc-event", {
      mode,
      directory,
      ipcEvent: action,
      cmd: [action === "Uninstall" ? "uninstall" : "install"],
      pkgName: active.name,
      pkgVersion: action === "Uninstall" ? null : version,
      pkgOptions: options
    });
  }
  doAction(e) {
    e.preventDefault();

    const target = e.currentTarget;
    const action = target.dataset.action;
    const { mode, active, setActive, toggleModal } = this.props;
    const options = this.props.cmdOptions;

    if (action) {
      const selectVersion = this.refs.selectVersion;
      let version;

      if (action === APP_ACTIONS.UNINSTALL) {
        version = null;
      } else {
        version = selectVersion && selectVersion.value !== "false" ? selectVersion.value : "latest";
      }

      showMessageBox(
        {
          action,
          name: active.name,
          version
        },
        () => this.runCommand(action, version)
      );
    }
    return false;
  }
  onChangeVersion(e, value) {
    const { active, mode, directory, toggleMainLoader, setVersion } = this.props;
    const version = e.target.value;

    if (version && version !== "false") {
      setVersion(version);
      ipcRenderer.send("ipc-event", {
        mode,
        directory,
        ipcEvent: "view-package",
        cmd: ["view"],
        pkgName: active.name,
        pkgVersion: version
      });
    }
    return false;
  }
  doNavigate(e) {
    e.preventDefault();
    const url = e.currentTarget.dataset.url;
    if (isUrl(url)) {
      shell.openExternal(url);
    }
    return false;
  }
  handleExpandClick(e) {
    const { toggleExpanded } = this.props;
    toggleExpanded();
    this.forceUpdate();
  }
  handleChange(e, value) {
    const { setActiveTab } = this.props;
    setActiveTab(value);
    this.forceUpdate();
  }
  _buildLink(item, url) {
    return (
      <React.Fragment>
        <span>{url}</span>
        <a title="navigate" href="#" onClick={this.doNavigate} data-url={url}>
          <LinkIcon color="primary" />
        </a>
      </React.Fragment>
    );
  }
  render() {
    const { classes, active, group, expanded, ...props } = this.props;
    const { doNavigate } = this;

    if (!active) {
      return null;
    }

    return (
      <section className={classes.root}>
        <h3 className={classes.heading}>{name}</h3>
        <Divider />
        <Card className={classes.card}>
          <CardHeader active={active} classes={classes} group={group} />
          <CardContent
            classes={classes}
            active={active}
            group={group}
            handleChange={this.handleChange}
            buildLink={this._buildLink}
            onChangeVersion={this.onChangeVersion}
            {...props}
          />
          <CardActions
            handleExpandClick={this.handleExpandClick}
            expanded={expanded}
            classes={classes}
          />
          <Collapse in={expanded} timeout="auto" unmountOnExit className={classes.collapseContent}>
            <h3 className={classes.heading}>Maintainers</h3>
            <Divider />
            <List>
              {active &&
                active.maintainers.map((item, idx) => {
                  return (
                    <ListItem key={idx}>
                      <ListItemText primary={item} secondary="Jan 9, 2014" />
                    </ListItem>
                  );
                })}
            </List>
            <h3 className={classes.heading}>Dependencies</h3>
            <Divider />
            <List>
              {active &&
                active.dependencies &&
                Object.keys(active.dependencies).map((item, idx) => {
                  console.log(item);
                  return (
                    <ListItem key={idx}>
                      <ListItemText primary={item} secondary="Jan 9, 2014" />
                    </ListItem>
                  );
                })}
            </List>
          </Collapse>
        </Card>
      </section>
    );
  }
}

export default withStyles(styles)(PackageCard);
