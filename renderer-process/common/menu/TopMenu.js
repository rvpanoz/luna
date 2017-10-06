import React from 'react';
import {menuItems} from '../../constants/MenuItems';
import TopMenuItem from './TopMenuItem';
console.log(menuItems);

export default class TopMenu extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let items = menuItems.items;
    return (
      <ul className="nav navbar-nav navbar-left">
        {items.map((item, idx) => {
          return <TopMenuItem key={idx} {...item}/>
        })}
      </ul>
    )
  }
}
