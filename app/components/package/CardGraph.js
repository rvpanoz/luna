import { objectEntries } from 'utils'
import { withStyles } from 'material-ui/styles'
import List, {
  ListItem,
  ListItemSecondaryAction,
  ListItemText
} from 'material-ui/List'
import React from 'react'
import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'
import moment from 'moment'
import semver2int from 'semver2int'
import CardTags from 'components/package/CardTags'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts'

const styles = (theme) => {
  return {
    root: {
      width: '100%'
    }
  }
}

//TODO: improve algorithm
const formatValue = (value) => {
  const parts = value.toString().split('.')
  const base = parts[0] || '0'
  const digits = parts[1] || [0, 0]

  let semver = []
  if (digits && digits.length === 4) {
    semver = [].concat([digits[1], digits[3]])
  } else if (digits && digits.length === 2) {
    semver = [].concat([digits[1], digits[0]])
  } else {
    semver = [].concat(digits)
  }
  return `${Math.abs(base)}.${semver.join('.')}`
}

const CustomTooltip = (props) => {
  const { active } = props

  if (active) {
    const { payload, label } = props
    const { value, dataKey } = payload[0]
    const { date } = payload[0].payload
    const fvalue = formatValue(value)

    return (
      <div className="custom-tooltip">
        <p className="label">{`Version: ${fvalue}`}</p>
        <p className="info">{`Date: ${date}`}</p>
      </div>
    )
  }

  return null
}

class CardGraph extends React.Component {
  constructor(props) {
    super(props)
    this._generateData = this._generateData.bind(this)
  }
  componentDidMount() {}
  _generateData() {
    const { active } = this.props
    const data = active.time && objectEntries(active.time)

    if (data) {
      const graphData =
        data &&
        data
          .map((item) => {
            if (item[0] !== 'modified' && item[0] !== 'created') {
              return {
                version: semver2int(item[0]) / 10000,
                date: moment(item[1]).format('DD/MM/YYYY')
              }
            }
          })
          .filter((i) => typeof i === 'object')

      return graphData
    }
    return null
  }
  render() {
    const { active, classes } = this.props

    if (!active.time) {
      return null
    }

    const data = this._generateData()

    return (
      <Grid container>
        <Grid item xs={10} md={9} lg={10}>
          <div style={{ backgroundColor: '#fff' }}>
            <LineChart
              width={600}
              height={300}
              data={data}
              margin={{ top: 15, right: 0, left: 0, bottom: 5 }}
            >
              <XAxis dataKey="date" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip
                content={
                  <CustomTooltip
                    active={true}
                    wrapperStyle={{ width: 100, backgroundColor: '#ccc' }}
                  />
                }
              />
              <Legend />
              <Line type="monotone" dataKey="version" stroke="#8884d8" />
            </LineChart>
          </div>
        </Grid>
        <Grid item xs={2} md={3} lg={2}>
          <CardTags active={active} />
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(CardGraph)
