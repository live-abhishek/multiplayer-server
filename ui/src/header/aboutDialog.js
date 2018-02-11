import React from "react";
import Button from "material-ui/Button";
import TextField from "material-ui/TextField";
import Dialog, {
  DialogContent,
  DialogTitle,
  DialogContentText
} from "material-ui/Dialog";
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
      <Dialog open={this.props.open} onClose={this.props.onClose}>
        <DialogTitle>{"Notebook Games"}</DialogTitle>
        <DialogContent>
          <DialogContentText className="about-sub-header">
            Made with
          </DialogContentText>
          <ul>
            <li>
              <DialogContentText>
                NodeJS <img src={NodeIcon} alt="love" />
              </DialogContentText>
            </li>
            <li>
              <DialogContentText>
                ReactJS <img src={ReactJSIcon} alt="love" />
              </DialogContentText>
            </li>
            <li>
              <DialogContentText>
                Socket.IO <img src={SocketIOIcon} alt="love" />
              </DialogContentText>
            </li>
            <li>
              <DialogContentText>
                TypeScript <img src={TypescriptIcon} alt="love" />
              </DialogContentText>
            </li>
            <li>
              <DialogContentText>
                With Love <img src={HeartIcon} alt="love" />
              </DialogContentText>
            </li>
          </ul>
          <DialogContentText>
            <h4>
              <a
                href="https://github.com/live-abhishek/multiplayer-server"
                target="_blank"
                rel="noopener noreferrer"
              >
                Go to Github
              </a>{" "}
              <img src={GithubIcon} alt="github" />
            </h4>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    );
  }
}

export default AboutDialog;
