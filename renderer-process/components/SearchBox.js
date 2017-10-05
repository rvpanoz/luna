import { remote, ipcRenderer } from 'electron';
import React from 'react';
import PropTypes from 'prop-types';

export default class SearchBox extends React.Component {
  constructor(props) {
    super(props);
    this._search = this._search.bind(this);
    this._onKeyUp = this._onKeyUp.bind(this);
    this._clearSearch = this._clearSearch.bind(this);
  }
  _onKeyUp(e) {
    let key = e.which || e.keyCode || 0;
    let searchInput = this.refs.searchInput;
    let value = searchInput.value.replace(/\s/g, '');

    if(value.length && key === 13) {
      this._search();
    }
    return false;
  }
  _clearSearch(e) {
    let searchInput = this.refs.searchInput;
    if(!searchInput.value.length) {
      return;
    }
    searchInput.value = '';
    this.props.toggleLoader(true);
    this.props.setMode('global');
    ipcRenderer.send('get-packages', {
      scope: 'g'
    });
    return false;
  }
  _search(e) {
    if(e) {
      e.preventDefault();
    }
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
  componentDidMount() {
    let root = this.refs.root;
    let searchInput = this.refs.searchInput;
    if (root) {
      root.addEventListener("keypress", this._onKeyUp);
      if(searchInput) {
        searchInput.focus();
      }
    }
  }
  render() {
    return (
      <div className="item search" ref="root">
        <div className="ui icon input transparent inverted icon">
          <div className="inner">
            <input style={{width: '80%'}} type="text" placeholder="search registry.." ref="searchInput"/>
            <a style={{marginRight: '8.5px', cursor: 'pointer'}} onClick={this._search}>
              <i aria-hidden="true" className="fa fa-search search icon" ref="iconSearch"></i>
            </a>
            <a style={{cursor: 'pointer'}} onClick={this._clearSearch}>
              <i aria-hidden="true" className="fa fa-remove remove icon" ref="iconClear"></i>
            </a>
          </div>
        </div>
      </div>
    )
  }
}
