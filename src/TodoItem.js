import React, { Component } from 'react';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List';

export default class extends Component {
  static defaultProps = {
    onToggle: () => false,
    onRemove: () => false,
  }

  handleListItemClick = (event) => {
    const { item, onToggle } = this.props;
    onToggle(item);
  }

  handleIconButtonClick = (event) => {
    const { item, onRemove } = this.props;
    onRemove(item);
  }

  render() {
    const { item } = this.props;
    const checked = item.completedAt !== null;

    return (
      <ListItem onClick={this.handleListItemClick} dense button>
        <Checkbox disableRipple checked={checked}/>
        <ListItemText primary={item.description}/>
        <ListItemSecondaryAction>
          <IconButton onClick={this.handleIconButtonClick} aria-label="Delete">
            <DeleteIcon/>
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}
