import React from 'react'
import PropTypes from 'prop-types'
import ListView from './ListView'

const WithHeaderList = (props) => {
	return class extends React.Component {
		constructor(props) {
			super(props)
		}
		render() {
			return <ListView />
		}
	}
}

WithHeaderList.propTypes = {
	list: PropTypes.string.isRequired
}

export default WithHeaderList
