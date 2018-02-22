import React, { Component } from 'react';
import { ListItem } from 'material-ui/List';
import TextField from 'material-ui/TextField';

export default class extends Component {
  static defaultProps = {
    items: [],
    onNewItem: () => false,
  }

  state = {
    description: '',
    hasError: false,
  }

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.createNewItem();
    }
  }

  handleChange = (event) => {
    this.setState({
      description: event.target.value,
      hasError: false,
    });
  }

  createNewItem() {
    const { onNewItem } = this.props;
    const { description } = this.state;

    if (description) {
      onNewItem({ description, completedAt: null })
      this.setState({ description: '' });
    } else {
      this.setState({ hasError: true });
    }
  }

  render() {
    const { description, hasError } = this.state;

    return (
      <ListItem>
        <TextField placeholder="New item..." value={description} error={hasError} onChange={this.handleChange} inputProps={{onKeyPress: this.handleKeyPress}} fullWidth/>
      </ListItem>
    )
  }
}
