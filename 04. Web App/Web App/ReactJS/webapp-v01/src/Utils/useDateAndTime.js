export default function useDateAndTime() {
    // Make date object
    const session = new Date();

    // Find date
    const yyyy = String(session.getFullYear());
    const mm = String(session.getMonth() + 1).padStart(2, '0');
    const dd = String(session.getDate()).padStart(2, '0');

    // Find time
    const hrs = String(session.getHours()).padStart(2, '0');
    const min = String(session.getMinutes()).padStart(2, '0');
    const sec = String(session.getSeconds()).padStart(2, '0');

    const date = `${yyyy}-${mm}-${dd}`;
    const time = `${hrs}:${min}:${sec}`;

    console.log('date: ', typeof(date));
    console.log('time: ', time);

    // Return object
    return { date, time };
}