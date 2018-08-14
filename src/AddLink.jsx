import React, { Component } from 'react';

export default class AddLink extends Component {

  postFormData = () => {
    const postUrl = "https://linky-db.herokuapp.com/links";
    let myData = this.getFormData();
    fetch(postUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(myData)
    })
      .then(response => response.json())
      .then(response => {
        let message = document.querySelector(".message");
        message.textContent = "Sucess! Your link was submitted!";
        setTimeout(() => {
          message.textContent = "";
        }, 4000);
      })
      .catch(err => console.log(err));
    document.querySelectorAll("input").value = '';
  };

  getFormData = () => {
    let stringAry = [];
    if (this.tags1.value) { stringAry.push(this.tags1.value); }
    if (this.tags2.value) { stringAry.push(this.tags2.value); }
    if (this.tags3.value) { stringAry.push(this.tags3.value); }
    if (this.tags4.valye) { stringAry.push(this.tags4.value); }
    return {
      title: this.title.value,
      description: this.description.value,
      url: this.myUrl.value,
      stringarray: '{' + stringAry + '}'
    };
  };

  onSubmit = (event) => {
    event.preventDefault();
    this.postFormData();
    document.querySelector(".link-input").reset();
  };

  render() {
    return (
      <form
        className="link-input"
        onClick={this._onClick}
        onSubmit={event => this.onSubmit(event)}
      >
        <h2>Add a link</h2>
        <label>Title:</label>
        <input
          id="title"
          ref={input => (this.title = input)}
          type="text"
          name="title"
        />
        <label>Description:</label>
        <input
          id="description"
          ref={input => (this.description = input)}
          type="text"
          name="description"
        />
        <label>URL:</label>
        <input
          id="myUrl"
          ref={input => (this.myUrl = input)}
          type="text"
          name="myUrl"
        />
        <label>Tags:</label>
        <div className="multi-tag">
          <input
            id="tags1"
            ref={input => (this.tags1 = input)}
            type="text"
            name="tags"
          />
          <input
            id="tags2"
            ref={input => (this.tags2 = input)}
            type="text"
            name="tags"
          />
          <input
            id="tags3"
            ref={input => (this.tags3 = input)}
            type="text"
            name="tags"
          />
          <input
            id="tags4"
            ref={input => (this.tags4 = input)}
            type="text"
            name="tags"
          />
        </div>
      <input id="add-link" className="btn btn-primary" type="submit" value="add link" />
      <p className="message"></p>
    </form>
    )
  }
}
