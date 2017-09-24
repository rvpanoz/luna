import React from 'react';

export default class ListItemDetails extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let module = this.props.module;
    console.log(module);
    if(!module) {
      return null;
    }
    return (
      <div className="module-details">
        <div className="detail tile">
          <section className="detail-body">
            <p className="detail-tags">{module.author}</p>
            <h2 className="detail-heading">{module.name}</h2>
            <p>
              {module.description}
            </p>
          </section>
          <footer className="detail-footer">
            <ul className="detail-links">
              <li>

              </li>
              <li>

              </li>
            </ul>
          </footer>
        </div>
      </div>
    )
  }
}
