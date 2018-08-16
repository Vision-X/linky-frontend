import React, { Component, Fragment } from 'react';

export default class Links extends Component {



  renderWhen = () => {

    if ((this.props.filtered && this.props.filtered.length > 0) ||
         (this.props.selected && this.props.selected.length > 0)) {
        let filtArr = this.props.filtered || this.props.selected;
        return (
            <section className="links">
              <p>1 - {this.props.arrLength}</p>
              <ul>
                {filtArr.sort().map(item => {
                  return (
                    <li className="card" key={new Date().toString()}>
                      <div className="card-body">
                        <div className="card-title col-4">
                          <img src={"https://www.google.com/s2/favicons?domain=" + item.url} alt="" />
                          <h2 className="card-title">{item.title}</h2>
                        </div>
                        <h4 className="card-text col-5">{item.description}</h4>
                        <a className="card-link col-3" href={item.url} target="_blank">{item.url}</a>
                      </div>
                    </li>
                )}
              )}
              </ul>
            </section>
        )
    } else if ((this.props.filtered.length === 0 && this.props.search.length > 0) ||
               (!this.props.selected)) {
      return (
        <section className="links">
          <p>0 - {this.props.arrLength}</p>
          <ul>
                <li className="card" key={Math.random(new Date())}>
                  <div className="card-body">
                    <div className="card-title col-5">
                      <h2 className="card-title">0 matches found</h2>
                    </div>
                    <h4 className="card-text col-5">0 matches found</h4>
                  </div>
                </li>
          </ul>
        </section>

      )
    } else if (this.props.data) {
      let sorted = this.props.data.sort((a,b) => b.title < a.title);
      return (
          <section className="links">
            <p>1 - {this.props.arrLength}</p>
            <ul>
              {sorted.map(item => {
                return (
                  <li className="card" key={Math.random(new Date())}>
                    <div className="card-body">
                      <div className="card-title col-4">
                        <img src={"https://www.google.com/s2/favicons?domain=" + item.url} alt="" />
                        <h2 className="card-title">{item.title}</h2>
                      </div>
                      <h4 className="card-text col-5">{item.description}</h4>
                      <a className="card-link col-3" href={item.url} target="_blank">{item.url}</a>
                    </div>
                  </li>
              )}
            )}
            </ul>
          </section>
      )
    } else {
      return (
        <p>The developer who made this, who shall remain nameless, is not as
           good at react as he/she/they claim to be. =P
        </p>
      )
    }
  }

  render() {
    // const { data, filterStuff, searchText, filteredArr } = this.props;
    // const { data, filteredArr, arrLength } = this.props;
    return (
      <Fragment>
        {this.renderWhen()}
      </Fragment>
    )
  }
}
