import React, { Component, Fragment } from 'react';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

export default class extends Component {
  static defaultProps = {
    onSubmit: () => false,
    onReset: () => false,
    confirmPassword: false,
    buttonLabel: 'Submit',
    resetLabel: 'Reset',
  }

  state = {
    password: "",
    passwordError: null,
    confirmationPassword: "",
    confirmationPasswordError: null,
  }

  handleNewPasswordChange = (event) => {
    const password = event.target.value;
    const passwordError = password.length < 1;

    this.setState({ password, passwordError });
  }

  handleConfirmationPasswordChange = (event) => {
    const { password } = this.state;
    const confirmationPassword = event.target.value;
    const confirmationPasswordError = confirmationPassword.length < 1 || confirmationPassword !== password;

    this.setState({ confirmationPassword, confirmationPasswordError });
  };

  handleSubmitClick = (event) => {
    const { onSubmit } = this.props;
    const { password } = this.state;
    const promise = onSubmit(password);
    const isPromise = typeof(promise) === 'object' && typeof(promise.then) === 'function';

    // Clear password after every attempt
    this.setState({ password: '', confirmationPassword: '' });

    if (isPromise) {
      promise.catch(() => this.setState({ passwordError: true }));
    }
  };

  handleResetClick = (event) => {
    const { onReset } = this.props;

    //eslint-disable-next-line
    if (confirm("Are you sure you wish to reset the application?")) {
      onReset();
    }
  };

  componentWillReceiveProps({ error }) {
    if (error) {
      this.setState({ passwordError: error });
    }
  }

  render() {
    return (
      <Grid container direction="column" style={{margin: 0, width: '100%'}}>
        {this.renderPasswordField()}
        {this.renderPasswordConfirmationField()}
        {this.renderButtons()}
      </Grid>
    );
  }

  renderPasswordField() {
    const { password, passwordError } = this.state;

    return (
      <Grid item>
        <TextField type="password" label="Password" value={password} error={passwordError} onChange={this.handleNewPasswordChange} fullWidth/>
      </Grid>
    );
  }

  renderPasswordConfirmationField() {
    const { confirmationPassword, confirmationPasswordError } = this.state;
    const { confirmPassword } = this.props;

    if (!confirmPassword) {
      return null;
    }

    return (
      <Grid item>
        <TextField type="password" label="Confirm password" value={confirmationPassword} error={confirmationPasswordError} onChange={this.handleConfirmationPasswordChange} fullWidth/>
      </Grid>
    );
  }

  renderButtons() {
    const { passwordError, confirmationPasswordError } = this.state;
    const { confirmPassword, buttonLabel, resetLabel } = this.props;
    const buttonDisabled = passwordError !== false || (confirmationPasswordError !== false && confirmPassword === true);

    return (
      <Fragment>
        <Grid item>
          <Button disabled={buttonDisabled} onClick={this.handleSubmitClick} color="primary" raised>{buttonLabel}</Button>
        </Grid>
        <Grid item>
          <Button onClick={this.handleResetClick} color="secondary" raised>{resetLabel}</Button>
        </Grid>
      </Fragment>
    );
  }
}
