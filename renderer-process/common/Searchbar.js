class SearchBar extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="input-group">
          <span className="input-group-addon">
            <i className=" fa fa-search"></i>
          </span>
          <input className="form-control" name="search" placeholder="search" autoFocus="autofocus" type="search" id="search-user"></input>
        </div>
      </div>
    )
  }
}
