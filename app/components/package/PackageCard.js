/**
 * PackageCard component
 */

import { withStyles } from 'material-ui/styles'
import {
  APP_MODES,
  APP_ACTIONS,
  PACKAGE_GROUPS,
  APP_INFO
} from 'constants/AppConstants'
import { contains, find, propEq } from 'ramda'
import { CardContent as MuiCardContent } from 'material-ui/Card'
import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import Card from 'material-ui/Card'
import Divider from 'material-ui/Divider'
import Collapse from 'material-ui/transitions/Collapse'
import Typography from 'material-ui/Typography'
import CardHeader from './CardHeader'
import CardContent from './CardContent'
import CardActions from './CardActions'
import CardDetails from './CardDetails'

const { object, string } = PropTypes

const styles = (theme) => ({
  root: {
    width: '100%'
  },
  secondaryHeading: {
    margin: theme.spacing.unit + 15,
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  },
  button: {
    margin: theme.spacing.unit
  },
  card: {
    maxWidth: '100%'
  },
  content: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  collapseContent: {
    margin: theme.spacing.unit * 2
  },
  column: {
    flexBasis: '33.33%'
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
  },
  controls: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: theme.spacing.unit,
    '& fieldset': {
      margin: theme.spacing.unit
    }
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  },
  details: {
    visibility: 'visible',
    width: '100%',
    maxHeight: 200,
    marginBottom: 20,
    overflowX: 'hidden',
    overflowY: 'auto'
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    maxWidth: 300
  },
  textField: {
    margin: theme.spacing.unit,
    minWidth: 120,
    maxWidth: 300
  },
  chip: {
    margin: theme.spacing.unit / 4
  },
  description: {
    marginTop: 10
  },
  listItem: {
    paddingLeft: 0
  },
  actions: {
    display: 'flex'
  },
  author: {
    flexGrow: 1
  },
  keywords: {
    flexGrow: 1,
    marginTop: 10
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    }),
    marginLeft: 'auto'
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  updated: {
    fontSize: 12,
    fontWeight: 300,
    color: theme.palette.primary.dark,
    margin: '1em 0 0.7em'
  },
  center: {
    position: 'absolute',
    top: '25%',
    left: '50%'
  },
  avatar: {
    backgroundColor: theme.palette.secondary.dark
  },
  heading: {
    color: 'rgba(0, 0, 0, 0.54)',
    fontSize: '1.1rem',
    fontWeight: 400,
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    lineHeight: '1.35417em'
  },
  headingTail: {
    marginTop: 15
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  innerList: {
    clear: 'both',
    visibility: 'visible',
    overflowX: 'hidden',
    overflowY: 'auto'
  },
  innerListLong: {
    maxHeight: '300px'
  },
  innerListSmall: {
    maxHeight: '200px'
  },
  actions: {
    display: 'flex'
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    }),
    marginLeft: 'auto'
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    marginBottom: 16,
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
})

class PackageCard extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    const {
      expanded,
      packageJSON,
      active,
      mode,
      group,
      addCommandOption,
      setPackageGroup,
      clearCommandOptions,
      toggleExpanded
    } = this.props
    const { version } = active || {}

    clearCommandOptions()

    if (mode === APP_MODES.LOCAL && active) {
      let found = false

      Object.keys(PACKAGE_GROUPS).some((groupName, idx) => {
        found =
          packageJSON[groupName] && packageJSON[groupName][active.name]
            ? groupName
            : false
        if (found) {
          const pkgVersion = packageJSON[found][active.name]
          const symbols = ['~', '^']

          if (pkgVersion && !contains(pkgVersion[0], symbols)) {
            setPackageGroup(groupName, 'save-exact')
          } else {
            setPackageGroup(groupName)
          }

          return found
        }
      })
    }
  }
  render() {
    const {
      active,
      classes,
      cmdOptions,
      mode,
      version,
      addCommandOption,
      removeCommandOption,
      clearCommandOptions,
      onChangeVersion,
      group,
      toggleExpanded,
      toggleLoader,
      toggleMainLoader,
      expanded,
      defaultActions,
      toggleSnackbar,
      directory,
      actions,
      setActive,
      settings,
      packageJSON,
      packages
    } = this.props

    return (
      <section className={classes.root}>
        <Card className={classes.card} raised={true}>
          <CardHeader active={active} mode={mode} group={group} />
          <CardContent
            version={version}
            active={active}
            cmdOptions={cmdOptions}
            onChangeVersion={onChangeVersion}
            addCommandOption={addCommandOption}
            removeCommandOption={removeCommandOption}
            clearCommandOptions={clearCommandOptions}
            mode={mode}
            group={group}
            packageJSON={packageJSON}
            fetchGithub={settings && settings.fetchGithub}
            toggleMainLoader={toggleMainLoader}
          />
          <CardActions
            isInstalled={find(propEq('name', active.name))(packages)}
            active={active}
            handleExpandClick={toggleExpanded}
            expanded={expanded}
            setActive={setActive}
            toggleLoader={toggleLoader}
            actions={actions}
            expanded={expanded}
            defaultActions={defaultActions}
            toggleSnackbar={toggleSnackbar}
            mode={mode}
            version={version}
            directory={directory}
            cmdOptions={cmdOptions}
          />
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <MuiCardContent>
              <Typography
                component="h3"
                variant="title"
                className={classes.heading}
              >
                Distribution
              </Typography>
              <Divider />
              <CardDetails dist={active && active.dist} />
            </MuiCardContent>
          </Collapse>
        </Card>
      </section>
    )
  }
}

PackageCard.propTypes = {
  active: object.isRequired,
  classes: object.isRequired,
  mode: string.isRequired
}

export default withStyles(styles)(PackageCard)
