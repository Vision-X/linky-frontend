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
          <header>
            <div className="logo-div">
              <h1>LiNKY!</h1>
              <small>A better way to save links!</small>
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
            </div>
          </header>
          <button className="toggle-btn up" onClick={this._showHide}></button>
          <section className="tag-section show">
            <div className="btn-group btn-group-toggle" data-toggle="buttons">
                {this.state.tags.sort().map(tag => {
                    return (
                          <label htmlFor={tag} className="btn btn-dark" onClick={this._onClick} >
                            <input type="checkbox" />
                            {tag}
                          </label>
                    )}
                  )}
            </div>
          </section>
          <Links className="Links" data={this.state.linkData[0]} filterStuff={this.state.selected} searchText={this.state.search}/>
        </Fragment>
      )
    } else {
      return (
      <Fragment>
        <header>
          <div className="logo-div">
            <h1>LiNKY!</h1>
            <small>A better way to save links!</small>
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
          </div>
        </header>
        <p>"No data Yet!"</p>
      </Fragment>
    )

    }
  }

  _updateSearch = (event) => {
    this.setState({ search: event.target.value.substr(0,20)});
  }

  _showHide = (event) => {
    event.target.classList.contains("up") ? event.target.setAttribute('class', 'toggle-btn down')
                                          : event.target.setAttribute('class', 'toggle-btn up')
    let show = event.target.nextSibling;
    console.log(show.classList);
    show.classList.contains("show") ? show.setAttribute('class', 'tag-section hide')
                                    : show.setAttribute('class', 'tag-section show')
  }

  _onClick = (event) => {
    // console.log("thissss", this);
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

{/*const Header = () =>
  <header>
    <div className="logo-div">
      <h1>LiNKY!</h1>
      <small>A better way to save links!</small>
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
    </div>
  </header>*/}


export default App;
