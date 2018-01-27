/**
 * Package actions inner component
 **/

"use strict";

import React from "react";
import { remote, ipcRenderer } from "electron";
import { switchcase, showMessageBox } from "../../utils";
import { APP_MODES, PACKAGE_GROUPS, COMMAND_OPTIONS } from "../../constants/AppConstants";

class PackageActions extends React.Component {
  constructor(props) {
    super(props);
    this._addCommandOption = this._addCommandOption.bind(this);
    this._setupUI = this._setupUI.bind(this);
  }
  _addCommandOption(opt) {
    const { addCommandOption } = this.props;
    const options = {
      dependencies: "save",
      devDependencies: "save-dev",
      optionalDependencies: "save-optional"
    };
    console.log(options[opt]);
    addCommandOption(options[opt]);
    this.refs[`opt-${options[opt]}`].checked = true;
  }
  _setupUI() {
    const { packageJSON, mode, active, addCommandOption, clearCommandOptions } = this.props;
    let packageGroup = null;

    if (active && mode === APP_MODES.LOCAL) {
      /**
        Check to see if package is in a group
        e.g dependencies, devDependencies, optionalDependencies
      **/
      PACKAGE_GROUPS.some((groupName, idx) => {
        if (packageJSON[groupName] && packageJSON[groupName][active.name]) {
          packageGroup = groupName;
          return true;
        }
      });

      if (!packageGroup) {
        return;
      }

      // clear options
      clearCommandOptions();

      switchcase({
        dependencies: () => this._addCommandOption("dependencies"),
        devDependencies: () => this._addCommandOption("devDependencies"),
        optionalDependencies: this._addCommandOption("optionalDependencies")
      })(() => this._addCommandOption("dependencies"))(packageGroup);

      // save-exact fix
      const groupDependencies = packageJSON[packageGroup];
      const version = groupDependencies[active.name];

      if (!isNaN(version.charAt(0))) {
        addCommandOption("save-exact");
        this.refs["opt-save-exact"].checked = true;
      } else {
        this.refs["opt-save-exact"].checked = false;
      }
    }
  }
  componentDidMount() {
    let dp = this.refs.dropdownMenu;
    if (dp) {
      dp.addEventListener("click", (e) => {
        let target = e.target;
        if (target.tagName === "LABEL" || target.tagName === "INPUT") {
          e.stopPropagation();
        }
      });

      dp.addEventListener("change", (e) => {
        let target = e.target;
        if (target.dataset.option) {
          let option = target.dataset.option;
          this.props.addCommandOption(option);
        }
      });
    }

    this._setupUI();
  }
  componentWillUnMount() {
    let dp = this.refs.dropdownMenu;
    if (dp) {
      dp.removeEventListener("click");
      dp.removeEventListener("change");
    }
  }
  render() {
    let { actions, mode, doAction } = this.props;

    return (
      <div className="dropdown">
        <i className="fa fa-fw fa-cog dropdown-toggle" data-toggle="dropdown" />
        <ul className="dropdown-menu dropdown-menu-right" ref="dropdownMenu">
          <li className="dropdown-header">Actions</li>
          {actions.map((action, idx) => {
            return (
              <li key={idx}>
                <a href="#" data-action={action.text} onClick={doAction}>
                  <i className={`fa fa-${action.iconCls}`} />&nbsp;
                  <b>{action.text}</b>
                </a>
              </li>
            );
          })}
          <li
            className="dropdown-header"
            style={{
              display: mode === "GLOBAL" ? "none" : "inherit"
            }}
          >
            Options
          </li>
          {!(mode === APP_MODES.GLOBAL)
            ? COMMAND_OPTIONS.map((option, idx) => {
                let opt = option.split("*");
                return (
                  <li key={idx} title={opt[1]}>
                    <div className="form-check abc-checkbox">
                      <input
                        className="form-check-input"
                        id={`m${idx}`}
                        type="checkbox"
                        ref={`opt-${opt[0]}`}
                        data-option={opt[0]}
                      />
                      <label className="form-check-label" htmlFor={`m${idx}`}>
                        {opt[0]}
                      </label>
                    </div>
                  </li>
                );
              })
            : null}
        </ul>
      </div>
    );
  }
}

export default PackageActions;
