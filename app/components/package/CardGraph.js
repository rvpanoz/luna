import { objectEntries } from "utils";
import React from "react";
import moment from "moment";
import List, { ListItem, ListItemText } from "material-ui/List";

import {
  ResponsiveContainer,
  ReferenceLine,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ScatterChart,
  Scatter
} from "recharts";

const CustomizedTooltip = props => {
  const { payload, active } = props;

  if (active && payload.length) {
    return (
      <List>
        <ListItem>
          <ListItemText
            primary={payload[0].value}
            secondary={payload[1].payload.originalValue}
          />
        </ListItem>
      </List>
    );
  } else {
    return null;
  }
};

class CardGraph extends React.Component {
  constructor(props) {
    super(props);
    this.generateData = this.generateData.bind(this);
  }
  generateData() {
    const { active } = this.props;

    const data = objectEntries(active && active.time);
    let v = 0;

    const graphData =
      data &&
      data
        .map(item => {
          if (item[0] !== "modified" && item[0] !== "created") {
            return {
              name: v++,
              originalValue: item[0],
              value: moment(item[1]).format("DD/MM/YYYY")
            };
          }
        })
        .filter(i => typeof i === "object");

    return graphData;
  }
  componentDidMount() {
    const container = this.refs && this.refs["graph-container"];
  }
  render() {
    const { active } = this.props;

    if (!active || !active.time) {
      return null;
    }

    const data = this.generateData();
    return (
      <section className="chart-container">
        <div
          ref="graph-container"
          style={{ position: "relative", width: "100%" }}
        >
          <ScatterChart style={{ width: "100%" }}>
            <CartesianGrid strokeDasharray="3 3" />
            <YAxis dataKey="name" name="Version" />
            <XAxis dataKey="value" name="Date" />
            <Tooltip content={<CustomizedTooltip payload={data} />} />
            <Legend />
            <Scatter name="Versions and dates" data={data} fill="#8884d8" />
          </ScatterChart>
        </div>
      </section>
    );
  }
}

export default CardGraph;
