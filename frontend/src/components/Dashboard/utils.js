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
    else if(day.getUTCHours() == 0) {
        hour=12;
        ampm="am";
    }
    else {
        hour=day.getUTCHours();
        ampm="am";
    }


    if(hour<10) {
    return `0${hour}:${day.getUTCMinutes()} ${ampm}`;
    }
    return `${hour}:${day.getUTCMinutes()} ${ampm}`;
}

//export default {dueDate,dueTime};