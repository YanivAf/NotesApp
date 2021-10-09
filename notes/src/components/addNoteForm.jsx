import React from 'react';

class AddNoteForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            text: ''
        }

        this.handleNoteTitle = this.handleNoteTitle.bind(this);
        this.handleNoteText = this.handleNoteText.bind(this);
        this.handleAddNote = this.handleAddNote.bind(this);
    }

    handleNoteTitle(e) {
        this.setState(oldState => ({...oldState, title: e.target.value}));
    }

    handleNoteText(e) {
        this.setState(oldState => ({...oldState, text: e.target.value}));
        e.target.style.height = "auto";
        e.target.style.height = (e.target.scrollHeight) + "px";
    }

    handleAddNote(e) {
        e.preventDefault();      
        const newNote = { title: this.state.title, text: this.state.text, date: new Date() }
        this.props.onAdd(newNote);
        this.setState({title: '', text: ''});
    }

    render() {
        return (
            <form onSubmit={(e) => {this.handleAddNote(e)}}  className='add-note-form'>
                <input placeholder='Note Title (max 25 chars)' value={this.state.title} onChange={this.handleNoteTitle} maxLength={25} className='add-note-form__item add-note-form__item--title'/>
                <textarea placeholder='Note text (max 250 chars)' value={this.state.text} onChange={this.handleNoteText} maxLength={250} className='add-note-form__item add-note-form__item--text' required>
                    
                </textarea>
                <input type='submit' value='Add Note' className='add-note-form__item add-note-form__item--add' />
            </form>
        );
    }
}

export default AddNoteForm;