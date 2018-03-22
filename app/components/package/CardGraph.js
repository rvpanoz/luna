import {objectEntries} from 'utils'
import React from 'react'
import BrushChart from 'britecharts/dist/umd/brush.min';
const d3Selection = require('d3-selection');
const d3TimeFormat = require('d3-time-format');
import 'britecharts/dist/css/common/common.min.css'
import 'britecharts/dist/css/charts/brush.min.css'

class CardGraph extends React.Component {
  constructor(props) {
    super(props)
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
          value: item[0],
          date: item[1]
        }
      }
    }).filter(i=>typeof i === 'object')

    console.log(dataSet);

    return [{
        value: 11,
        date: '2011-01-06T00:00:00Z'
    },
    {
        value: 2,
        date: '2011-01-07T00:00:00Z'
    }]
  }
  buildGraph(container) {
    const brushContainer = d3Selection.select(container);
    const brushChart = new BrushChart();
    const containerWidth = brushContainer.node() ? brushContainer.node().getBoundingClientRect().width : false;
    const dataset = this.generateData()

  brushChart
    .width(500)
    .height(300)
    brushContainer.datum(dataset).call(brushChart);
  }
  componentDidMount() {
    const container = this.refs && this.refs['graph-container']

    if(container) {
      this.buildGraph(container)
    }

  }
  render() {
    return (
      <section ref="graph-container"/>
    )
  }
}

export default CardGraph
