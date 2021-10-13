import { useState, useEffect } from 'react';
import './App.css';
import NoteForm from './components/NoteForm';
import Note from './components/note';

import Modal from 'react-modal';
import swal from 'sweetalert';
import localforage from 'localforage';

Modal.setAppElement('#root');
const customStyles = {
  content: {
    inset: 'unset',
    border: 'unset',
    background: 'unset',
    overflow: 'unset',
    borderRadius: 'unset',
    outline: 'unset',
    padding: 'unset',
  },
};

function App(props) {
  let localforageNotes = [];

  const [notes, setNotes] = useState(localforageNotes);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalNoteIndex, setModalNoteIndex] = useState(null);

  useEffect(() => {
    async function getLocalforageNotes() {
      const tempNotes = await localforage.getItem('notes');
      localforageNotes = (tempNotes) ? tempNotes : [];
      setNotes(localforageNotes);
    }
  
    getLocalforageNotes();
  },[]);


  const handleAdd = (newNote) => {
    setNotes([...notes, newNote]);
    localforage.setItem('notes', [...notes, newNote]);
  }

  const handleUpdate = (updatedNote) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(modalNoteIndex, 1, updatedNote);
    setNotes(updatedNotes);
    localforage.setItem('notes', updatedNotes);
    closeModal();
  }

  const handleDelete = (updatedNotes) => {
    setNotes(updatedNotes);
    localforage.setItem('notes', updatedNotes);
  }

  const confirmDelete = (deleteIndex) => {
    swal({
      title: "Are you sure?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        const updatedNotes = [...notes];
        updatedNotes.splice(deleteIndex, 1);
        handleDelete(updatedNotes);
      } else {
        swal("Delete cancelled");
        return;
      }
    });
  }

  const openModal = (e, updateIndex) => {
    if (e.target.classList.contains('note__item--close')) return;
    setModalNoteIndex(updateIndex);
    setIsOpen(true);
  }

  const closeModal = () => {
    setIsOpen(false);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-h1">Notes Cork Board with React.js</h1>
        <NoteForm
          onAdd={handleAdd}
          title={''}
          text={''} />
      </header>
      <main className="App-main">
        {notes.length ?
        notes.map((note, index) =>
        <Note
          key={note.id}
          index={index}
          onDelete={confirmDelete}
          onOpenModal={openModal}
          title={note.title}
          createdAt={note.createdAt}
          updatedAt={note.updatedAt}
          text={note.text}
          id={note.id} />) :
        <p className="no-notes">No notes to show</p>}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Note Modal"
        >
          <span className="modal__item modal__item--close" onClick={closeModal}>✖</span>
          <NoteForm
            onUpdate={handleUpdate}
            id={modalIsOpen ? notes[modalNoteIndex].id : null}
            title={modalIsOpen ? notes[modalNoteIndex].title : null}
            text={modalIsOpen ? notes[modalNoteIndex].text : null}
            createdAt={modalIsOpen ? notes[modalNoteIndex].createdAt : null}
            updatedAt={modalIsOpen ? notes[modalNoteIndex].updatedAt : null} />
        </Modal>

      </main>
      <footer className="App-footer">
        <p>© all rights reserved to <a className="App-link" href="https://www.linkedin.com/in/yaniv-aflalo-8aa92386/" target="_blank" rel="noreferrer">Yaniv Aflalo</a>, full stack developer</p>
      </footer>
    </div>
  );
}

export default App;