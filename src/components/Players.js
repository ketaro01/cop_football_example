import React, { Component } from "react";
import PropTypes from "prop-types";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import searchService from "../core/search";
import { delay } from "../utils";
import LoadPage from "./LoadPage";

class Players extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0,
      isLoad: true,
      years: [2016, 2017, 2018],
      season: "",
      leagues: [],
      league: "",
      teams: [],
      team: ""
    };
  }

  handleChange = (name, reset) => event => {
    const nextProps = {};
    if (reset) {
      reset.map(v => {
        nextProps[v] = "";
      });
    }
    this.setState({ ...nextProps, [name]: event.target.value, isLoad: false });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.season !== this.state.season) {
      delay(0.1, () => {
        searchService.competition(this.state.season).then(competition => {
          this.setState({ leagues: competition, isLoad: true });
        });
      });
    } else if (prevState.league !== this.state.league) {
      delay(0.1, () => {
        searchService.league(this.state.league).then(data => {
          this.setState({
            teams: data.standing,
            isLoad: true
          });
        });
      });
    } else if (prevState.team !== this.state.team) {
      this.props.history.push(`/players/${this.state.team}`);
    }
  }

  render() {
    if (!this.state.isLoad) return <LoadPage />;

    return (
      <div style={{ width: 1200, margin: "0 auto", position: "relative" }}>
        <h1>선수단 정보 조회</h1>
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            marginTop: "20%"
          }}
        >
          <FormControl
            style={{
              minWidth: 200,
              maxWidth: 200,
              marginRight: 20
            }}
          >
            <InputLabel htmlFor="season">Season</InputLabel>
            <Select
              native
              value={this.state.season}
              onChange={this.handleChange("season", ["league", "team"])}
              inputProps={{
                name: "season",
                id: "season"
              }}
              style={{ fontSize: 50 }}
            >
              <option value="" />
              {this.state.years.map((v, i) => {
                return (
                  <option value={v} key={i}>
                    {v}
                  </option>
                );
              })}
            </Select>
          </FormControl>{" "}
          <FormControl
            style={{
              minWidth: 300,
              maxWidth: 300,
              marginRight: 20
            }}
            disabled={!this.state.season}
          >
            <InputLabel htmlFor="league">League</InputLabel>
            <Select
              native
              value={!this.state.season ? "" : this.state.league}
              onChange={this.handleChange("league", ["team"])}
              inputProps={{
                name: "league",
                id: "league"
              }}
              style={{ fontSize: 50 }}
            >
              <option value="" />
              {this.state.leagues.map((v, i) => {
                return (
                  <option value={v.id} key={i}>
                    {v.caption}
                  </option>
                );
              })}
            </Select>
          </FormControl>{" "}
          <FormControl
            style={{
              minWidth: 400,
              maxWidth: 400,
              marginRight: 20
            }}
            disabled={!this.state.league}
          >
            <InputLabel htmlFor="team">Team</InputLabel>
            <Select
              native
              value={!this.state.league ? "" : this.state.team}
              onChange={this.handleChange("team")}
              inputProps={{
                name: "team",
                id: "team"
              }}
              style={{ fontSize: 50 }}
            >
              <option value="" />
              {(this.state.teams ? this.state.teams : []).map((v, i) => {
                let teamID = v._links.team.href
                  .replace("http://api.football-data.org/v1/teams/", "")
                  .replace(/[^0-9]/g, "");

                return (
                  <option value={teamID} key={i}>
                    {v.teamName}
                  </option>
                );
              })}
            </Select>
          </FormControl>
        </div>
      </div>
    );
  }
}

Players.propTypes = {
  data: PropTypes.array
};
Players.defaultProps = {
  data: []
};
export default Players;
