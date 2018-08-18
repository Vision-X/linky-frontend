import React, { Component, Fragment } from 'react';

export default class Links extends Component {

    renderWhen = () => {
    const { data, filtered, arrLength, search, selected } = this.props;
    if ((filtered && filtered.length) ||
         (selected && filtered.length)) {
        let filtArr = filtered || selected;
        return (
            <section className="links">
              <p className="results">1 - {arrLength}</p>
              <ul>
                {filtArr.slice().sort((a,b) => {
                  let titleA = a.title.toLowerCase()
                                      .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>/]/gi, '')
                                      .substr(0,7);
                  let titleB = b.title.toLowerCase()
                                      .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>/]/gi, '')
                                      .substr(0,7);
                  return titleA > titleB ? 1 :
                         titleA < titleB ? -1 :
                         0
                }).map(item => {
                  return (
                    <li className="card" key={item.id}>
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
    } else if ((!filtered.length && search.length > 0) ||
               (selected.length > 0 && !filtered.length)) {
      return (
        <section className="links">
          <p className="results">0 - {arrLength}</p>
          <ul>
                <li className="card">
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
    } else if (data) {
      return (
          <section className="links">
            <p className="results">1 - {arrLength}</p>
            <ul>
              {data.slice().sort((a,b) => {
                let titleA = a.title.toLowerCase()
                                    .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>/]/gi, '')
                                    .substr(0,7);
                let titleB = b.title.toLowerCase()
                                    .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>/]/gi, '')
                                    .substr(0,7);
                return titleA > titleB ? 1 :
                       titleA < titleB ? -1 :
                       0
                  }).map(item => {
                return (
                  <li className="card" key={item.id}>
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
           good at react as he/she/they claim to be. Also, their logic clearly sucks
           bc the code should never get here ... =P
        </p>
      )
    }
  }

  render() {
    return (
      <Fragment>
        {this.renderWhen()}
      </Fragment>
    )
  }
}
