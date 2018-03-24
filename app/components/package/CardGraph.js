import { objectEntries } from 'utils'
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

class CardGraph extends React.Component {
  constructor(props) {
    super(props)
    this._generateData = this._generateData.bind(this)
  }
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
  _getTags() {
    const { active } = this.props
    const data = active['dist-tags'] && objectEntries(active['dist-tags'])

    if (data) {
      const tags =
        data &&
        data
          .map((item) => {
            return {
              name: item[0],
              version: item[1]
            }
          })
          .filter((i) => typeof i === 'object')

      return tags
    }
    return null
  }
  render() {
    const { active, classes } = this.props

    if (!active.time) {
      return null
    }

    const data = this._generateData()
    const tags = this._getTags()

    return (
      <section>
        <Grid container>
          <Grid item xs={9}>
            <LineChart
              width={500}
              height={300}
              data={data}
              margin={{ top: 15, right: 0, left: 0, bottom: 5 }}
            >
              <XAxis dataKey="date" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="version" stroke="#8884d8" />
            </LineChart>
          </Grid>
          <Grid item xs={3}>
            <CardTags active={active} classes={classes} />
          </Grid>
        </Grid>
      </section>
    )
  }
}

export default CardGraph
