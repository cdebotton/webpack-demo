import React from "react/addons";
import {RouteHandler, State as RouterStateMixin} from "react-router";

var AboutRoute = React.createClass({
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
      <div className="about">
        <h3>AboutRoute</h3>
        <RouteHandler />
      </div>
    )
  }
});

export default AboutRoute;
