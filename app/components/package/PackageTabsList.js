import React from 'react';

const PackageTabsListItem = (props) => {
  return (
    <div className="list-widget__item">
      <div className="list-widget__info">
        <div className="list-widget__text">
          <b>
            {props.name}
          </b>
        </div>
      </div>
    </div>
  )
}

exports.PackageTabsList = (props) => {
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
    <div className="list-widget">
      <div className="list-widget__cont">
        <div className="list-widget__list">
          {(data.length) ? data.map((name, idx) => {
            return <PackageTabsListItem key={idx} name={name} />
          }): 'No data'}
        </div>
      </div>
    </div>
  )
}
