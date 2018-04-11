/**
 * Data over time
 * http://d3js.org
 **/

import { isAlpha, isBeta, isRC, objectEntries } from 'utils'
import { withStyles } from 'material-ui/styles'
import * as d3 from 'd3'
import React from 'react'
import PropTypes from 'prop-types'
import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider'
import { pluck } from 'ramda'

const MARGINS = {
  top: 20,
  right: 15,
  bottom: 20,
  left: 25
}

const parseDate = d3.timeParse('%Y-%m-%dT%H:%M:%SZ')
const styles = (theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1
  }
})

class TimeGraph extends React.Component {
  constructor(props) {
    super(props)
    this._drawChart = this._drawChart.bind(this)
  }
  _drawChart(data) {
    const { classes } = this.props
    const svgEl = this.svgEl
    const dates = pluck('date')(data).sort()
    const versions = pluck('version')(data).sort()

    if (svgEl && versions.length) {
      let svg = d3.select(svgEl)

      const width = svg.attr('width') - MARGINS.left - MARGINS.right,
        height = svg.attr('height') - MARGINS.top - MARGINS.bottom

      const scaleX = d3
        .scaleTime()
        .domain([new Date(d3.min(dates)), new Date()])
        .range([0, width])

      const scaleY = d3
        .scaleLinear()
        .domain([0, d3.max(versions)])
        .range([height, 0])

      svg
        .append('g')
        .attr('class', 'axis axis--x')
        .attr('transform', 'translate(30,' + (height + MARGINS.top) + ')')
        .call(d3.axisBottom(scaleX).ticks(d3.timeMonth.every(6)))

      svg
        .append('g')
        .attr('class', 'axis axis--y')
        .attr('transform', 'translate(30, 20)')
        .call(d3.axisLeft(scaleY))

      // text label for the y axis
      svg
        .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 0 - MARGINS.left)
        .attr('x', 0 - height / 2)
        .attr('dy', '1em')
        .style('text-anchor', 'middle')
        .text('Semver version')

      const tooltip = d3
        .select('body')
        .append('div')
        .style('position', 'fixed')
        .style('z-index', '999')

      svg
        .append('g')
        .attr('transform', 'translate(30, 10)')
        .selectAll('.dot')
        .data(data)
        .enter()
        .append('circle')
        .attr('class', 'dot')
        .attr('r', 2)
        .attr('cx', function(d) {
          return scaleX(new Date(d.date))
        })
        .attr('cy', function(d) {
          return scaleY(d.version)
        })
        .style('fill', '#c2185b')
        .on('mouseover', function(d) {
          tooltip
            .transition()
            .duration(200)
            .style('opacity', 0.9)
          tooltip
            .html(d.date + '<br/>' + d.version)
            .style('left', d3.event.clientX + 'px')
            .style('top', d3.event.clientY - 28 + 'px')
        })
        .on('mouseout', function(d) {
          tooltip
            .transition()
            .duration(500)
            .style('opacity', 0)
        })
    }
  }
  componentDidMount() {
    const { active, classes } = this.props
    const { time } = active || {}

    let data = []

    if (time && typeof time === 'object') {
      try {
        const _versions = Object.keys(time).sort()
        let dates = Object.values(time).sort()

        const versions =
          _versions &&
          _versions
            .map((version) => {
              const isBetaVersion = isBeta(version)
              const isAlphaVersion = isAlpha(version)
              const isRCVersion = isRC(version)

              if (
                !isBetaVersion &&
                !isAlphaVersion &&
                !isRCVersion &&
                version.indexOf('.') > -1
              ) {
                const parts = version.split('.')
                return parseFloat(Number(parts[0] + '.' + parts[1] + parts[2]))
              }
            })
            .filter((v, i) => {
              if (!v) {
                dates.splice(i, 1)
              }
              return v
            })

        versions.forEach((v, i) => {
          data.push({
            version: v,
            date: dates[i]
          })
        })
      } catch (e) {
        throw new Error(e)
      }

      this._drawChart(data)
    }
  }
  render() {
    const { classes } = this.props

    return (
      <section className={classes.root}>
        <svg
          width="700"
          height="400"
          ref={(node) => {
            this.svgEl = node
          }}
        />
      </section>
    )
  }
}

export default withStyles(styles)(TimeGraph)
