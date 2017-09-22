/**
 * About
 */

import React from 'react';
import {Route} from 'react-router-dom';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <nav className='sidebar sidebar-menu-collapsed'>
      <a href='#' id='justify-icon'>
        <span className='glyphicon glyphicon-align-justify'></span>
      </a>
      <ul>
        <li className='active'>
          <a className='expandable' href='#' title='Global modules'>
            <span className='glyphicon glyphicon-list collapsed-element'></span>
            <span className='expanded-element'>Global modules</span>
          </a>
        </li>
        <li>
          <a className='expandable' href='#' title='Analyze'>
            <span className='glyphicon glyphicon-wrench collapsed-element'></span>
            <span className='expanded-element'>Open package.json and analyzes it</span>
          </a>
        </li>
        <li>
          <a className='expandable' href='#' title='Create'>
            <span className='glyphicon glyphicon-pencil collapsed-element'></span>
            <span className='expanded-element'>Create package.json file</span>
          </a>
        </li>
      </ul>
      <a href='#' id='logout-icon' title='Exit'>
        <span className='glyphicon glyphicon-off'></span>
      </a>
    </nav>
    )
  }
}
