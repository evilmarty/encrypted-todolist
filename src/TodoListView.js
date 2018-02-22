import React, { Component } from 'react';
import List from 'material-ui/List';
import TodoItem from './TodoItem';
import NewTodoItem from './NewTodoItem';

export default class extends Component {
  static defaultProps = {
    items: [],
    onNewItem: () => false,
    onToggleItem: () => false,
    onRemoveItem: () => false,
  }

  render() {
    const { items, onToggleItem, onRemoveItem, onNewItem } = this.props;

    return (
      <List dense>
        {items.map((item, index) => <TodoItem key={index} onToggle={onToggleItem} onRemove={onRemoveItem} item={item}/>)}
        <NewTodoItem onNewItem={onNewItem}/>
      </List>
    )
  }
}
