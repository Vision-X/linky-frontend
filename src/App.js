import React, { Component, Fragment } from 'react';
import './App.css';
import Links from './Links.jsx';

class App extends Component {
  constructor() {
    super();
    this.state = {
      search: "",
      tags: [],
      selected: [],
      arrLength : 0,
      filteredArr: []
    }
  }
  //
  // setArrLength = (param) => {
  //   this.setState({ arrLength: param.length})
  // }

  getAllLinks = () => {
    let url = 'https://linky-db.herokuapp.com/links';
    let dataGetter = response => {
      let arr = [];
      for (let key in response) {
        arr.push(response[key]);
      }
      this.setState({ linkData: arr })
      this.setState({ arrLength: this.state.linkData[0].length })
      // console.log("array length after fetch: ", this.state.linkData[0].length);
      this.populateTagArray();
    }
    return fetch(url)
           .then(response => response.json())
           .then(dataGetter)
           .then(console.log(this.state.arrLength, "state arrLength"))
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

  filterByTags = () => {
    let arrToCompare = this.state.selected;
    this.state.linkData[0].reduce((acc, currVal) => {
      let count = 0;
      if (arrToCompare.length > 0) {
        for (let i = 0; i < currVal.stringarray.length; i++) {
          for (let j = 0; j < arrToCompare.length; j++) {
            if (currVal.stringarray[i] === arrToCompare[j]) {
              count++;
                if (count === arrToCompare.length) {
                  acc.push(currVal);
                }
              }
            }
          } this.setState({ filteredArr: acc}, this.setState({ arrLength: acc.length}))
            console.log("line 62", acc.length);
            console.log("line 63", this.state.arrLength);
            return acc.sort((a,b) => b.title < a.title);
        } else {
          return this.state.linkData[0];
        }
    },[])
  }

  filterBySearchText = () => {
    let seek = this.state.search;
    if (seek.length) {
        let searchFilter = this.state.linkData[0].filter(link => {
          return link.title.toLowerCase().includes(seek.toLowerCase()) ||
                 link.description.toLowerCase().includes(seek.toLowerCase())
        })
        this.setState({ filteredArr: searchFilter }, () => this.setState({ arrLength: searchFilter.length }));
        console.log("line 78", searchFilter.length);
        return searchFilter;
      } else {
        // this.setState({ arrLength: this.state.linkData[0].length});
        this.setState({ search: ''}, this.setState({ arrLength: this.state.linkData[0].length }))
        return this.state.linkData[0];
      }
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
            {/*onKeyUp={(event) => console.log(this.state.filteredArr)}*/}
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
                 filtered={this.state.filteredArr}
                 arrLength={this.state.arrLength}
                 search={this.state.search}

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
                onKeyPress={this._updateSearch.bind(this)}
              />
            <div className="search-icon"></div>
            </div>
          </header>
          <p>No data yet!</p>
        </Fragment>
    )}
  }

  _updateSearch = (event) => {
    this.setState({ search: event.target.value.substr(0,20) }, this._updateFilteredArr);
  }

  _updateFilteredArr = () => {
    this.setState({ filteredArr: this.filterBySearchText() });
    // console.log("filteredArr on updateSeach", this.filterBySearchText())
  }

  _showHide = (event) => {
    let targ = event.target;
    targ.classList.contains("up") ? targ.setAttribute('class', 'toggle-btn down')
                                          : targ.setAttribute('class', 'toggle-btn up')
    let show = targ.nextSibling;
    show.classList.contains("show") ? show.setAttribute('class', 'tag-section hide')
                                    : show.setAttribute('class', 'tag-section show')
  }

  checkIt = () => {
    console.log("check it happened");
    if (this.state.selected) {
      console.log("selected has a length");
      let muhStuff = this.filterByTags();
      this.setState({ filteredArr: muhStuff })
    } else if (this.state.selected.length === 0) {
      this.setState({ filteredArr: this.state.linkData[0] })
    } else {
      console.log("selected is fucked, brew!");
    }
  }

  _onClick = (event) => {
    console.log("click happened");
    let value =  event.target.htmlFor;
    let selected = [...this.state.selected];
    let index = selected.indexOf(value);

    index === -1 ? selected.push(value)
                 : selected.splice(index, 1)

    this.setState({ selected: [...selected]}, this.checkIt());
    // console.log("filterByTags?", this.filterByTags());
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
