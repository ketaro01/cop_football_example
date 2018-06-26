import React, { Component } from "react";
import PropTypes from "prop-types";
import { delay } from "../utils";
import searchService from "../core/search";
import LoadPage from "./LoadPage";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

class TeamPlayers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      team: [],
      id: null,
      isLoad: false
    };
  }
  componentDidMount() {
    this.getApiTeam(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.getApiTeam(this.props.match.params.id);
    }
  }

  getApiTeam = id => {
    this.setState({ isLoad: false }, () => {
      delay(0.1, async () => {
        let team = [];
        let players = [];

        await searchService.team(id).then(t => {
          team = t;
        });

        await searchService.player(id).then(p => {
          players = p.players;
        });

        this.setState({
          team,
          id,
          players,
          isLoad: true
        });
      });
    });
  };
  render() {
    if (!this.state.isLoad) return <LoadPage />;

    //선수이름	포지션	저지넘버	계약기간	생일	국적
    return (
      <div style={{ width: 1280, margin: "0 auto", position: "relative" }}>
        <h1>
          <img
            src={this.state.team.crestUrl}
            style={{ width: 50, height: 50 }}
          />
          <br />
          {this.state.team.name}
        </h1>
        <Paper>
          <Table>
            <TableHead>
              <TableRow style={{ height: 42 }}>
                <TableCell>선수이름</TableCell>
                <TableCell>포지션</TableCell>
                <TableCell style={{ width: "10%" }} numeric>
                  등번호
                </TableCell>
                <TableCell style={{ width: "15%" }} numeric>
                  계약기간
                </TableCell>
                <TableCell style={{ width: "15%" }} numeric>
                  생일
                </TableCell>
                <TableCell style={{ width: "20%" }}>국적</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.players.length !== 0 ? (
                this.state.players.map((v, i) => {
                  return (
                    <TableRow key={i} style={{ height: 38 }}>
                      <TableCell>{v.name}</TableCell>
                      <TableCell>{v.position}</TableCell>
                      <TableCell numeric>{v.jerseyNumber}</TableCell>
                      <TableCell numeric>{v.contractUntil}</TableCell>
                      <TableCell numeric>{v.dateOfBirth}</TableCell>
                      <TableCell>{v.nationality}</TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow key={0} style={{ height: 38 }}>
                  <TableCell colSpan={6} style={{ textAlign: "center" }}>
                    선수단 정보가 존재하지 않습니다.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

TeamPlayers.propTypes = {};

export default TeamPlayers;
