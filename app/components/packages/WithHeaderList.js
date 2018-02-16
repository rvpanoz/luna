import React from "react";
import PropTypes from "prop-types";
import Header from "./ListHeader";
import List from "./List";

function withHeaderList(List, options) {
  return class extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {
      const { props } = this.props;
      const { title } = options;

      return (
        <section>
          <Header {...props} title={title} />
          <List {...props} />
        </section>
      );
    }
  };
}

export default withHeaderList;
