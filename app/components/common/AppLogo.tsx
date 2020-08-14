import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import anime from 'animejs';
import cn from 'classnames';
import styles from './styles/appLogo';

const AppLogo = ({ classes, className }) => {
  useEffect(() => {
    const logoAnimationTL = anime
      .timeline({
        autoplay: false,
        easing: 'easeOutSine'
      })
      .add(
        {
          targets: 'path',
          strokeDashoffset: [anime.setDashoffset, 0],
          duration: 500,
          direction: 'alternate',
          delay: anime.stagger(60, { from: 'center' })
        },
        0
      );

    logoAnimationTL.play();
  }, []);

  return (
    <div className={cn(classes.main_logo, {
      [className]: className
    })}>
      <div className={classes.logo_animation_wrapper}>
        <div className={classes.logo_animation}>
          <div className={classes.anime_logo}>
            <div className={classes.anime_logo_signs}>
              <div className={classes.logo_letter}>
                <svg
                  className={cn(
                    classes.logo_animation__logo_letter_svg,
                    classes.logo_animation__bounce,
                    classes.rot,
                    classes.errorColor
                  )}
                  viewBox="0 0 150 250"
                  width="20"
                  height="20"
                  strokeLinecap="round"
                >
                  <path
                    className={cn(classes.logo_animation__line)}
                    d="M170 220V60c0-31.046-8.656-40-19.333-40H49.333C38.656 20 30 28.954 30 10v10"
                  />
                </svg>
              </div>
              <div className={classes.logo_letter}>
                <svg
                  className={cn(
                    classes.logo_animation__bounce,
                    classes.flip,
                    classes.primaryColor
                  )}
                  viewBox="0 0 150 250"
                  width="20"
                  height="20"
                  strokeLinecap="round"
                >
                  <path
                    className={classes.logo_animation__line}
                    d="M170 220V60c0-31.046-8.656-40-19.333-40H49.333C38.656 20 30 28.954 30 60v160"
                  />
                </svg>
              </div>
              <div className={classes.logo_letter}>
                <svg
                  className={cn(
                    classes.logo_animation__bounce,
                    classes.warningColor
                  )}
                  viewBox="0 0 150 250"
                  width="30"
                  height="20"
                  strokeLinecap="round"
                >
                  <path
                    className={classes.logo_animation__line}
                    d="M170 220V60c0-31.046-8.656-40-19.333-40H49.333C38.656 20 30 28.954 30 60v160"
                  />
                </svg>
              </div>
              <div className={classes.logo_letter}>
                <svg
                  className={cn(
                    classes.logo_animation__bounce,
                    classes.secondaryColor
                  )}
                  viewBox="0 0 150 250"
                  width="20"
                  height="20"
                  strokeLinecap="round"
                >
                  <path
                    className={classes.logo_animation__line}
                    d="M30 20h130c9.996 0 10 40 10 60v140H41c-11.004 0-11-40-11-60s-.004-60 10-60h110"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

AppLogo.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  className: PropTypes.string
};

export default withStyles(styles)(AppLogo);
