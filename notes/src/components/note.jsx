function Note( { title, date, text, onDelete, index }) {
    const options = { dateStyle: "medium", timeStyle: "short" };
    let formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
    let nth = 'th';
    let monthDayForNth = date.getDate().toString();
    const isTeen = ((monthDayForNth.length > 1) && (monthDayForNth[0] === '1')) ? true : false;
    monthDayForNth = (monthDayForNth.length > 1) ? monthDayForNth[1] : monthDayForNth;
    
    if (!isTeen) {
      switch (monthDayForNth) {
        case '1':
          nth = 'st';
          break;
        case '2':
          nth = 'nd';
          break;
        case '3':
          nth = 'rd';
          break;
      }
    }
    
    formattedDate = formattedDate.replace(/[,](.){5}[,]/gm,nth);

    return (
        <div className='note'>
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