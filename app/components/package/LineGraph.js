/**
 * LineGraph component
 * http://recharts.org/#/en-US/
 */

import { objectEntries } from "utils";
import { withStyles } from "material-ui/styles";
import List, {
  ListItem,
  ListItemSecondaryAction,
  ListItemText
} from "material-ui/List";
import React from "react";
import Grid from "material-ui/Grid";
import Typography from "material-ui/Typography";
import moment from "moment";
import semver2int from "semver2int";
import CardTags from "./CardTags";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

const styles = theme => {
  return {
    root: {
      width: "100%"
    }
  };
};

const CustomTooltip = props => {
  const { active, mapping } = props;

  if (active) {
    const { payload, label } = props;
    const { value, dataKey } = payload[0];
    const { date } = payload[0].payload;

    return (
      <div className="custom-tooltip">
        <p className="label">{`Version: ${value}`}</p>
        <p className="info">{`Date: ${date}`}</p>
      </div>
    );
  }

  return null;
};

class Graph extends React.Component {
  static mapping = {
    t: 1
  };
  constructor(props) {
    super(props);
    this.generateData = this.generateData.bind(this);
  }

  generateData() {
    const { active } = this.props;
    const data = active.time && objectEntries(active.time);

    console.log(this.mapping);

    if (data) {
      const graphData =
        data &&
        data
          .map(item => {
            if (item[0] !== "modified" && item[0] !== "created") {
              return {
                version: item[0],
                date: moment(item[1]).format("DD/MM/YYYY")
              };
            }
          })
          .filter(i => typeof i === "object");

      return graphData;
    }
    return null;
  }
  render() {
    const { active, classes } = this.props;

    if (!active.time) {
      return null;
    }

    const data = this.generateData();

    return (
      <div style={{ backgroundColor: "#fff" }}>
        <LineChart
          width={600}
          height={300}
          data={data}
          margin={{ top: 25, right: 10, left: 10, bottom: 5 }}
        >
          <XAxis dataKey="date" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip
            content={
              <CustomTooltip
                active={true}
                wrapperStyle={{ width: 100, backgroundColor: "#ccc" }}
              />
            }
          />
          <Legend />
          <Line type="monotone" dataKey="version" stroke="#8884d8" />
        </LineChart>
      </div>
    );
  }
}

export default withStyles(styles)(Graph);
