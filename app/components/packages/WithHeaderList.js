import React from 'react'
import PropTypes from 'prop-types'
import Header from './Header';

const WithHeaderList = (List) => {
  render() {
    return (
      <div>
        <Header/>
        <List/>
      </div>
    )
  }
}

export default WithHeaderList
