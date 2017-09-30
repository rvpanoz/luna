import React from 'react';

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this._onKeyPress = this._onKeyPress.bind(this);
    this._doSearch = this._doSearch.bind(this);
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
  _onKeyPress(e) {
    let key = e.which || e.keyCode || 0;
    if (key === 13) {
      this._doSearch();
    }
  }
  componentDidMount() {
    let root = this.refs.root;
    if (root) {
      root.addEventListener("keypress", this._onKeyPress);
    }
  }
  render() {
    return (
      <div className="item search" ref="root">
        <div className="ui icon input transparent inverted icon">
          <div className="inner">
            <input type="text" placeholder="search" ref="searchInput"/>
            <a onClick={this._doSearch} style={{
              cursor: 'pointer'
            }}>
              <i aria-hidden="true" className="fa fa-search search icon"></i>
            </a>
          </div>
        </div>
      </div>
    )
  }
}
