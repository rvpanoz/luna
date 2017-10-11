import React from 'react';
import {PackageTabsList} from './PackageTabsList';

const PackageTabs = (props) => {
  return (
    <div className="package-tabs">
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
          <a href="#dependencies" aria-controls="dependencies" role="tab" data-toggle="tab" aria-expanded="true">Dependencies</a>
        </li>
        <li role="presentation">
          <a href="#devDependencies" aria-controls="devDependencies" role="tab" data-toggle="tab" aria-expanded="true">DevDependencies</a>
        </li>
        <li role="presentation">
          <a href="#maintainers" aria-controls="maintainers" role="tab" data-toggle="tab" aria-expanded="true">Contributors</a>
        </li>
      </ul>
      <div className="tab-content">
        <div className="tab-pane active" id="details" role="tabpanel">
          <div className="package-details__text">{props.description}</div>
        </div>
        <div className="tab-pane" id="dependencies" role="tabpanel">
          <PackageTabsList data={props.dependencies}/>
        </div>
        <div className="tab-pane" id="devDependencies" role="tabpanel">
          <PackageTabsList data={props.devDependencies}/>
        </div>
        <div className="tab-pane" id="maintainers" role="tabpanel">
          <PackageTabsList data={props.maintainers}/>
        </div>
      </div>
    </div>
  )
}

export default PackageTabs
