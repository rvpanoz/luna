import React from 'react';

const Header = (props) => {
  let pkg = props.pkg;
  let mode = props.mode;
  let className = '';

  // ipcRenderer.send('list-by-version');
  // ipcRenderer.on('list-by-version-reply', (event, data) => {
  //   console.log(data);
  // });

  switch (mode) {
    case 'search':
      className = 'install'
      break;
    default:
      className = 'uninstall';
  }
  return (
    <div className="flex-row">
      <h1 className="ui header" style={{
        marginBottom: '0.25em'
      }}>
        {pkg.name}&nbsp;{pkg.version}
        <div className="sub header">
          Latest:&nbsp;{pkg['dist-tags'].latest}&nbsp; {(props.needsUpdate())
            ? <a href="#" onClick={props.update}>Update</a>
            : ''}
        </div>
      </h1>
      <div className="ui action">
        <button onClick={props.doAction} className={`button ${className}`} href="#">{className}</button>
      </div>
    </div>
  )
}

export default Header;
