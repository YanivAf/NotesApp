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
  }

  handleAdd(newNote) {
    this.setState(oldState => {
      const updatedNotes = [...oldState.notes, newNote]
      return {...oldState, notes: updatedNotes};
    });
  }

  handleDelete(index) {
    swal({
      title: "Are you sure?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        swal("Note deleted", {
          icon: "success",
        });
      } else {
        swal("Delete cancelled");
      }
    });

    this.setState(oldState => {
      const updatedNotes = [...this.state.notes];
      updatedNotes.splice(index, 1);
      return {...oldState, notes: updatedNotes}
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <AddNoteForm onAdd={this.handleAdd} />
        </header>
        <main className="App-main">
          {this.state.notes.length ?
          this.state.notes.map((note, index) => <Note key={`note_${index}`} index={index} onDelete={this.handleDelete} title={note.title} date={note.date} text={note.text} />) :
          <p>No notes to show</p>}
          {console.log(this.state)}
        </main>
      </div>
    );
  }
}

export default App;
