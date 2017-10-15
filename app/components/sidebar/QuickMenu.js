import React from 'react';

const QuickMenuListItem = (props) => {
  let idx = props.idx;
  return (
    <div className={`quickmenu__item ${(idx && idx%2!==0) ? 'new' : ''}`}>
      <div className={`fa fa-fw ${props.faClass}`}></div>
    </div>
  )
}

const QuickMenuList = (props) => {
  let items = props.items;
  return (
    <div className="quickmenu__cont">
      {items.map((faClass, idx) => {
        return <QuickMenuListItem faClass={faClass} key={idx} idx={idx}/>
      })}
    </div>
  )
}


class QuickMenu extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    let menuItems = ['fa-home', 'fa-feed', 'fa-cog'];
    return (
      <div className="quickmenu">
        <QuickMenuList items={menuItems} />
      </div>
    )
  }
}

export default QuickMenu;
