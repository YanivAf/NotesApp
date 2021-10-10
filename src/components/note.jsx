import formatDate from '../utilities/fromatDate';

function Note( { title, date, text, onDelete, index }) {
    let formattedDate = formatDate(date);

    return (
        <div className='note tilt-in-fwd-br'>
            {<span className='note__item note__item--close' onClick={() => onDelete(index)}>✖</span>}
            {title ? <h4 className='note__item note__item--title'>{title}</h4> : null}
            {title ?
            <p className='note__item note__item--date'>{formattedDate}</p> :
            <p className='note__item note__item--title'>{formattedDate}</p>}
            <p className='note__item note__item--text'>{text}</p>
        </div>
    );
}

export default Note;