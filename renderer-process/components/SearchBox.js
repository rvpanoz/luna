import { remote, ipcRenderer } from 'electron';
import React from 'react';
import PropTypes from 'prop-types';

export default class SearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.search = this.search.bind(this);
  }
  search(e) {
    e.preventDefault();
    let searchInput = this.refs.searchInput;
    if(searchInput.value.length) {
      this.props.toggleLoader(true);
      this.props.setMode('search');
      ipcRenderer.send('search-packages', {
        pkgName: searchInput.value
      });
    }
    return false;
  }
  render() {
    return (
      <div className="item search">
        <div className="ui icon input transparent inverted icon">
          <div className="inner">
            <input type="text" placeholder="search registry.." ref="searchInput"/>
            <a style={{cursor: 'pointer'}} onClick={this.search}>
              <i aria-hidden="true" className="fa fa-search search icon"></i>
            </a>
          </div>
        </div>
      </div>
    )
  }
}
