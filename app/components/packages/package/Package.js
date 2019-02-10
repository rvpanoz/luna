import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import atoms from 'components/atoms';
import { PaperHeader, PaperBody } from 'components/layout/Paper';
import { flexContainer, flexItem } from 'styles/variables';

const styles = () => ({
  root: {
    padding: '1rem 10px',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  flexContainer: {
    ...flexContainer
  }
});

const { Avatar, IconButton, Icon, Typography } = atoms;

const Package = ({ classes, title }) => (
  <Paper className={classes.root}>
    <PaperHeader>
      <Typography light>React native</Typography>
    </PaperHeader>
    <PaperBody>
      <Grid container justify="flex-end" alignItems="center" spacing={8}>
        <Grid item>
          <Icon light text>
            cached
          </Icon>
        </Grid>
        <Grid item>
          <Typography light>You Retweeted</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={8} wrap="nowrap">
        <Grid item>
          <Avatar
            medium
            src={
              'https://pbs.twimg.com/profile_images/906557353549598720/oapgW_Fp_reasonably_small.jpg'
            }
          />
        </Grid>
        <Grid item>
          <Grid container spacing={16}>
            <Grid item xs={12}>
              <Typography bold inline>
                Dan Abramov
              </Typography>{' '}
              <Typography light inline>
                @dan_abramov
              </Typography>{' '}
              <Typography light inline>
                ·
              </Typography>{' '}
              <Typography light inline>
                Dec 17
              </Typography>
              <Typography>
                In a way CSS is like Redux. You can learn the rules quickly.
                That may mislead you into thinking. Trade same
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <div>
                <IconButton>
                  <Icon light text>
                    mode_comment
                  </Icon>
                </IconButton>
                <Typography light inline>
                  24
                </Typography>
              </div>
              <div>
                <IconButton success>
                  <Icon light text>
                    cached
                  </Icon>
                </IconButton>
                <Typography light inline success>
                  122
                </Typography>
              </div>
              <div>
                <IconButton danger>
                  <Icon light text>
                    favorite_border
                  </Icon>
                </IconButton>
                <Typography light inline danger>
                  661
                </Typography>
              </div>
              <div>
                <IconButton>
                  <Icon light text>
                    email
                  </Icon>
                </IconButton>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </PaperBody>
  </Paper>
);

export default withStyles(styles)(Package);
