import React, { Component } from 'react';

export default class Links extends Component {
  render() {
    const { data, filterStuff, searchText } = this.props;
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
                } return acc.sort((a,b) => b.title < a.title);
              } else if (searchText.length) {
                  let searchFilter = data.filter(link => {
                    return link.title.toLowerCase().includes(searchText.toLowerCase()) ||
                           link.description.toLowerCase().includes(searchText.toLowerCase())
                  })
                  return searchFilter;
              } else {
                  return data.sort((a,b) => b.title < a.title)
              }
            },
            []).map(item => {
              return (
                <li className="card" key={Math.random(new Date())}>
                  <div className="card-body">
                    <div className="card-title col-4">
                      <img src={"https://www.google.com/s2/favicons?domain=" + item.url} alt="" />
                      <h2 className="card-title">{item.title}</h2>
                    </div>
                    <h4 className="card-text col-4">{item.description}</h4>
                    <a className="card-link col" href={item.url} target="_blank">{item.url}</a>
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
