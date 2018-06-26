import React, { Component } from "react";
import PropTypes from "prop-types";
import searchService from "../core/search";
import { delay } from "../utils";
import LoadPage from "./LoadPage";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DialogComp from "./DialogComp";
import LeagueRank from "./LeagueRank";

const years = [2016, 2017, 2018];
class LeagueTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0,
      competition: [],
      isLoad: false,
      year: 2017,
      top: false,
      dialog: null
    };
  }

  componentDidMount() {
    this.getApiCompetition(this.state.year);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.year !== this.state.year)
      this.getApiCompetition(this.state.year);
  }

  getApiCompetition = year => {
    delay(0.1, () => {
      this.setState({ isLoad: false }, () => {
        searchService.competition(year).then(competition => {
          this.setState({
            competition,
            isLoad: true
          });
        });
      });
    });
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open
    });
  };

  render() {
    if (!this.state.isLoad) return <LoadPage />;

    const style = {
      margin: 12
    };

    return (
      <div style={{ width: 800, margin: "0 auto", position: "relative" }}>
        <h3
          style={{ cursor: "pointer" }}
          onClick={this.toggleDrawer("top", true)}
        >
          {this.state.year}시즌 리그 순위
        </h3>
        <Paper>
          <Table>
            <TableHead>
              <TableRow style={{ height: 42 }}>
                <TableCell>리그</TableCell>
                <TableCell>리그 별칭</TableCell>
                <TableCell numeric>팀수</TableCell>
                <TableCell numeric>경기수</TableCell>
                <TableCell numeric>현재 경기수</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.competition.map((v, i) => {
                return (
                  <TableRow key={i} style={{ height: 38 }}>
                    <TableCell
                      component="th"
                      scope="row"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        this.setState({
                          selected: v.id,
                          dialog: <LeagueRank id={v.id} />
                        });
                      }}
                    >
                      {v.caption}
                    </TableCell>
                    <TableCell>{v.league}</TableCell>
                    <TableCell numeric>{v.numberOfTeams}</TableCell>
                    <TableCell numeric>{v.numberOfMatchdays}</TableCell>
                    <TableCell numeric>{v.currentMatchday}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
        <Drawer
          anchor="top"
          open={this.state.top}
          onClose={this.toggleDrawer("top", false)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer("top", false)}
            onKeyDown={this.toggleDrawer("top", false)}
          >
            <List>
              {years.map((v, i) => {
                return (
                  <ListItem
                    button
                    key={i}
                    onClick={() => {
                      this.setState({ year: v });
                    }}
                  >
                    <ListItemText primary={v} />
                  </ListItem>
                );
              })}
            </List>
          </div>
        </Drawer>
        <DialogComp
          onClose={() => {
            this.setState({ dialog: null });
          }}
          title="리그 순위표"
        >
          {this.state.dialog}
        </DialogComp>
      </div>
    );
  }
}

LeagueTable.propTypes = {
  data: PropTypes.array
};
LeagueTable.defaultProps = {
  data: []
};
export default LeagueTable;
