import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import searchService from "../core/search";
import { delay } from "../utils";
import LoadPage from "./LoadPage";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

class LeagueRank extends Component {
  constructor(props) {
    super(props);

    this.state = {
      leagueRank: [],
      leagueCaption: "",
      id: this.props.id,
      isLoad: false
    };
  }

  componentDidMount() {
    this.getApiLeague(this.state.id);
  }

  getApiLeague = id => {
    this.setState({ isLoad: false }, () => {
      delay(0.1, () => {
        searchService.league(id).then(data => {
          // console.log("data-", data);
          // console.log("standing-", data.standing);
          // console.log("leagueCaption-", data.leagueCaption);
          this.setState({
            leagueRank: data.standing,
            leagueCaption: data.leagueCaption,
            isLoad: true
          });
        });
      });
    });
  };

  goToTeamPlayers = url => {
    let team = url
      .replace("http://api.football-data.org/v1/teams/", "")
      .replace(/[^0-9]/g, "");

    this.props.history.push(`/players/${team}`);
  };

  render() {
    if (!this.state.isLoad) return <LoadPage />;
    //순위	팀	경기수	승점	승	무	패	득점	실점	득실차	선수정보
    return (
      <div style={{ width: 1280, margin: "0 auto", position: "relative" }}>
        <Paper>
          <Table>
            <TableHead>
              <TableRow style={{ height: 42 }}>
                <TableCell style={{ width: "9%" }} numeric>
                  순위
                </TableCell>
                <TableCell>팀</TableCell>
                <TableCell style={{ width: "12%" }} numeric>
                  경기수
                </TableCell>
                <TableCell style={{ width: "9%" }} numeric>
                  승점
                </TableCell>
                <TableCell style={{ width: "9%" }} numeric>
                  승
                </TableCell>
                <TableCell style={{ width: "9%" }} numeric>
                  무
                </TableCell>
                <TableCell style={{ width: "9%" }} numeric>
                  패
                </TableCell>
                <TableCell style={{ width: "9%" }} numeric>
                  득점
                </TableCell>
                <TableCell style={{ width: "9%" }} numeric>
                  실점
                </TableCell>
                <TableCell style={{ width: "9%" }} numeric>
                  득실차
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.leagueRank.map((v, i) => {
                return (
                  <TableRow key={i} style={{ height: 38 }}>
                    <TableCell numeric>{v.position}</TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        this.goToTeamPlayers(v._links.team.href);
                      }}
                    >
                      {v.teamName}
                    </TableCell>
                    <TableCell numeric>{v.playedGames}</TableCell>
                    <TableCell numeric>{v.points}</TableCell>
                    <TableCell numeric>{v.wins}</TableCell>
                    <TableCell numeric>{v.draws}</TableCell>
                    <TableCell numeric>{v.losses}</TableCell>
                    <TableCell numeric>{v.goals}</TableCell>
                    <TableCell numeric>{v.goalsAgainst}</TableCell>
                    <TableCell numeric>{v.goalDifference}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

LeagueRank.propTypes = {
  id: PropTypes.number
};

export default withRouter(LeagueRank);
