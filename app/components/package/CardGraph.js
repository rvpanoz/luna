//TODO...

import { objectEntries } from 'utils'
import React from 'react'
import moment from 'moment'
import semver2int from 'semver2int'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts'

const generateData = (dataTime) => {
  const data = objectEntries(dataTime)
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

const CardGraph = (props) => {
  const { time } = props

  if (!time) {
    return null
  }

  return (
    <LineChart
      width={600}
      height={300}
      data={generateData(time)}
      margin={{ top: 15, right: 0, left: 0, bottom: 5 }}
    >
      <XAxis dataKey="date" />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="version" stroke="#8884d8" />
    </LineChart>
  )
}

export default CardGraph
