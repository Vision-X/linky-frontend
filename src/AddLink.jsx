import React, { Component, Fragment } from 'react';

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
        let message = document.querySelector("#message");
        message.textContent = "Your event was submitted!";
        setTimeout(() => {
          message.textContent = "";
        }, 4000);
      })
      .catch(err => console.log(err));
    document.querySelectorAll("input").value = '';
  };

  getFormData = () => {
    return {
      title: this.title.value,
      description: this.description.value,
      url: this.myUrl.value
    };
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.postFormData();
  };

  render() {
    return (
      <form
        className="link-input"
        onClick={this._onClick}
        onSubmit={e => this.onSubmit(e)}
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
        <input
          id="tags"
          ref={input => (this.tags = input)}
          type="text"
          name="tags"
        />
      <input id="add-link" className="btn btn-primary" type="submit" value="add link" />
      <p id="message"></p>
    </form>
    )
  }
}
