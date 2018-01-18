/**
 * Quickmenu components
 **/

'use strict'

import React from 'react'

const QuickMenuListItem = (props) => {
	const { onMenuItemClick } = props
	let idx = props.idx,
		faClass = props.faClass
	let packages = props.packagesOutdated
	let isOutdatedArray = Array.isArray(packages),
		indi = null

	if (isOutdatedArray) {
		indi = isOutdatedArray.length ? 'new' : null
	} else if (typeof packages === 'object') {
		indi = 'new'
	}

	return (
		<div
			onClick={onMenuItemClick}
			className={`quickmenu__item ${faClass === 'fa-feed' ? indi : null} ${idx === 0 ? 'active' : null}`}
		>
			<div className={`fa fa-fw ${faClass}`} />
		</div>
	)
}

class QuickMenuList extends React.Component {
	constructor(props) {
		super(props)
		this.onMenuItemClick = this.onMenuItemClick.bind(this)
	}
	onMenuItemClick(e) {
		e.preventDefault()
		const { handleSidebarContent } = this.props
		const menuList = this.refs.menuList

		let el = e.currentTarget,
			j = 0
		let menuItems = menuList.querySelectorAll('.quickmenu__item')

		for (let i = 0; i < menuItems.length; i++) {
			menuItems[i].classList.remove('active')
			if (menuItems[i] === el) {
				j = i
			}
		}
		el.classList.add('active')
		handleSidebarContent(j)
		return false
	}
	render() {
		const onMenuItemClick = this.onMenuItemClick
		const { items, packagesOutdated } = this.props
		return (
			<div className="quickmenu__list" ref="menuList">
				{items.map((faClass, idx) => {
					return (
						<QuickMenuListItem
							packagesOutdated={packagesOutdated}
							onMenuItemClick={onMenuItemClick}
							faClass={faClass}
							key={idx}
							idx={idx}
						/>
					)
				})}
			</div>
		)
	}
}

class QuickMenu extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
		const { items, packagesOutdated, handleSidebarContent } = this.props
		return (
			<div className="quickmenu">
				<div className="quickmenu__cont">
					<QuickMenuList
						packagesOutdated={packagesOutdated}
						items={items}
						handleSidebarContent={handleSidebarContent}
					/>
				</div>
			</div>
		)
	}
}

export default QuickMenu
