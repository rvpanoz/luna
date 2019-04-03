/* eslint-disable react/require-default-props */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import styles from './styles/auditReport';

const cardsStyles = theme => ({
  card: {
    width: '100%',
    padding: theme.spacing.unit
  },
  title: {
    fontSize: 18
  },
  value: {
    fontSize: 22
  }
});

const ItemCard = ({ classes, name, value }) => (
  <Card className={classes.card}>
    <CardContent>
      <Typography
        variant="h4"
        className={classes.title}
        color="textSecondary"
        gutterBottom
      >
        {name}
      </Typography>
      <Typography
        className={classes.value}
        variant="h5"
        component="h2"
        color="secondary"
      >
        {value}
      </Typography>
    </CardContent>
  </Card>
);

ItemCard.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  name: PropTypes.string,
  value: PropTypes.oneOf([PropTypes.array, PropTypes.string])
};

const WithStylesItemCard = withStyles(cardsStyles)(ItemCard);

const AuditReport = ({ classes, title, data }) => {
  const [reportData, setReportData] = useState([]);

  // useEffect(() => {
  //   const contentData =
  //     data &&
  //     data.reduce(
  //       (acc, dataItem) => {
  //         const { value } = dataItem;
  //         const isValueArray = Array.isArray(value);

  //         if (isValueArray) {
  //           return {
  //             ...acc,
  //             vulnerabilities: value
  //           };
  //         }

  //         return {
  //           ...acc,
  //           dependencies: [...acc.dependencies, data]
  //         };
  //       },
  //       {
  //         dependencies: [],
  //         vulnerabilities: []
  //       }
  //     );

  //   if (contentData) {
  //     setReportData(contentData);
  //   }
  // }, [data]);

  const { dependencies, vulnerabilities } = reportData || {};

  return (
    <section className={classes.root}>
      <div className={classes.container}>
        <div className={classes.title}>
          <Typography className={classes.header}>{title}</Typography>
        </div>
        <div className={classes.tabs}>
          <Tabs
            value="0"
            indicatorColor="primary"
            textColor="primary"
            onChange={() => {}}
          >
            <Tab label="Active" />
            <Tab label="Disabled" disabled />
            <Tab label="Active" />
          </Tabs>
        </div>
      </div>

      <div className={classes.container} />

      {/* <Typography className={classes.header}>{title}</Typography>
      <Divider light />
      {!data ? (
        <Typography className={classes.nodata}>No results found</Typography>
      ) : (
        <div className={classes.container}>
          <div className={classes.column}>
            {dependencies &&
              dependencies.map(itemDep => (
                <WithStylesItemCard
                  key={itemDep.name}
                  name={itemDep.name}
                  value={itemDep.value}
                />
              ))}
          </div>
          <div className={classes.column}>
            {vulnerabilities &&
              vulnerabilities.map(itemDep => (
                <WithStylesItemCard
                  key={itemDep.name}
                  name={itemDep.name}
                  value={itemDep.value}
                />
              ))}
          </div>
        </div>
      )} */}
    </section>
  );
};

AuditReport.defaultProps = {
  title: 'Results',
  data: []
};

AuditReport.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  title: PropTypes.string,
  data: PropTypes.objectOf(PropTypes.array)
};

export default withStyles(styles)(AuditReport);
