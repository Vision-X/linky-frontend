import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import AddLink from './AddLink';
import EditLinks from'./EditLinks';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap';

ReactDOM.render(
  <Router>
    <Fragment>
      <Route exact path="/" component={ App } />
      <Route path="/add" component={ AddLink } />
      <Route path="/edit" component={ EditLinks } />
    </Fragment>
  </Router>,
document.getElementById('root'));
registerServiceWorker();
