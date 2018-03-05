/**
 * PackageCard component
 *
 */

import { withStyles } from 'material-ui/styles'
import { packageCardStyles } from 'styles/components'
import { showMessageBox, isUrl, autoBind } from 'utils'
import List, { ListItem, ListItemText } from 'material-ui/List'
import {
  APP_MODES,
  APP_ACTIONS,
  PACKAGE_GROUPS,
  COMMAND_OPTIONS
} from 'constants/AppConstants'
import { ipcRenderer } from 'electron'
import React from 'react'
import PropTypes from 'prop-types'
import Collapse from 'material-ui/transitions/Collapse'
import Card from 'material-ui/Card'
import Chip from 'material-ui/Chip'
import classnames from 'classnames'
import Divider from 'material-ui/Divider'
import InfoIcon from 'material-ui-icons/Info'
import LinkIcon from 'material-ui-icons/Link'
import CardHeader from './CardHeader'
import CardContent from './CardContent'
import CardActions from './CardActions'
import CardDetails from './CardDetails'

class PackageCard extends React.Component {
  constructor(props) {
    super(props)
    autoBind(['_setupOptions', 'onChangeVersion', 'onExpandClick'], this)
  }
  componentDidUpdate(prevProps) {
    const { active, mode, packageJSON, setPackageGroup, setVersion } = prevProps
    console.log(active)
    let groupName = ''
    if (mode === APP_MODES.LOCAL) {
      const { name } = active
      const group = Object.keys(PACKAGE_GROUPS).some((group, idx) => {
        groupName = packageJSON[group] && packageJSON[group][name] ? group : ''

        // switch (group) {
        //   case 'dependencies':
        //     addCommandOption('save')
        //     break
        //   case 'devDependencies':
        //     addCommandOption('save-dev')
        //     break
        //   case 'optionalDependencies':
        //     addCommandOption('save-optional')
        //     break
        //   default:
        // }
        //
        // // save-exact fix
        // const groupDependencies = packageJSON[group]
        // const depName = groupDependencies[name]
        //
        // if (!isNaN(depName.charAt(0))) {
        //   addCommandOption('save-exact')
        // }
      })
      console.log(groupName)
      // setPackageGroup(groupName)
    }

    // setVersion(active.version)
  }
  onExpandClick(e) {
    const { toggleExpanded } = this.props
    toggleExpanded()
    this.forceUpdate()
  }
  onChangeVersion(e, value) {
    const { active, mode, directory, toggleMainLoader, setVersion } = this.props
    const version = e.target.value

    if (version && version !== 'false') {
      toggleMainLoader(true)
      setVersion(version)
      ipcRenderer.send('ipc-event', {
        mode,
        directory,
        ipcEvent: 'view-package',
        cmd: ['view'],
        pkgName: active.name,
        pkgVersion: version
      })
    }
    return false
  }
  render() {
    const {
      classes,
      active,
      group,
      mode,
      directory,
      expanded,
      setActive,
      toggleLoader,
      addCommandOption,
      clearCommandOptions,
      cmdOptions,
      actions,
      defaultActions,
      version,
      setupSnackbar,
      toggleSnackbar,
      ...rest
    } = this.props

    return (
      <section className={classes.root}>
        <Card className={classes.card}>
          <CardHeader
            classes={classes}
            mode={mode}
            active={active}
            group={group}
          />
          <CardContent
            version={version}
            classes={classes}
            active={active}
            cmdOptions={cmdOptions}
            onChangeVersion={this.onChangeVersion}
            addCommandOption={addCommandOption}
            clearCommandOptions={clearCommandOptions}
            mode={mode}
          />
          <CardActions
            active={active}
            handleExpandClick={this.onExpandClick}
            expanded={expanded}
            setActive={setActive}
            toggleLoader={toggleLoader}
            classes={classes}
            actions={actions}
            defaultActions={defaultActions}
            setupSnackbar={setupSnackbar}
            toggleSnackbar={toggleSnackbar}
            mode={mode}
            directory={directory}
            cmdOptions={cmdOptions}
          />
          <Collapse
            style={{ display: 'none' }}
            in={expanded}
            timeout="auto"
            unmountOnExit
            className={classes.collapseContent}
          >
            <CardDetails {...active} classes={classes} />
          </Collapse>
        </Card>
      </section>
    )
  }
}

const { array, bool, func, object, string, number } = PropTypes

PackageCard.propTypes = {
  classes: object.isRequired,
  active: object.isRequired,
  setupSnackbar: func.isRequired,
  toggleSnackbar: func.isRequired,
  mode: string.isRequired,
  setActive: func.isRequired,
  toggleLoader: func.isRequired,
  addCommandOption: func.isRequired,
  clearCommandOptions: func.isRequired,
  actions: array.isRequired,
  defaultActions: array.isRequired,
  group: string,
  directory: string,
  expanded: bool,
  cmdOptions: array,
  version: string
}

export default withStyles(packageCardStyles)(PackageCard)
