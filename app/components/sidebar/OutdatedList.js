import React from 'react'
import OutdatedListItem from './OutdatedListItem'

export default class OutdatedPackages extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
		let { packagesOutdated, mode, toggleMainLoader, setActive } = this.props
		let packages = []
		for (let x in packagesOutdated) {
			let name = x
			let details = packagesOutdated[name]
			packages.push({ name, details })
		}

		return (
			<section className="sidebar__packages">
				<div className="sidebar__title">Outdated</div>
				<div className="lm-widget">
					<div className="lm-widget__list">
						{packages && packages.length ? (
							packages.map((pkg, idx) => {
								return (
									<OutdatedListItem
										key={idx}
										package={pkg}
										setActive={setActive}
										toggleMainLoader={toggleMainLoader}
										mode={mode}
									/>
								)
							})
						) : (
							<small style={{ paddingLeft: '11px' }}>Everything is updated!</small>
						)}
					</div>
				</div>
			</section>
		)
	}
}
