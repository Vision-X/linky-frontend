import React, { Component, Fragment } from 'react';
import './App.css';
import Links from './Links.jsx';

class App extends Component {
  constructor() {
    super();
    this.state = {
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
      console.log("link data!", this.state.linkData);
      this.populateTagArray();
    }
    return fetch(url)
           .then(response => response.json())
           .then(dataGetter)
           .catch(console.log("that sucks!"))
  }

  populateTagArray = () => {
    let finalAry = [];
    this.state.linkData[0].map(link => {
      finalAry.push(...link['stringarray'])
    })
    let filteredTagAry = [...new Set(finalAry)];
    this.setState({ tags: filteredTagAry})
  }

  renderWhen = () => {
    if (this.state.selected.length > 0) {
      <Fragment>
        <Header />
        <Search />
        <section className="tag-section">
          <div className="btn-group btn-group-toggle" data-toggle="buttons">
              {this.state.tags.map(tag => {
                  return (
                        <label htmlFor={tag} className="btn btn-primary" onClick={this._onClick} >
                          <input type="checkbox" />
                          {tag}
                        </label>
                  )}
                )}
          </div>
        </section>
        <Links data={this.state.linkData[0]} filterStuff={this.state.selected}/>
      </Fragment>
    }

    if (this.state.linkData) {
      return (
        <Fragment>
          <Header />
          <Search />
          <section className="tag-section">
            <div className="btn-group btn-group-toggle" data-toggle="buttons">
                {this.state.tags.map(tag => {
                    return (
                          <label htmlFor={tag} className="btn btn-primary" onClick={this._onClick} >
                            <input type="checkbox" />
                            {tag}
                          </label>
                    )}
                  )}
            </div>
          </section>
          <Links data={this.state.linkData[0]} filterStuff={this.state.selected}/>
        </Fragment>
      )
    } else {
      return (
      <Fragment>
        <Header />
        <Search />
        <p>"No data Yet!"</p>
      </Fragment>
    )

    }
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
        {this.renderWhen()}
      </Fragment>
    );
  }
}

const Header = () =>
  <header>
    <h1>Linky!</h1>
    <small>A site for parsing through resources!</small>
  </header>

const Search = () =>
  <section className="search-section">
    <label htmlFor="search-input">Search all links</label>
    <input type="text" name="search-input" placeholder="Enter your search here" />
  </section>


export default App;
