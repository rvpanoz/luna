import React from 'react';

const PackageActions = (props) => {
  const actions = props.packageActions;
  const doAction = props.doAction;
  return (
    <div className="dropdown">
      <i className="fa fa-fw fa-cog dropdown-toggle" data-toggle="dropdown"></i>
      <ul className="dropdown-menu dropdown-menu-right">
        {actions.map((action, idx)=>{
          return (
            <li key={idx}>
              <a href="#" onClick={doAction}>
                <span>{action}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default PackageActions;
