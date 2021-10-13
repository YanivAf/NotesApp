import formatDate from '../utilities/fromatDate';

function Note( { title, createdAt, updatedAt, text, onDelete, onOpenModal, index }) {
    const createdFormattedDate = formatDate(createdAt, true); // withYear = false
    const updatedFormattedDate = (updatedAt) ? formatDate(updatedAt, true) : null; // withYear = false
    const createdClass = (updatedAt) ? 'date' : 'title';
    return (
        <div className='note tilt-in-fwd-br' onClick={(e) => onOpenModal(e, index)}>
            {<span className='note__item note__item--close' onClick={() => onDelete(index)}>✖</span>}
            {title ?
            <div className='note__item note__item--top'>
                <h4 className='note__item note__item--title'>{title}</h4>
                {updatedAt ?
                <p className='note__item note__item--date'>updated:<br />{updatedFormattedDate}</p> : null}
                <p className='note__item note__item--date'>created:<br />{createdFormattedDate}</p>
            </div>
            :
            <div className='note__item note__item--top'>
                {updatedAt ?
                <p className='note__item note__item--title'>updated:<br />{updatedFormattedDate}</p> : null}
                <p className={`note__item note__item--${createdClass}`}>created:<br />{createdFormattedDate}</p>
            </div>
            }
                <p className='note__item note__item--text'>{text}</p>
        </div>
    );
}

export default Note;