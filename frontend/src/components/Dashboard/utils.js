export function dueDate(dt) {
    const day=new Date(dt);

    return `${day.getUTCDate()}/${day.getUTCMonth()+1}/${day.getUTCFullYear()}`;
}

export function dueTime(dt) {
    const day=new Date(dt);
    let hour;
    let ampm;

    if(day.getUTCHours() > 12 ) {
        hour=day.getUTCHours() - 12;
        ampm="pm";
    }
    else {
        hour=day.getUTCHours();
        ampm="am";
    }

    return `${hour}:${day.getUTCMinutes()} ${ampm}`;
}

//export default {dueDate,dueTime};