import React from 'react';

const PackageActions = (props) => {
  const actions = props.packageActions;
  const doAction = props.doAction;

  let faClass = null;
  return (
    <div className="dropdown">
      <i className="fa fa-fw fa-cog dropdown-toggle" data-toggle="dropdown"></i>
      <ul className="dropdown-menu dropdown-menu-right">
        {actions.map((action, idx)=>{
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
              <a href="#" onClick={doAction}>
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
