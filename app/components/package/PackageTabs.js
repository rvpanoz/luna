import React from 'react';
import {PackageTabsList} from './PackageTabsList';
import styles from './PackageTabs.css';

const PackageTabs = (props) => {
  let pkg = props.pkg;

  return (
    <div className={styles.package__tabs}>
      <ul className="nav nav-tabs" role="tablist">
        <li className="dropdown pull-right tab__drop hide">
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
          <a href="#devDependencies" aria-controls="devDependencies" role="tab" data-toggle="tab" aria-expanded="true">
            DevDependencies
            <span className="label">{(pkg.devDependencies) ? Object.keys(pkg.devDependencies).length : "0"}</span>
          </a>
        </li>
        <li role="presentation">
          <a href="#maintainers" aria-controls="maintainers" role="tab" data-toggle="tab" aria-expanded="true">
            Contributors
            <span className="label">{(pkg.maintainers) ? pkg.maintainers.length : "0"}</span>
          </a>
        </li>
      </ul>
      <div className={styles.tab__content}>
        <div className="tab-pane active" id="details" role="tabpanel">
          <div className="row">
            <div className="col-md-6">
              <div className="package-preview__props">
                <div className="package-preview__prop" title="author">
                  <i className="fa fa-tags"></i>
                  <span className="package-preview__author" title={pkg.author}>
                    Author:&nbsp;{pkg.author}
                  </span>
                </div>
                <div className="package-preview__prop" title="license">
                  <i className="fa fa-balance-scale"></i>
                  <span className="package-preview__license" title={`v${pkg['dist-tags'].latest}`}>
                    License:&nbsp;{pkg.license}
                  </span>
                </div>
                <div className="package-preview__prop" title="latest">
                  <i className="fa fa-flag"></i>
                  <span className="package-preview__latest" title={`v${pkg['dist-tags'].latest}`}>
                    Latest:&nbsp;v{pkg['dist-tags'].latest}
                  </span>
                </div>
              </div>
              <div className="package-preview__note">
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
