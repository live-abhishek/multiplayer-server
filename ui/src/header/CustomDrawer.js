import React from "react";
import { withStyles } from "material-ui/styles";
import Drawer from "material-ui/Drawer";
import List, { ListItem, ListItemIcon, ListItemText } from "material-ui/List";
import AboutIcon from "material-ui-icons/InfoOutline";

const styles = {
  list: {
    width: 250
  }
};

class CustomDrawer extends React.Component {
  render() {
    return (
      <Drawer anchor="left" open={this.props.open} onClose={this.props.open}>
        <div
          tabIndex={0}
          role="button"
          onClick={this.props.onButtonClick}
          onKeyDown={this.props.onButtonClick}
        >
          <List style={styles.list}>
            <ListItem button>
              <ListItemIcon>
                <AboutIcon />
              </ListItemIcon>
              <ListItemText primary="About" />
            </ListItem>
          </List>
        </div>
      </Drawer>
    );
  }
}

export default withStyles(styles)(CustomDrawer);
