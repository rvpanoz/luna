import {remote, ipcRenderer} from 'electron';
import React from 'react';

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this._onIconClick = this._onIconClick.bind(this);
    this._onKeyUp = this._onKeyUp.bind(this);
    this._doSearch = this._doSearch.bind(this);
    this._clearSearch = this._clearSearch.bind(this);
  }
  _doSearch(e) {
    if (e) {
      e.preventDefault();
    }
    let searchInput = this.refs.searchInput;
    if (searchInput) {
      let pkgName = searchInput.value;
      if (pkgName.length) {
        this.props.doSearch(pkgName);
      }
    }
    return false;
  }
  _clearSearch() {
    let searchInput = this.refs.searchInput;
    if(searchInput) {
      searchInput.value='';
    }
    this.props.clearSearch();
  }
  _onKeyUp(e) {
    let key = e.which || e.keyCode || 0;
    let searchInput = this.refs.searchInput;
    let iconEl = this.refs.icon;
    let value = searchInput.value.replace(/\s/g, '');

    if(!value.length) {
      iconEl.classList.add('fa-search');
      iconEl.classList.remove('fa-arrow-left');
      return false;
    }

    iconEl.classList.remove('fa-search');
    iconEl.classList.add('fa-arrow-left');

    if (key === 13) {
      this._doSearch();
    }
    return;
  }
  _onIconClick(e) {
    e.preventDefault();
    e.stopPropagation();
    let target = e.target;
    if(target.classList.contains('fa-arrow-left')) {
      this._clearSearch();
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
            <input type="text" placeholder="search registry.." ref="searchInput"/>
            <a onClick={this._doSearch} style={{
              cursor: 'pointer'
            }}>
              <i aria-hidden="true" onClick={this._onIconClick} className="fa fa-search search icon" ref="icon"></i>
            </a>
          </div>
        </div>
      </div>
    )
  }
}
