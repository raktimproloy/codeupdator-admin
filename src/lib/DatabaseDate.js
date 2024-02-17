export const DatabaseDate = (databaseTime) => {
    const dateObject = new Date(databaseTime);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = dateObject.toLocaleDateString('en-US', options);
    return formattedDate
}