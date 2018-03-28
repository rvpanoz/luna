import { objectEntries, firstToUpper } from "utils";
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

//deprecated
import semver2int from "semver2int";
import CardTags from "./CardTags";
//

import { pickAll } from "ramda";
import {
  BarChart,
  Bar,
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

class BarGraph extends React.Component {
  constructor(props) {
    super(props);
    this.generateData = this.generateData.bind(this);
  }
  componentDidMount() {}
  generateData() {
    const { active } = this.props;
    const { stats } = active || {};
    const graphData = [];

    const data = objectEntries(
      pickAll(
        [
          "stargazers_count",
          "watchers_count",
          "network_count",
          "forks_count",
          "subscribers_count"
        ],
        stats
      )
    ).map((a, idx) => {
      return {
        name: firstToUpper(a[0].split("_")[0]),
        value: a[1]
      };
    });

    return data;
  }
  render() {
    const { active, classes } = this.props;

    if (!active) {
      return null;
    }

    const { stats } = active;

    if (!stats || typeof stats !== "object") {
      return <Typography variant="body2">No stats available</Typography>;
    }

    const data = this.generateData();

    return (
      <div style={{ backgroundColor: "#fff" }}>
        <BarChart
          width={600}
          height={300}
          data={data}
          barSize={20}
          barCategoryGapPercentage={"20%"}
          barGap={6}
          margin={{ top: 25, right: 10, left: 10, bottom: 5 }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="1 1" />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" stroke="#8884d8" />
        </BarChart>
      </div>
    );
  }
}

export default withStyles(styles)(BarGraph);
