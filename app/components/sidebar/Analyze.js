import React from 'react';

class Analyze extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <section className="sidebar__analyze">
        <div className="sidebar__btn">
          <a className="btn btn-block btn-default" href="#">
            Analyze package
          </a>
        </div>
      </section>
    )
  }
}

export default Analyze
