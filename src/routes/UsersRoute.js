import React from "react/addons";
import {RouteHandler, State as RouterStateMixin} from "react-router";

var UsersRoute = React.createClass({
  mixins: [RouterStateMixin],

  statics: {
    fetchData(params, query) {

    },

    willTransitionTo(transition, params) {

    }
  },

  propTypes: {

  },

  getInitialState() {
    var params = this.getParams();
    var query = this.getQuery();

    return {};
  },

  getDefaultProps() {
    return {};
  },

  render() {
    return (
      <div className="users">
        <h2>Users Page</h2>
        <RouteHandler />
      </div>
    )
  }
});

export default UsersRoute;
