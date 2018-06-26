import React, { Component } from "react";
import PropTypes from "prop-types";
import Collapse from "react-collapse";
class Snackbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      time: this.props.time * 1000
    };
  }
  componentDidMount() {
    if (this.state.time) {
      this.setState({ isOpen: true }, () => {
        setTimeout(() => {
          this.setState({ isOpen: false });
        }, this.state.time);
      });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (!this.state.isOpen && prevState.isOpen) {
      setTimeout(() => {
        this.props.end();
      }, 500);
    }
  }
  render() {
    return (
      <div
        style={{
          position: "absolute",
          top: 10,
          left: "50%",
          marginLeft: -150,
          opacity: 0.5
        }}
      >
        <Collapse isOpened={this.state.isOpen} fixedHeight={60}>
          <div
            style={{
              backgroundColor: "#000",
              color: "#fff",
              height: 30,
              width: 300
            }}
          >
            {this.props.value}
          </div>
        </Collapse>
      </div>
    );
  }
}

Snackbar.propTypes = {};

export default Snackbar;
