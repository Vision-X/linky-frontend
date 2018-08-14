import React, { Component } from 'react';

export default class EditLinks extends Component {
  constructor() {
    super();
    this.state = { };
    this.form = [];
  }

  getAllLinks = () => {
    let url = 'https://linky-db.herokuapp.com/links';
    let dataGetter = response => {
      let arr = [];
      for (let key in response) {
        arr.push(response[key]);
      }
      this.setState({linkData: arr})
    }
    return fetch(url)
           .then(response => response.json())
           .then(dataGetter)
           .catch(console.error)
  }

  putFormData = (index) => {
    let myData = this.getFormData(index);
    let postUrl = `https://linky-db.herokuapp.com/links/${myData.id}`;
    console.log(myData);
    fetch(postUrl, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(myData)
    })
      .then(response => response.json())
      .then(response => {
        let message = this.form[index].querySelector(".message");
        message.textContent = "Success! Your link was updated!";
        setTimeout(() => {
          message.textContent = "";
        }, 4000);
      })
      .catch(err => console.log(err));
  };

  getFormData = (index) => {
    let thisForm = this.form[index];
    let stringAry = [];
    if (thisForm.querySelector('#tags1').value) { stringAry.push(thisForm.querySelector('#tags1').value); }
    if (thisForm.querySelector('#tags2').value) { stringAry.push(thisForm.querySelector('#tags2').value); }
    if (thisForm.querySelector('#tags3').value) { stringAry.push(thisForm.querySelector('#tags3').value); }
    if (thisForm.querySelector('#tags4').value) { stringAry.push(thisForm.querySelector('#tags4').value); }
    return {
      id: thisForm.querySelector('#id').value,
      title: thisForm.querySelector('#title').value,
      description: thisForm.querySelector('#description').value,
      url: thisForm.querySelector('#myUrl').value,
      stringarray: '{' + stringAry + '}'
    };
  };

  onSubmit = (index, event) => {
    event.preventDefault();
    this.putFormData(index);
  };

  componentDidMount = () => {
    this.getAllLinks();
  };

  renderWhenFetched = () => {
    if (this.state.linkData) {
      const data = this.state.linkData[0];
      return (
        <section>
          <h1>Edit data in the DB...</h1>
          {data.sort((a,b) => {return a.id - b.id}).map((item, index) => {
            let boundSubmit = this.onSubmit.bind(this, index);
            return (
              <form
                className="link-input edit-link-form"
                ref={ref => this.form[index] = ref}
                onSubmit={boundSubmit}
              >
                <h2>Edit link {item.id}</h2>
                <input
                  id="id"
                  value={item.id}
                  readOnly
                  ref={input => (this.id = input)}
                  type="text"
                  name="id"
                  contentEditable="false"
                />
                <label>Title:</label>
                <input
                  id="title"
                  defaultValue={item.title}
                  ref={input => (this.title = input)}
                  type="text"
                  name="title"
                />
                <label>Description:</label>
                <input
                  id="description"
                  defaultValue={item.description}
                  ref={input => (this.description = input)}
                  type="text"
                  name="description"
                />
                <label>URL:</label>
                <input
                  id="myUrl"
                  defaultValue={item.url}
                  ref={input => (this.myUrl = input)}
                  type="text"
                  name="myUrl"
                />
                <label>Tags:</label>
                <div className="multi-tag">
                  <input
                    id="tags1"
                    defaultValue={item.stringarray[0] || ''}
                    ref={input => (this.tags1 = input)}
                    type="text"
                    name="tags"
                  />
                  <input
                    id="tags2"
                    defaultValue={item.stringarray[1] || ''}
                    ref={input => (this.tags2 = input)}
                    type="text"
                    name="tags"
                  />
                  <input
                    defaultValue={item.stringarray[2] || ''}
                    id="tags3"
                    ref={input => (this.tags3 = input)}
                    type="text"
                    name="tags"
                  />
                  <input
                    id="tags4"
                    defaultValue={item.stringarray[3] || ''}
                    ref={input => (this.tags4 = input)}
                    type="text"
                    name="tags"
                  />
                </div>
              <input id="add-link" className="btn btn-primary" type="submit" value="update link" />
              <p className="message"></p>
            </form>
          )}
        )}
        </section>
      )
    } else {
      return (
        <section>
          <h1>awaiting the data...</h1>
        </section>
      )
    }
  }

  render() {
    return (
      <div>
        {this.renderWhenFetched()}
      </div>
    )
  }
}
