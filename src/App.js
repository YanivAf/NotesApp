import React from 'react';
import './App.css';
import AddNoteForm from './components/addNoteForm';
import Note from './components/note';

import swal from 'sweetalert';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        notes: [],
    }
    this.handleAdd = this.handleAdd.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
  }

  handleAdd(newNote) {
    this.setState(oldState => ({...oldState, notes: [...oldState.notes, newNote]}));
  }

  handleDelete(updatedNotes) {
    this.setState(oldState => ({...oldState, notes: updatedNotes}));
  }

  confirmDelete(index) {
    swal({
      title: "Are you sure?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        const updatedNotes = [...this.state.notes];
        updatedNotes.splice(index, 1);  
        this.handleDelete(updatedNotes);
      } else {
        swal("Delete cancelled");
        return;
      }
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-h1">Notes Cork Board with React.js</h1>
          <AddNoteForm onAdd={this.handleAdd} />
        </header>
        <main className="App-main">
          {this.state.notes.length ?
          this.state.notes.map((note, index) => <Note key={note.id} index={index} onDelete={this.confirmDelete} title={note.title} date={note.date} text={note.text} />) :
          <p className="no-notes">No notes to show</p>}
        </main>
        <footer className="App-footer">
          <p>© all rights reserved to <a className="App-link" href="https://www.linkedin.com/in/yaniv-aflalo-8aa92386/" target="_blank" rel="noreferrer">Yaniv Aflalo</a>, full stack developer</p>
        </footer>
      </div>
    );
  }
}

export default App;