import React, { Component } from "react";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class DialogComp extends Component {
  handleClose = () => {
    this.props.onClose();
  };
  render() {
    const styles = {
      appBar: {
        position: "relative"
      },
      flex: {
        flex: 1
      }
    };

    return (
      <Dialog
        open={!!this.props.children}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
        TransitionComponent={Transition}
        fullScreen
      >
        <AppBar style={styles.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              onClick={this.handleClose}
              aria-label="Close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="title" color="inherit" style={styles.flex}>
              {this.props.title}
            </Typography>
          </Toolbar>
        </AppBar>
        <DialogContent>{this.props.children}</DialogContent>
        <DialogActions>{this.props.customButton}</DialogActions>
      </Dialog>
    );
  }
}

DialogComp.propTypes = {
  title: PropTypes.string,
  customButton: PropTypes.node,
  onClose: PropTypes.func
};

export default DialogComp;
