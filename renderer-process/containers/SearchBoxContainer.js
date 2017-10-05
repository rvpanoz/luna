import React from 'react';
import SearchBox from '../components/SearchBox';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions';

const SearchBoxContainer = (props) => {
  return (
    <div>
      <SearchBox setMode={props.actions.setMode} toggleLoader={props.actions.toggleLoader}/>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    mode: state.mode
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBoxContainer);
