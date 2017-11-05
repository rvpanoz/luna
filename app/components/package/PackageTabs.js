/**
* PackageTabs
**/

'use strict';

import React from 'react';
import {PackageTabsList} from './PackageTabsList';
import styles from './PackageTabs.css';

const PackageTabs = (props) => {
  let pkg = props.pkg;

  return (
    <div className={styles.package__tabs}>
      <ul className="nav nav-tabs" role="tablist">
        <li className="dropdown pull-right tabdrop hide">
          <a className="dropdown-toggle" data-toggle="dropdown" href="#">
            <i className="icon-align-justify"></i>
            <b className="caret"></b>
          </a>
          <ul className="dropdown-menu"></ul>
        </li>
        <li className="active" role="presentation">
          <a href="#details" aria-controls="details" role="tab" data-toggle="tab" aria-expanded="true">Details</a>
        </li>
        <li role="presentation">
          <a href="#dependencies" aria-controls="dependencies" role="tab" data-toggle="tab" aria-expanded="true">
            Dependencies
            <span className="label">{(pkg.dependencies) ? Object.keys(pkg.dependencies).length : "0"}</span>
          </a>
        </li>
        <li role="presentation">
          <a href="#devDependencies" aria-controls="devDependencies" role="tab" data-toggle="tab" aria-expanded="false">
            DevDependencies
            <span className="label">{(pkg.devDependencies) ? Object.keys(pkg.devDependencies).length : "0"}</span>
          </a>
        </li>
        <li role="presentation">
          <a href="#maintainers" aria-controls="maintainers" role="tab" data-toggle="tab" aria-expanded="false">
            Contributors
            <span className="label">{(pkg.maintainers) ? pkg.maintainers.length : "0"}</span>
          </a>
        </li>
      </ul>
      <div className="tab-content">
        <div className="tab-pane active" id="details" role="tabpanel">
          <div className="row">
            <div className="col-md-12">
              <div className={styles.package__preview__props}>
                <div className={styles.package__preview__prop} title="homepage">
                  <span className={styles.package__preview__homepage} title="Homepage">
                    <i className="fa fa-home"></i>&nbsp;
                    <a onClick={props.navigate} data-url={pkg.homepage} href="#">Homepage</a>
                  </span>
                </div>
                <div className={styles.package__preview__prop} title="issues">
                  <span className={styles.package__preview__issues} title="Issues">
                    <i className="fa fa-bug"></i>&nbsp;
                    <a onClick={props.navigate} data-url={(pkg.bugs && pkg.bugs.url) ? pkg.bugs.url : null} href="#">Issues</a>
                  </span>
                </div>
                <div className={styles.package__preview__prop} title="author">
                  <span className={styles.package__preview__author} title="Author">
                    <i className="fa fa-tags"></i>&nbsp;{pkg.author}
                  </span>
                </div>
                <div className={styles.package__preview__prop} title="license">
                  <span className={styles.package__preview__license} title="License">
                    <i className="fa fa-balance-scale"></i>&nbsp;{pkg.license}
                  </span>
                </div>
                <div className={styles.package__preview__prop} title="latest">
                  <span className={styles.package__preview__latest} title="Latest version">
                    <i className="fa fa-flag"></i>&nbsp;v{pkg['dist-tags'].latest}
                  </span>
                </div>
              </div>
              <div className={styles.package__preview__note}>
                {pkg.description}
              </div>
            </div>
          </div>
        </div>
        <div className="tab-pane" id="dependencies" role="tabpanel">
          <PackageTabsList data={pkg.dependencies}/>
        </div>
        <div className="tab-pane" id="devDependencies" role="tabpanel">
          <PackageTabsList data={pkg.devDependencies}/>
        </div>
        <div className="tab-pane" id="maintainers" role="tabpanel">
          <PackageTabsList data={pkg.maintainers}/>
        </div>
      </div>
    </div>
  )
}

export default PackageTabs
