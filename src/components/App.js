import React from "react/addons";
import {RouteHandler, Link} from "react-router";
import AppStore from "../stores/AppStore";
import {StoreListenerMixin} from "fluxd";

var {classSet} = React.addons;

var App = React.createClass({
  mixins: [StoreListenerMixin],

  getInitialState() {
    var appState = AppStore.getState();

    return {
      message: appState.message,
      toggle: appState.toggle
    };
  },

  componentDidMount() {
    this.listenTo(AppStore, this.onStoreChange);
  },

  onStoreChange() {
    this.setState(
      this.getInitialState()
    );
  },

  render() {
    var cx = classSet({
      "active": this.state.toggle
    });

    return (
      <html lang="en">
        <head>
          <title>Isomorphic React Hot-Loader demo</title>
          <link rel="stylesheet" href="/stylesheets/app.css" />
        </head>
        <body>
          <div>
            <h1>Message: {this.state.message || 'No Message...'}</h1>
            <h2 className={cx}>Hello, World!</h2>
            <p>Active? <input type="text" disabled={true} value={this.state.toggle ? 'Yes' : 'No'} />.</p>
            <nav>
              <Link to="index">Home</Link>
              <Link to="about">About</Link>
            </nav>
            <RouteHandler />
          </div>
          <script src="http://localhost:9000/dist/bundle.js" />
          <script src="http://127.0.0.1:35729/livereload.js?snipver=1" />
        </body>
      </html>
    );
  }
});

export default App;
