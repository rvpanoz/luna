import React from 'react';
import {menuItems} from '../../constants/MenuItems';
import TopMenuItem from './TopMenuItem';

export default class TopMenu extends React.Component {
  constructor(props) {
    super(props);
    this._onClick = this._onClick.bind(this);
  }
  _onClick(e) {
    e.preventDefault();
    let page = e.currentTarget.querySelector('span');
    if(page) {
      this.props.setActivePage(page.innerHTML, page.innerHTML);
    }
    return false;
  }
  render() {
    let items = menuItems.items;
    return (
      <ul className="nav navbar-nav navbar-left">
        {items.map((item, idx) => {
          return <TopMenuItem onClick={this._onClick} key={idx} {...item}/>
        })}
      </ul>
    )
  }
}
