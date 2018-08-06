import React, { Component, Fragment } from 'react';

export default class Links extends Component {
  render() {
    const { data, filterStuff } = this.props;
    return (
      <section className="links">
        <ul>
            {data.reduce(function(acc, val) {
              let count = 0;
              if (filterStuff.length) {
                for (let i = 0; i < val.stringarray.length; i++) {
                  for (let j = 0; j < filterStuff.length; j++) {
                    if (val.stringarray[i] === filterStuff[j]) {
                      count++;
                      if (count === filterStuff.length) {
                        acc.push(val);
                      }
                    }
                  }
                }
                 return acc;
              } else {
                return data;
              }
            },
            []).map(item => {
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