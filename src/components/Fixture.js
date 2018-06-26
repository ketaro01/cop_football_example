import React, { Component } from "react";
import PropTypes from "prop-types";
import Slider from "react-slick";
import LoadPage from "./LoadPage";
import Paper from "@material-ui/core/Paper";
import searchService from "../core/search";
import { delay, dGroup, dSortWith } from "../utils";
import Drawer from "@material-ui/core/Drawer";
import CompetitionList from "./CompetitionList";

class Fixture extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0,
      isLoad: false,
      league: {},
      allFixtures: [],
      allDate: [],
      open: null,
      selectedDate: null,
      fixtures: [],
      top: false,
      leagueID: 445,
      leagueName: null,
      lastUpdate: null
    };

    this.dateLoadSet = this.dateLoadSet.bind(this);
  }

  componentDidMount() {
    this.getApiFixture(this.state.leagueID);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.leagueID !== this.state.leagueID) {
      this.getApiFixture(this.state.leagueID);
    }
  }

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open
    });
  };

  getApiFixture = leagueID => {
    this.setState({ isLoad: false }, () => {
      delay(0.1, () => {
        searchService.fixture_competition(leagueID, null, null).then(league => {
          this.dateLoadSet(league);
        });
      });
    });
  };

  async dateLoadSet(league) {
    let leagueName = "";
    let lastUpdate = "";

    await searchService
      .link(league._links.competition.href)
      .then(competition => {
        leagueName = competition.caption;
        const date = new Date(competition.lastUpdated);
        lastUpdate = `${date.getFullYear()}-${date.getMonth() +
          1}-${date.getDate()}`;
      });
    const allDate = league.fixtures.map(v => {
      const date = new Date(v.date);
      return {
        date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate()
      };
    });

    const sortAllDate = dSortWith(
      ["year", "month", "day"],
      dGroup(["date", "year", "month", "day"], allDate)
    );

    const selectedDate = sortAllDate[sortAllDate.length - 1];
    const fixtures = this.setFixtures(league.fixtures, selectedDate.date);

    this.setState({
      leagueName,
      lastUpdate,
      fixtures,
      allFixtures: league.fixtures,
      allDate: sortAllDate,
      selectedDate: selectedDate.date,
      isLoad: true
    });
  }

  setFixtures(fixtures, selDate) {
    if (!selDate) return false;
    return fixtures.filter(x => {
      const fDate = new Date(x.date);
      return (
        selDate ===
        `${fDate.getFullYear()}-${fDate.getMonth() + 1}-${fDate.getDate()}`
      );
    });
  }

  render() {
    const settings = {
      dots: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3
    };
    const dateSettings = {
      speed: 500,
      slidesToShow: 7,
      slidesToScroll: 7,
      initialSlide: -7
    };

    if (!this.state.isLoad) return <LoadPage />;

    const createLeagueFixture = data => {
      if (data) {
        const dataDiv = data.map((v, i) => {
          const result = v.result.goalsHomeTeam > v.result.goalsAwayTeam;
          return (
            <div key={`data_${i}`}>
              <Paper
                style={{
                  padding: 5,
                  margin: 5,
                  height: 100
                }}
              >
                <div className="teamNameH">
                  <p>
                    {v.homeTeamName}
                    {result && <span className="star">*</span>}
                  </p>
                  <p>{v.result.goalsHomeTeam}</p>
                </div>
                <div className="vs">
                  <p>vs</p>
                  <p>{v.status}</p>
                </div>
                <div className="teamNameA">
                  <p>
                    {v.awayTeamName}
                    {!result && <span className="star">*</span>}
                  </p>
                  <p>{v.result.goalsAwayTeam}</p>
                </div>
              </Paper>
            </div>
          );
        });
        if (data.length < 3) {
          const arr = new Array(3 - data.length).fill("").map((v, i) => {
            return (
              <div key={`data_${i}_null`}>
                <Paper
                  style={{
                    padding: 5,
                    margin: 5,
                    height: 100
                  }}
                >
                  -
                </Paper>
              </div>
            );
          });
          return dataDiv.concat(arr);
        }

        return dataDiv;
      }
    };
    const createDateTime = data => {
      if (data) {
        const dateDiv = data.map((v, i) => {
          return (
            <div key={`date_${i}`}>
              <Paper
                style={{
                  padding: 5,
                  margin: 5,
                  height: 100,
                  backgroundColor:
                    v.date === this.state.selectedDate ? "#ccc" : "transparent"
                }}
                onClick={() => {
                  const fixtures = this.setFixtures(
                    this.state.allFixtures,
                    v.date
                  );
                  this.setState({ fixtures, selectedDate: v.date });
                }}
              >
                <p>{v.date}</p>
              </Paper>
            </div>
          );
        });

        if (data.length < 7) {
          const arr = new Array(7 - data.length).fill("").map((v, i) => {
            return (
              <div key={`date_${i}_null`}>
                <Paper
                  style={{
                    padding: 5,
                    margin: 5,
                    height: 100
                  }}
                  onClick={() => {
                    this.setState({ selectedDate: null });
                  }}
                >
                  <p>-</p>
                </Paper>
              </div>
            );
          });

          return arr.concat(dateDiv);
        }
        return dateDiv;
      }
    };

    return (
      <div className="slider">
        <h3
          style={{ cursor: "pointer" }}
          onClick={this.toggleDrawer("top", true)}
        >
          {this.state.leagueName}
          <br />
          {this.state.selectedDate}
        </h3>
        <div>
          <h5 style={{ textAlign: "left" }}>
            경기일정 (최종 업데이트: {this.state.lastUpdate})
          </h5>
          <Slider {...dateSettings}>
            {createDateTime(this.state.allDate)}
          </Slider>
        </div>

        <div style={{ marginTop: 50 }}>
          <h5 style={{ textAlign: "left" }}>경기결과</h5>
          <Slider {...settings}>
            {createLeagueFixture(this.state.fixtures)}
          </Slider>
        </div>
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
            <CompetitionList
              onClickCompetition={leagueID => {
                this.setState({
                  leagueID
                });
              }}
            />
          </div>
        </Drawer>
      </div>
    );
  }
}

Fixture.propTypes = {
  data: PropTypes.array
};
Fixture.defaultProps = {
  data: []
};
export default Fixture;
