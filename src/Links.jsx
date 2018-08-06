import React, { Component, Fragment } from 'react';

export default class Links extends Component {
  render() {
    const { data, filterStuff } = this.props;
    return (
      <section className="links">
        <ul>
            {data.filter(obj => filterStuff.length ? obj.stringarray.find(v => filterStuff.includes(v)) : 1
            ).map(item => {
              return (
                <li className="card" key={Math.random(new Date())}>
                  <div className="card-body">
                    <div className="card-title">
                      <img src={"https://www.google.com/s2/favicons?domain=" + item.url} alt="" />
                      <h2 className="card-title">{item.title}</h2>
                    </div>
                    <h4 className="card-text">{item.description}</h4>
                    <a className="card-link" href={item.url} target="_blank">{item.url}</a>
                    <div className="tag-list">
                      <ul>
                      {item.stringarray.map(tag => {
                        return (
                          <li className="badge badge-primary" key={Math.random(new Date())}>{tag}</li>
                        )
                      })}
                      </ul>
                    </div>
                  </div>
                </li>
              )
            })
          }
        </ul>
      </section>
    )
  }
}
