import React, { Component } from 'react';
import TodoListView from './TodoListView';

export default class extends Component {
  static defaultProps = {
    items: [],
    onChange: () => false,
  }

  handleNewItem = (item) => {
    const { items, onChange } = this.props;
    onChange(items.concat([item]));
  }

  handleToggleItem = (item) => {
    const { items, onChange } = this.props;
    item.completedAt = item.completedAt ? null : new Date();

    onChange(items.concat([]));
  }

  handleRemoveItem = (item) => {
    const { items, onChange } = this.props;
    items.splice(items.indexOf(item), 1);

    onChange(items);
  }

  render() {
    const { items } = this.props;
    return <TodoListView items={items} onNewItem={this.handleNewItem} onRemoveItem={this.handleRemoveItem} onToggleItem={this.handleToggleItem}/>;
  }
}
