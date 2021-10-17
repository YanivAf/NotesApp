interface Note {
    title: string,
    text: string,
    reminder: Date,
    createdAt: Date,
    updatedAt: Date,
    id: string
}

function sortByDate(arrayToSort: Array<Note>): Array<Note> {
    try {
        arrayToSort.sort((a,b) => {
            const dateA: any = (a.updatedAt) ? a.updatedAt : a.createdAt;
            const dateB: any = (b.updatedAt) ? b.updatedAt : b.createdAt;
            return (dateB - dateA);  
        });
        return arrayToSort;

    } catch (error: any) {
        console.error(error.message);
        return error.message;
    }
}

export default sortByDate;