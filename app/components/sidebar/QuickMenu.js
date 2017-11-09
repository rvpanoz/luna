/**
* Quickmenu components
**/

'use strict';

import React from 'react';

const QuickMenuListItem = (props) => {
  let idx = props.idx, faClass = props.faClass;
  let packages = props.packagesOutdated;
  let isOutdatedArray = Array.isArray(packages), indi = null;

  if(isOutdatedArray) {
    indi = (isOutdatedArray.length) ? 'new' : null;
  } else if (typeof packages === 'object') {
    indi = 'new';
  }


  return (
    <div onClick={props.onClick} className={`quickmenu__item ${(faClass === 'fa-feed') ? indi : null} ${(idx===0)?'active':null}`}>
      <div className={`fa fa-fw ${faClass}`}></div>
    </div>
  )
}

class QuickMenuList extends React.Component {
  constructor(props) {
    super(props);
    this.onItemClick = this.onItemClick.bind(this);
  }
  onItemClick(e) {
    e.preventDefault();
    let menuList = this.refs.menuList;
    let el = e.currentTarget,j=0;
    let menuItems = menuList.querySelectorAll('.quickmenu__item');
    for (let i = 0; i < menuItems.length; i++) {
      menuItems[i].classList.remove('active');
      if(menuItems[i] === el) {
        j = i;
      }
    }
    el.classList.add('active');
    this.props.handleSidebarContent(j);
    return false;
  }
  render() {
    let props = this.props;
    let items = props.items;
    return (
      <div className="quickmenu__list" ref="menuList">
        {items.map((faClass, idx) => {
          return (
            <QuickMenuListItem
              packagesOutdated = {props.packagesOutdated}
              onClick={this.onItemClick}
              faClass={faClass}
              key={idx}
              idx={idx}
            />
          )
        })}
      </div>
    )
  }
}

class QuickMenu extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    let menuItems = this.props.items;
    return (
      <div className="quickmenu">
        <div className="quickmenu__cont">
          <QuickMenuList
            packagesOutdated={this.props.packagesOutdated}
            items={menuItems}
            handleSidebarContent={this.props.handleSidebarContent}
          />
        </div>
      </div>
    )
  }
}

export default QuickMenu;
