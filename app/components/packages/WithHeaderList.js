import React from 'react'
import PropTypes from 'prop-types'

const WithHeaderList = (props) => {
	debugger
	const _wrapped = props.list || null
	const Component = _wrapped ? require(`./${_wrapped}`) : null

	return class extends React.Component {
		constructor(props) {
			super(props)
		}
		render() {
			return <Component />
		}
	}
}

WithHeaderList.PropTypes = {
	list: PropTypes.string.isRequired
}

export default WithHeaderList
