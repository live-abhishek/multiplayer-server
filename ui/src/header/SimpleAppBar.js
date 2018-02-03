// @flow weak

import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import Button from "material-ui/Button";
import IconButton from "material-ui/IconButton";
import MenuIcon from "material-ui-icons/Menu";
import Cookies from "universal-cookie";
import { connect } from "react-redux";
import { leaveRoom } from "../game/gameAction";
import { sendLeaveRoomSignal } from "../socketHelper/socketProvider";

const styles = theme => ({
  root: {
    width: "100%"
  },
  flex: {
    flex: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
});

class ButtonAppBar extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={this.props.classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              className={this.props.classes.menuButton}
              color="contrast"
              aria-label="Menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography
              type="title"
              color="inherit"
              className={this.props.classes.flex}
            >
              Notebook Games
            </Typography>
            {this.props.pageState !== "MENU" && (< Button color="contrast" onClick={this.props.leaveRoom}>
              Leave
            </Button>)}
          </Toolbar>
        </AppBar>
      </div >
    );
  }
}

const mapStateToProps = state => {
  return {
    pageState: state.game.pageState,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    leaveRoom: () => {
      sendLeaveRoomSignal();
      dispatch(leaveRoom());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ButtonAppBar));
