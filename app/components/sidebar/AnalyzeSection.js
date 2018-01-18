/**
 * Analyze Section
 **/

'use strict'

import React from 'react'

const AnalyzeSection = (props) => {
	const { openPackage, packagesInstalled, packagesOutdated } = props

	let t1 = packagesInstalled,
		t2 = 0

	if (Array.isArray(packagesOutdated)) {
		t2 = packagesOutdated.length
	} else {
		if (packagesOutdated) {
			t2 = Object.keys(packagesOutdated).length
		}
	}
	return (
		<section className="sidebar__analyze">
			<div className="sidebar__btn">
				<a className="btn btn-block btn-default" onClick={openPackage} href="#">
					Analyze package
				</a>
			</div>
			<div className="sidebar__title">Packages</div>
			<ul className="nav nav-menu">
				<li className="active">
					<a href="#">
						<div className="nav-menu__ico">
							<i className="fa fa-fw fa-inbox" />
						</div>
						<div className="nav-menu__text">
							<span>Installed</span>
						</div>
						<div className="nav-menu__right">
							<i className="badge badge-default">
								<b>{t1}</b>
							</i>
						</div>
					</a>
				</li>
				<li>
					<a href="#">
						<div className="nav-menu__ico">
							<i className="fa fa-fw fa-upload" />
						</div>
						<div className="nav-menu__text">
							<span>Outdated</span>
						</div>
						<div className="nav-menu__right">
							<i className="badge badge-default">{t2}</i>
						</div>
					</a>
				</li>
			</ul>
		</section>
	)
}

export default AnalyzeSection
