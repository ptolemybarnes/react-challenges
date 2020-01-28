import React from 'react';
import './App.css';
import db from './db';

const Title = ({ text }) => {
  const titleText = text ? `${text}'s Todo List` : 'My Todo List'
  return (<h1> { titleText } </h1>)
}

const remove = (finder, collection) => {
  const entryIndex = collection.findIndex(finder);
  return collection.slice(0, entryIndex).concat(collection.slice(entryIndex + 1, collection.length));
}

const replace = (finder, collection, newElement) => {
  const entryIndex = collection.findIndex(finder);
  return collection.slice(0, entryIndex).concat([newElement]).concat(collection.slice(entryIndex + 1, collection.length));
}

const TodoEntry = ({ text, deleteEntry, isCompleted, markCompleted }) => {
  if(!text) {
    throw new Error('Todo entry did not contain text');
  }
  if(isCompleted) {
    return (
      <li>
        <strike>{ text } </strike>
        <input checked={isCompleted} type='checkbox' onChange={markCompleted} /> - <button onClick={deleteEntry}>X</button>
      </li>
    )
  }
  return (<li>{ text } <input type='checkbox' checked={isCompleted} onChange={markCompleted} /> - <button onClick={deleteEntry}>X</button></li>)
}

class TodoEntryErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ hasError: true })
  }

  render() {
    if(this.state.hasError) {
      return <li>Error!</li>
    }
    return this.props.children;
  }
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: [],
      newEntry: '',
    }
  }

  componentDidMount() {
    this.getTodos();
  }

  getTodos = () => {
    db.getAll().then(todos => this.setState({ todos }))
  }

  setOwner = (event) => {
    this.setState({ owner: event.target.value });
  }

  setNewEntry = (event) => {
    this.setState({ newEntry: event.target.value });
  }

  createNewEntry = () => {
    db.create({ text: this.state.newEntry }).then((entry) => this.setState({ todos: [ ...this.state.todos, entry ]}))
  }

  deleteEntry = (id) => {
    db.delete(id).then(() => this.setState({ todos: remove(entry => entry.id === id, this.state.todos) }));
  }

  updateEntry = (newEntry) => {
    db.update(newEntry).then(() => this.setState({ todos: replace(({ id }) => id === newEntry.id, this.state.todos, newEntry) }));
  }

  render() {
    return (
      <div style={{ margin: '100px' }} className="App">
        <span>Enter your name: <input type='text' onChange={this.setOwner} /></span>

        <Title text={this.state.owner} />
        <ul>
          {
            this.state.todos.map((entry) => {
              const props = {
                ...entry,
                deleteEntry: () => this.deleteEntry(entry.id),
                markCompleted: () => this.updateEntry({ ...entry, isCompleted: !entry.isCompleted })
              };
              return (<TodoEntryErrorBoundary key={entry.id}> <TodoEntry { ...props } /></TodoEntryErrorBoundary>)
            })
          }
        </ul>

        <input value={this.state.newEntry} type='text' onChange={this.setNewEntry} />
        <input type='submit' value='Create' onClick={this.createNewEntry} />
      </div>
    );
  }
}

export default App;
