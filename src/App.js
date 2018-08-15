import React, { Component, Fragment } from 'react';
import './App.css';
import Links from './Links.jsx';

class App extends Component {
  constructor() {
    super();
    this.state = {
      search: "",
      tags: [],
      selected: []
    }
  }

  getAllLinks = () => {
    let url = 'https://linky-db.herokuapp.com/links';
    let dataGetter = response => {
      let arr = [];
      for (let key in response) {
        arr.push(response[key]);
      }
      this.setState({linkData: arr})
      this.populateTagArray();
    }
    return fetch(url)
           .then(response => response.json())
           .then(dataGetter)
           .catch(console.error)
  }

  populateTagArray = () => {
    let finalAry = [];
    this.state.linkData[0].map(link => {
      finalAry.push(...link['stringarray'])
    })
    let filteredTagAry = [...new Set(finalAry)];
    this.setState({ tags: filteredTagAry})
  }

  renderWhenFetched = () => {
    if (this.state.linkData) {
      return (
        <Fragment>
          <header className="navbar-dark bg-primary">
            <div className="logo-div">
              <div className="logo-and-h1">
                <div className="link-icon"></div>
                <h1>LiNKYe!</h1>
              </div>
            </div>
            <div className="search-div">
              <label htmlFor="search-input"></label>
              <input
                type="text"
                name="search-input"
                placeholder="Search All Links"
                value={this.state.search}
                onChange={this._updateSearch.bind(this)}
              />
              <div className="search-icon"></div>
              <div className="add-icon"></div>
            </div>
          </header>
          <button className="toggle-btn down" onClick={this._showHide}></button>
          <section className="tag-section hide">
            <div className="btn-group btn-group-toggle" data-toggle="buttons">
                {this.state.tags.sort().map(tag => {
                    return (
                      <label htmlFor={tag}
                             className="btn btn-dark"
                             onClick={this._onClick}
                      >
                        <input type="checkbox" />
                            {tag}
                      </label>
                    )}
                )}
            </div>
          </section>
          <Links className="links"
                 data={this.state.linkData[0]}
                 filterStuff={this.state.selected}
                 searchText={this.state.search}
          />
        </Fragment>
      )
    } else {
      return (
        <Fragment>
          <header>
            <div className="logo-div">
              <div className="logo-and-h1">
                <div className="link-icon"></div>
                <h1>LiNKYe!</h1>
              </div>
            </div>
            <div className="search-div">
              <label htmlFor="search-input"></label>
              <input
                type="text"
                name="search-input"
                placeholder="Search All Links"
                value={this.state.search}
                onChange={this._updateSearch.bind(this)}
                onKeyUp={this.renderCounter}
              />
            <div className="search-icon"></div>
            </div>
          </header>
          <p>No data yet!</p>
        </Fragment>
    )}
  }

  _updateSearch = (event) => {
    this.setState({ search: event.target.value.substr(0,20)});
  }

  _showHide = (event) => {
    let targ = event.target;
    targ.classList.contains("up") ? targ.setAttribute('class', 'toggle-btn down')
                                          : targ.setAttribute('class', 'toggle-btn up')
    let show = targ.nextSibling;
    show.classList.contains("show") ? show.setAttribute('class', 'tag-section hide')
                                    : show.setAttribute('class', 'tag-section show')
  }

  _onClick = (event) => {
    let value =  event.target.htmlFor;
    let selected = [...this.state.selected];
    let index = selected.indexOf(value);

    index === -1 ? selected.push(value)
                 : selected.splice(index, 1)

    this.setState({ selected: [...selected]});
  }

  componentDidMount = () => {
    this.getAllLinks();
  }

  render() {
    return (
      <Fragment>
        {this.renderWhenFetched()}
      </Fragment>
    );
  }
}

export default App;
