import { withStyles } from 'material-ui/styles'
import { packageStyles } from '../styles'
import { showMessageBox, isUrl, autoBind } from '../../utils'
import { remote, ipcRenderer, shell } from 'electron'
import List, { ListItem, ListItemText } from 'material-ui/List'
import React from 'react'
import moment from 'moment'
import Collapse from 'material-ui/transitions/Collapse'
import MoreVertIcon from 'material-ui-icons/MoreVert'
import Card, { CardHeader, CardContent, CardActions } from 'material-ui/Card'
import ExpandMoreIcon from 'material-ui-icons/ExpandMore'
import Chip from 'material-ui/Chip'
import classnames from 'classnames'
import Typography from 'material-ui/Typography'
import Avatar from 'material-ui/Avatar'
import IconButton from 'material-ui/IconButton'
import Divider from 'material-ui/Divider'
import Loader from 'common/Loader'
import InfoIcon from 'material-ui-icons/Info'
import Home from 'material-ui-icons/Home'
import BugReport from 'material-ui-icons/BugReport'
import LinkIcon from 'material-ui-icons/Link'

class PackageCard extends React.Component {
  constructor() {
    super()
    this._expanded = false
    autoBind(
      ['doNavigate', 'doAction', 'onChangeVersion', 'handleExpandClick'],
      this
    )
  }
  doAction(e) {
    e.preventDefault()

    const target = e.currentTarget
    const action = target.dataset.action
    const { mode, active, setActive, toggleModal } = this.props
    const options = this.props.cmdOptions

    if (action) {
      const selectVersion = this.refs.selectVersion
      let version

      if (action === APP_ACTIONS.UNINSTALL) {
        version = null
      } else {
        version =
          selectVersion && selectVersion.value !== 'false'
            ? selectVersion.value
            : 'latest'
      }

      showMessageBox(
        {
          action,
          name: active.name,
          version
        },
        () => {
          const npmCmd = [`npm ${action.toLowerCase()} `, active.name]
          if (mode === APP_MODES.LOCAL) {
            npmCmd.push(` --${options.join(' --')}`)
          }
          setActive(null)
          toggleModal(true, npmCmd)
          ipcRenderer.send('ipc-event', {
            mode,
            directory,
            ipcEvent: action,
            cmd: [action === 'Uninstall' ? 'uninstall' : 'install'],
            pkgName: active.name,
            pkgVersion: action === 'Uninstall' ? null : version,
            pkgOptions: options
          })
        }
      )
    }
    return false
  }
  onChangeVersion(e) {
    const target = e.currentTarget
    const { active, mode, directory, toggleMainLoader } = this.props
    const version = target.value

    if (version !== 'false') {
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
  handleChange(e, value) {
    this._expanded = value
    this.forceUpdate()
  }
  doNavigate(e) {
    e.preventDefault()
    const url = e.currentTarget.dataset.url
    if (isUrl(url)) {
      shell.openExternal(url)
    }
    return false
  }
  handleExpandClick(e) {
    this._expanded = !this._expanded
    this.forceUpdate()
  }
  render() {
    const { classes, active, isLoading, mode, group } = this.props
    const { doNavigate } = this

    if (!active) {
      return null
    }

    function buildTitle() {
      const { name, author, version } = active
      return group ? `${name} - v${version}` : name
    }

    function buildLink(item, url) {
      return (
        <React.Fragment>
          <span>{url}</span>
          <a title="Navigate" href="#" onClick={doNavigate} data-url={url}>
            <LinkIcon color="accent" />
          </a>
        </React.Fragment>
      )
    }

    return (
      <section>
        <Loader loading={isLoading}>
          <h3 className={classes.heading}>{name}</h3>
          <Divider />
          <Card className={classes.card}>
            <CardHeader
              avatar={
                <Avatar aria-label={active.name} className={classes.avatar}>
                  {active.name[0].toUpperCase()}
                </Avatar>
              }
              action={
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              }
              title={buildTitle()}
              subheader={group || active.version}
            />
            <CardContent>
              <section>
                <h3 className={classes.heading}>Description</h3>
                <Divider />
                <Typography className={classes.description}>
                  {active.description}
                </Typography>
              </section>
              <section>
                <h3
                  className={classnames(classes.heading, classes.headingTail)}
                >
                  Details
                </h3>
                <Divider />
                <List className={classes.list}>
                  {[{ text: 'Homepage' }, { text: 'Issues' }].map(
                    (item, key) => {
                      return (
                        <ListItem key={key}>
                          <Avatar>
                            {item.text === 'Homepage' && <Home />}
                            {item.text === 'Issues' && <BugReport />}
                          </Avatar>
                          <ListItemText
                            primary={item.text}
                            secondary={buildLink(item.text, item.url)}
                          />
                        </ListItem>
                      )
                    }
                  )}
                </List>
              </section>
            </CardContent>
            <CardActions className={classes.actions} disableActionSpacing>
              <IconButton aria-label="Install">add</IconButton>
              <IconButton aria-label="Uninstall">delete</IconButton>
              <IconButton
                className={classnames(classes.expand, {
                  [classes.expandOpen]: this._expanded
                })}
                onClick={this.handleExpandClick}
                aria-expanded={this._expanded}
                aria-label="Show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </CardActions>
            <Collapse in={this._expanded} timeout="auto" unmountOnExit>
              <CardContent className={classes.cardContent}>
                <section>
                  <h3 className={classes.heading}>Author</h3>
                  <Divider />
                  <Typography className={classes.author}>
                    {active.author}
                  </Typography>
                </section>
                {active && active.keywords ? (
                  <div className={classes.keywords}>
                    <h3 className={classes.heading}>Keywords</h3>
                    <Divider />
                    <br />
                    <div className={classes.keywordItems}>
                      {active.keywords.map((keyword, idx) => {
                        return (
                          <Chip
                            className={classes.chip}
                            key={idx}
                            label={keyword}
                          />
                        )
                      })}
                    </div>
                  </div>
                ) : null}
              </CardContent>
            </Collapse>
          </Card>
        </Loader>
      </section>
    )
  }
}

export default withStyles(packageStyles)(PackageCard)
