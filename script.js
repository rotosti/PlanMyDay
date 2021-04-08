var timeAndDay = $('#currentDay');

// function for updating time and date every second
function updateCurrentTime() {

    var date = new Date();

    var timeOfDay = "AM";
    var hours = date.getHours();

    if (hours > 12) {
        hours -= 12;
        timeOfDay = "PM";
    } else if (hours === 0) {
        hours = 12;
        timeOfDay = "AM";
    } else {
        timeOfDay = "AM";
    }

    hours = timePadding(hours, 2);

    var seconds = timePadding(date.getSeconds(), 2);
    var minutes = timePadding(date.getMinutes(), 2);

    timeAndDay.text(`${hours}:${minutes}:${seconds} ${timeOfDay} on ` +
                    `${(date.getMonth() + 1)}/${date.getDate()}/${date.getFullYear()}`);

    setTimeout(updateCurrentTime, 1000);
}

// adjusts hours, minutes, and seconds to correct amount of placeholder digits
function timePadding(number, size) {
    number = number.toString();
    while (number.length < size) {
        number = '0' + number;
    }
    return number;
}

updateCurrentTime();