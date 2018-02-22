import React, { Component, Fragment } from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Snackbar from 'material-ui/Snackbar';
import Button from 'material-ui/Button';

export default class extends Component {
  static defaultProps = {
    message: null,
  }

  state = {
    showMessage: this.props.message !== null,
  }

  handleClose = () => {
    this.setState({ showMessage: false });
  }

  componentWillReceiveProps({ message }) {
    if (message !== null) {
      this.setState({ showMessage: true });
    }
  }

  render() {
    const { children, message } = this.props;
    const { showMessage } = this.state;

    const action = <Button onClick={this.handleClose} color="secondary" size="small">Dismiss</Button>;

    return (
      <Fragment>
        <AppBar position="static">
          <Toolbar>
            <Typography type="title" color="inherit">
              Encrypted Todo App
            </Typography>
          </Toolbar>
        </AppBar>
        {children}
        <Snackbar message={message} open={showMessage} action={action} onClose={this.handleClose}/>
      </Fragment>
    );
  }
}
