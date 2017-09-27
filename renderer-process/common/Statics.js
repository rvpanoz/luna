import React from 'react';

const StaticListItem = (props) => {
  return (
    <p>
      {props.name}
    </p>
  )
}

exports.OptionItems = (props) => {
  return (
    <option id={props.idx}>{props.name}</option>
  )
}

exports.StaticList = (props) => {
  let items = props.data,
    data;
  if (Object.prototype.toString.call(items) !== '[object Array]') {
    data = [];
    for (let z in items) {
      data.push(`${z} - ${items[z]}`);
    }
  } else {
    data = items;
  }
  return (
    <div className="static-list">
      {data.map((name, idx) => {
        return <StaticListItem key={idx} name={name}/>
      })}
    </div>
  )
}
