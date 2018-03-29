/**
 * CardTags component
 */

import { objectEntries } from "utils";
import { withStyles } from "material-ui/styles";
import Card, { CardHeader, CardContent } from "material-ui/Card";
import List, {
  ListItem,
  ListItemSecondaryAction,
  ListItemText
} from "material-ui/List";
import Typography from "material-ui/Typography";
import classnames from "classnames";
import React from "react";
import IconButton from "material-ui/IconButton";
import InfoButton from "material-ui-icons/Info";
import UpdateIcon from "material-ui-icons/Update";

const styles = theme => {
  return {
    list: {
      visibility: "visible",
      overflowX: "hidden",
      overflowY: "scroll",
      clear: "both",
      maxHeight: "750px"
    },
    innerListSmall: {
      maxHeight: "300px"
    },
    heading: {
      color: "rgba(0, 0, 0, 0.54)",
      fontSize: "1.1rem",
      fontWeight: 400,
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
    }
  };
};

class CardTags extends React.Component {
  constructor(props) {
    super(props);
    this.getTags = this.getTags.bind(this);
  }
  getTags() {
    const { active, classes } = this.props;
    const data = active["dist-tags"] && objectEntries(active["dist-tags"]);

    if (data) {
      const tags =
        data &&
        data
          .map(item => {
            return {
              name: item[0],
              version: item[1]
            };
          })
          .filter(i => typeof i === "object");

      return tags;
    }
    return null;
  }
  render() {
    const { active, classes } = this.props;

    if (!active) {
      return null;
    }

    const tags = this.getTags();
    return (
      <div className={classnames(classes.list, classes.innerListSmall)}>
        <List>
          {tags &&
            tags.map((d, idx) => {
              return (
                <ListItem key={`tag-${idx}`}>
                  <ListItemText primary={d.name} secondary={d.version} />
                  <ListItemSecondaryAction>
                    <IconButton aria-label="Update" style={{ display: "none" }}>
                      <UpdateIcon
                        onClick={e => {
                          console.log(e, d.name);
                        }}
                      />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
        </List>
      </div>
    );
  }
}

export default withStyles(styles)(CardTags);
