import React, { Component } from "react";
import PropTypes from "prop-types";
import searchService from "../core/search";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

class CompetitionList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      competition: [],
      year: 2017
    };
  }
  componentDidMount() {
    this.getApiCompetition(this.state.year);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.year !== this.state.year) {
      this.getApiCompetition(this.state.year);
    }
  }

  getApiCompetition = year => {
    searchService.competition(year).then(competition => {
      this.setState({
        competition
      });
    });
  };

  render() {
    if (this.state.competition.length === 0) return null;

    return (
      <List>
        {this.state.competition.map((v, i) => {
          return (
            <ListItem
              button
              key={i}
              onClick={() => {
                this.props.onClickCompetition(v.id);
              }}
            >
              <ListItemText primary={v.caption} />
            </ListItem>
          );
        })}
      </List>
    );
  }
}

CompetitionList.propTypes = {
  onClickCompetition: PropTypes.func
};

export default CompetitionList;
