import React from 'react';

const PackageActions = (props) => {
  let faClass = null;

  return (
    <div className="dropdown">
      <i className="fa fa-fw fa-cog dropdown-toggle" data-toggle="dropdown"></i>
      <ul className="dropdown-menu dropdown-menu-right">
        <li className="dropdown-header">Do action</li>
        {
          props.packageActions.map((action, idx)=>{
          switch (action) {
            case 'Install':
              faClass = 'fa-download';
              break;
            case 'Update':
              faClass = 'fa-refresh';
              break;
            case 'Uninstall':
              faClass = 'fa-trash';
              break;
            default:
              faClass = null;
          }

          return (
            <li key={idx}>
              <a href="#" data-action={action} onClick={props.doAction}>
                <span className={`fa fa-fw ${faClass}`}></span>&nbsp;
                <b>{action}</b>
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default PackageActions;
