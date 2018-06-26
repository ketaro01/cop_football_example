import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import FixtureIcon from "@material-ui/icons/AccessTime";
import LeagueTable from "@material-ui/icons/Dvr";
import PlayersIcon from "@material-ui/icons/AccountBox";

const routerPath = [
  { index: 0, name: "Fixture", path: "/fixture", icon: <FixtureIcon /> },
  {
    index: 1,
    name: "League",
    path: "/leagueTable",
    icon: <LeagueTable />
  },
  { index: 2, name: "Players", path: "/players", icon: <PlayersIcon /> }
];
class Layout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.getPathValue()
    };
  }

  getPathValue = () => {
    let value = 0;
    const tmpArr = routerPath.filter(
      x =>
        this.props.location.pathname
          .toLowerCase()
          .indexOf(x.path.toLowerCase()) > -1
    );

    if (tmpArr.length > 0) {
      value = tmpArr[0].index;
    }

    return value;
  };

  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.setState({
        value: this.getPathValue()
      });
    }
  }

  handleChange = (event, value) => {
    this.setState({ value }, () => {
      this.props.history.push(routerPath[value].path);
    });
  };

  render() {
    return (
      <div>
        {this.props.children}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: "calc(50% - 400px)",
            width: 800
          }}
        >
          <BottomNavigation
            value={this.state.value}
            onChange={this.handleChange}
            showLabels
          >
            {routerPath.map((v, i) => {
              return (
                <BottomNavigationAction label={v.name} icon={v.icon} key={i} />
              );
            })}
          </BottomNavigation>
        </div>
      </div>
    );
  }
}

Layout.propTypes = {};

export default withRouter(Layout);
