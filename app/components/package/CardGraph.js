import {objectEntries} from 'utils'
import React from 'react'
import BrushChart from 'britecharts/dist/umd/brush.min';
import 'britecharts/dist/css/britecharts.min.css'
const d3Selection = require('d3-selection');
const d3TimeFormat = require('d3-time-format');
const semver2int = require('semver2int');

class CardGraph extends React.Component {
  constructor(props) {
    super(props)
    this.setState = {

    }
    this.buildGraph = this.buildGraph.bind(this)
    this.generateData = this.generateData.bind(this)
  }
  generateData() {
    const {
      active
    } = this.props

    const data = objectEntries(active && active.time);
    const dataSet = data.map(item=>{
      if(item[0] !== 'modified' && item[0] !== 'created') {
        return {
          value: semver2int(item[0]) / 1000,
          date: item[1]
        }
      }
    }).filter(i=>typeof i === 'object')

    return dataSet;
  }
  buildGraph(container) {
    const brushContainer = d3Selection.select(container);
    const brushChart = new BrushChart();
    const containerWidth = brushContainer.node() ? brushContainer.node().getBoundingClientRect().width : false;

    if(brushContainer.node()) {
      const dataset = this.generateData()

      brushChart
        .width(containerWidth)
        .height(400)
        .on('customBrushStart', (brushExtent) => {
                let format = d3TimeFormat.timeFormat('%m/%d/%Y');

                // d3Selection.select('.js-start-date').text(format(brushExtent[0]));
                // d3Selection.select('.js-end-date').text(format(brushExtent[1]));
                //
                // d3Selection.select('.js-date-range').classed('is-hidden', false);
            })

        brushContainer.datum(dataset).call(brushChart);
    }
  }
  componentDidMount() {
    const container = this.refs && this.refs['graph-container']

    if(container) {
      this.buildGraph(container)
    }
  }
  render() {
    return (
      <section id="brush" className="britechart">
        <div ref="graph-container" style={{position: 'relative', width: '100%'}}/>
      </section>
    )
  }
}

export default CardGraph
