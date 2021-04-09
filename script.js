var timeBlocks = [];
var timeBlockTimes = ["09:00:00","10:00:00","11:00:00","12:00:00","13:00:00","14:00:00","15:00:00","16:00:00","17:00:00"];

function updateTime() {
    $('#currentDay').text(moment().format('h:mm:ss a on MMMM Do, YYYY'))
    setTimeout(updateTime, 1000);
}

$('#time-block-list').on('click', '#save-button', updateTextBlocks);

function checkBlockHour() {

    for (var j = 0; j < timeBlocks.length; j++) {

        var difference = moment(`${timeBlockTimes[j]}`, 'HH:mm:ss').diff(moment(), 'minute');

        if (difference <= -60) {
            if ($(`#${timeBlocks[j]}`).hasClass('present')) {
                $(`#${timeBlocks[j]}`).removeClass('present');
                $(`#${timeBlocks[j]}`).addClass('past');
            } else {
                $(`#${timeBlocks[j]}`).addClass('past');
            }
        } else if (difference > -60 && difference <= 0) {
            if ($(`#${timeBlocks[j]}`).hasClass('future')) {
                $(`#${timeBlocks[j]}`).removeClass('future');
                $(`#${timeBlocks[j]}`).addClass('present');
            } else {
                $(`#${timeBlocks[j]}`).addClass('present');
            }
        } else {
            $(`#${timeBlocks[j]}`).addClass('future');
        }
    }
    setTimeout(checkBlockHour, 3000);
}

function updateTextBlocks(event) {

    var id =$(event.target).siblings().next().attr('id');

    localStorage.setItem(id, $(`#${id}`).val());
}

function loadBlockData() {

    for (var k = 0; k < timeBlocks.length; k++) {
        $(`#${timeBlocks[k]}`).text(localStorage.getItem(timeBlocks[k]));
    }
}

for (var i = 9; i <= 17; i++) {

    var time = i;
    var timeOfDay = "AM";

    if (i === 12) {
        timeOfDay = "PM";
    } else if (i > 12) {
        time -= 12;
        timeOfDay = "PM";
    }

    $('#time-block-list').append(`<div id="${time}${timeOfDay}-block" class=row my-3>` +
                                 `<div class="col-md-1 text-center hour pt-4">${time}${timeOfDay}</div>` +
                                 `<textarea id="${time}${timeOfDay}-text-block" class="col-md-10"></textarea>` +
                                 `<button id="save-button" class="col-md-1 saveBtn">Save</button></div>`);

    timeBlocks.push(`${time}${timeOfDay}-text-block`);
}

updateTime();
checkBlockHour();
loadBlockData();