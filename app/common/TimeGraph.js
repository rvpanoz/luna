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

const helpers = {
  scaleX(min, max, domain) {
    return d3
      .scaleTime()
      .domain(domain)
      .range([min, max])
  },
  scaleY(min, max, domain) {
    return d3
      .scaleLinear()
      .domain(domain)
      .range([min, max])
  },
  line(d) {
    return d3
      .line()
      .x(function(d) {
        return this.scaleX(new Date(d.date))
      })
      .y(function(d) {
        return this.scaleY(d.version)
      })
  }
}

class TimeGraph extends React.Component {
  constructor(props) {
    super(props)
    this._svg = null
    this._buildData = this._buildData.bind(this)
    this.drawChart = this.drawChart.bind(this)
  }
  _drawXaxis(svg, data, width, height) {
    const dates = pluck('date')(data).sort()
    const scaleX = helpers.scaleX(0, width, [
      new Date(d3.min(dates)),
      new Date()
    ])

    svg
      .append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(30,' + (height + MARGINS.top) + ')')
      .call(d3.axisBottom(scaleX).ticks(d3.timeMonth.every(12)))
  }
  _drawYaxis(svg, data, width, height) {
    const versions = pluck('version')(data).sort()
    const scaleY = helpers.scaleY(0, height, [0, d3.max(versions)])

    svg
      .append('g')
      .attr('class', 'axis axis--y')
      .attr('transform', 'translate(30, 20)')
      .call(d3.axisLeft(scaleY))
  }
  _buildData(time) {
    let data = []

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

      return data
    } catch (e) {
      throw new Error(e)
    }
  }
  drawChart(svg, data) {
    const { classes } = this.props

    // try {
    // } catch (e) {
    // } finally {
    // }

    const width = svg.attr('width') - MARGINS.left - MARGINS.right,
      height = svg.attr('height') - MARGINS.top - MARGINS.bottom,
      line = helpers.line

    //draw X axis (dates)
    this._drawXaxis(svg, data, width, height)

    //draw Y axis (versions)
    this._drawYaxis(svg, data, width, height)

    // Define the div for the tooltip
    // const tooltip = d3
    //   .select('body')
    //   .append('div')
    //   .attr('class', 'tooltip')
    //   .style('opacity', 0)
    //
    // // text label for the y axis
    // svg
    //   .append('text')
    //   .attr('transform', 'rotate(-90)')
    //   .attr('y', 0 - MARGINS.left)
    //   .attr('x', 0 - height / 2)
    //   .attr('dy', '1em')
    //   .style('text-anchor', 'middle')
    //   .text('Semver version')

    // append path
    svg
      .append('path')
      .datum(data)
      .attr('transform', 'translate(30, 10)')
      .attr('d', line)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr('stroke-width', 1.5)

    // Add the points
    svg
      .selectAll('dot')
      .data(data)
      .enter()
      .append('circle')
      .attr('transform', 'translate(30, 10)')
      .attr('r', 2.5)
      .attr('cx', function(d) {
        return helpers.scaleX(new Date(d.date))
      })
      .attr('cy', function(d) {
        return helpers.scaleY(d.version)
      })
      .attr('stroke', '#e91e63')
      .attr('fill', 'white')
      .on('mouseover', function(d) {
        tooltip.html(d.date + '<br/>' + d.version)
        tooltip
          .transition()
          .duration(200)
          .style('opacity', 0.9)
          .style('left', d3.event.pageX + 'px')
          .style('top', d3.event.pageY - 28 + 'px')
      })
      .on('mouseout', function(d) {
        tooltip
          .transition()
          .duration(500)
          .style('opacity', 0)
      })
  }

  componentDidMount() {
    if (this._svg) {
      const { active, classes } = this.props
      const { time } = active || {}

      if (time && typeof time === 'object') {
        const data = this._buildData(time)
        if (data.length) {
          const svgEl = d3.select(this._svg)
          this.drawChart(svgEl, data)
        }
      }
    }
  }
  render() {
    const { classes } = this.props

    return (
      <section className={classes.root}>
        <svg
          width="650"
          height="400"
          ref={(node) => {
            this._svg = node
          }}
        />
      </section>
    )
  }
}

export default withStyles(styles)(TimeGraph)
