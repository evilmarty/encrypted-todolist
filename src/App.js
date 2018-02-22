import React, { Component } from 'react';
import AppView from './AppView';
import TodoList from './TodoList';
import PasswordForm from './PasswordForm';
import { deriveKey, encrypt, decrypt } from './crypto';

const dataKey = 'todolist-data';

const PasswordFormOrTodoList = ({ hasKey, passwordError, items, onTodoListChange, onPasswordSubmit, confirmPassword, onReset }) => {
  if (hasKey) {
    return (
      <TodoList items={items} onChange={onTodoListChange}/>
    );
  } else {
    return (
      <PasswordForm error={passwordError} confirmPassword={confirmPassword} onSubmit={onPasswordSubmit} onReset={onReset}/>
    );
  }
};

export default class extends Component {
  state = {
    privateKey: null,
    passwordError: false,
    items: [],
    encryptedItems: localStorage.getItem(dataKey),
    message: null,
  }

  handlePasswordSubmit = async (password) => {
    try {
      const { encryptedItems } = this.state;
      const privateKey = await deriveKey(password);
      const items = encryptedItems ? await decrypt(privateKey, encryptedItems) : [];

      this.setState({ privateKey, items, message: null });
    } catch (error) {
      // Assume the password is incorrect
      this.setState({ message: 'Incorrect password' });
      throw error;
    }
  };

  handleTodoListChange = async (items) => {
    try {
      const { privateKey } = this.state;
      const encryptedItems = await encrypt(privateKey, items);

      localStorage.setItem(dataKey, encryptedItems);
      this.setState({ items, encryptedItems });
    } catch (error) {
      const message = error.toString();
      // Pass the items so the app still functions, albeit unpersisted.
      this.setState({ message, items });
      throw error;
    }
  };

  handleReset = () => {
    this.setState({ encryptedItems: null, items: [], privateKey: null, passwordError: false, message: null });
  };

  componentDidCatch(error) {
    this.setState({ message: error.toString() });
  }

  render() {
    const { privateKey, message, encryptedItems, ...props } = this.state;
    const hasKey = privateKey !== null;
    const confirmPassword = encryptedItems === null;

    return (
      <AppView message={message}>
        <PasswordFormOrTodoList {...props} hasKey={hasKey} confirmPassword={confirmPassword} onTodoListChange={this.handleTodoListChange} onPasswordSubmit={this.handlePasswordSubmit} onReset={this.handleReset}/>
      </AppView>
    );
  }
}
