import React from "react";
import Button from "material-ui/Button";
import TextField from "material-ui/TextField";
import Dialog, { DialogActions, DialogContent } from "material-ui/Dialog";
import Typography from "material-ui/Typography";
import ReactJSIcon from "../images/react.png";
import HeartIcon from "../images/like.png";
import SocketIOIcon from "../images/socketio.png";
import NodeIcon from "../images/nodejs.png";
import TypescriptIcon from "../images/typescript.png";
import GithubIcon from "../images/github.png";

class AboutDialog extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Dialog
        open={this.props.open}
        ignoreBackdropClick={false}
        ignoreEscapeKeyUp={false}
        onClose={this.props.onClose}
      >
        <DialogContent>
          <Typography variant="caption">
            <h1>Notebook Games</h1>
          </Typography>
          <Typography variant="subheading">
            <h3>Made with</h3>
          </Typography>
          <ul>
            <li>
              <Typography>
                NodeJS <img src={NodeIcon} alt="love" />
              </Typography>
            </li>
            <li>
              <Typography>
                ReactJS <img src={ReactJSIcon} alt="love" />
              </Typography>
            </li>
            <li>
              <Typography>
                Socket.IO <img src={SocketIOIcon} alt="love" />
              </Typography>
            </li>
            <li>
              <Typography>
                Typescript <img src={TypescriptIcon} alt="love" />
              </Typography>
            </li>
            <li>
              <Typography>
                With Love <img src={HeartIcon} alt="love" />
              </Typography>
            </li>
            <li>
              <Typography>
                <a
                  href="https://github.com/live-abhishek/multiplayer-server"
                  target="_blank"
                >
                  Go to Github
                </a>{" "}
                <img src={GithubIcon} alt="github" />
              </Typography>
            </li>
          </ul>
        </DialogContent>
      </Dialog>
    );
  }
}

export default AboutDialog;
