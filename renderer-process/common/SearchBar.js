import React from 'react';

export default class SearchBar extends React.Component {
  render() {
    return (
      <div className="item">
        <div className="ui icon input transparent inverted icon">
          <input type="text" placeholder="search" />
          <i aria-hidden="true" className="search icon"></i>
        </div>
      </div>
    )
  }
}
