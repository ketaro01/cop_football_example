import { withRouter, Switch, Route } from "react-router-dom";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { LeagueTable, Fixture, Players, TeamPlayers } from "./components";
import Layout from "./Layout";
class router extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Layout>
            <Switch>
              <Route exact path="/" component={Fixture} />
              <Route path="/fixture" component={Fixture} />
              <Route path="/leagueTable" component={LeagueTable} />
              <Route exact path="/players" component={Players} />
              <Route path="/players/:id" component={TeamPlayers} />
            </Switch>
          </Layout>
        </Switch>
      </div>
    );
  }
}

router.propTypes = {};

export default router;
