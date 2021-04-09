// array to store ID's of text areas once they are generated
var timeBlocks = [];
// reference times in an array on creation of time blocks; if more time blocks are needed, need to 
// make sure the correct times are also updated here
var timeBlockTimes = ["09:00:00","10:00:00","11:00:00","12:00:00","13:00:00","14:00:00","15:00:00","16:00:00","17:00:00"];
var beginningTime = 9; // beginning time variable 
var endingTime = 17; // requires military time for functionality (i.e. 17 for 5pm)

// function which uses the moment API and jQuery to display time in the header
function updateTime() {
    // formats and updates the current time
    $('#currentDay').text(moment().format('h:mm:ss a on MMMM Do, YYYY'))
    // timeout to update the function every seconds
    setTimeout(updateTime, 1000);
}

// function for updating the background color on the text area based on if the time block
// represents the past, future, or present
function checkBlockHour() {

    // for loop to check all the blocks and update background colors on the text area
    for (var j = 0; j < timeBlocks.length; j++) {

        // gets the difference in minutes from the block's displayed time to the current time
        // via momentJS
        var difference = moment(`${timeBlockTimes[j]}`, 'HH:mm:ss').diff(moment(), 'minute');
        // if the difference is -60 or greater, the time is in the past
        if (difference <= -60) {
            // conditionals to make sure only one class type to set background color is applied
            if ($(`#${timeBlocks[j]}`).hasClass('present')) {
                $(`#${timeBlocks[j]}`).removeClass('present');
                $(`#${timeBlocks[j]}`).addClass('past');
            //
            } else {
                $(`#${timeBlocks[j]}`).addClass('past');
            }
        // if the time is from -59 to 0 in minutes, that is the current working hour
        } else if (difference > -60 && difference <= 0) {
            // conditionals to make sure only one class type to set background color is applied
            if ($(`#${timeBlocks[j]}`).hasClass('future')) {
                $(`#${timeBlocks[j]}`).removeClass('future');
                $(`#${timeBlocks[j]}`).addClass('present');
            } else {
                $(`#${timeBlocks[j]}`).addClass('present');
            }
        // future background coloring if time is greater than 0
        } else {
            $(`#${timeBlocks[j]}`).addClass('future');
        }
    }
    // set timeout to call this function every 3 seconds
    setTimeout(checkBlockHour, 3000);
}

// saves text area data to local storage based on a save button click
function updateTextBlocks(event) {
    // gathers the text area id to make it a key for the local storage
    var id =$(event.target).siblings().next().attr('id');
    // writes to local storage using the id from the text area as the key and adds the
    // data in the text area as the value to the key
    localStorage.setItem(id, $(`#${id}`).val());
}
// event delegated listener; targets the parent container of the dynamically created
// time blocks to listen for save button clicks
$('#time-block-list').on('click', '#save-button', updateTextBlocks);

// function that checks local storage for any saved block date on load
function loadBlockData() {
    // loops through text block id's and gathers values from local storage and puts 
    // data into the appropriate block
    for (var k = 0; k < timeBlocks.length; k++) {
        $(`#${timeBlocks[k]}`).text(localStorage.getItem(timeBlocks[k]));
    }
}

// initialization loop which builds the time blocks dynamically, starts from the beginning
// time to the ending time of the work day 
for (var i = beginningTime; i <= endingTime; i++) {
    // checks to see if adjustments need to be made for time blocks to list as non-military
    // time
    var time = i;
    var timeOfDay = "AM";
    // adjusts AM/PM and time after 12pm
    if (i === 12) {
        timeOfDay = "PM";
    } else if (i > 12) {
        time -= 12;
        timeOfDay = "PM";
    }
    // builds the time block dynamically
    $('#time-block-list').append(`<div id="${time}${timeOfDay}-block" class=row my-3>` +
                                 `<div class="col-md-1 text-center hour pt-4">${time}${timeOfDay}</div>` +
                                 `<textarea id="${time}${timeOfDay}-text-block" class="col-md-10"></textarea>` +
                                 `<button id="save-button" class="col-md-1 saveBtn">Save</button></div>`);
    // adds the ID of the text area for future processing into the time block array
    timeBlocks.push(`${time}${timeOfDay}-text-block`);
}
// starts the clock in the header
updateTime();
// starts the checking of the current time to time block to adjust background color to the
// text area
checkBlockHour();
// loads any local storage save data to the web app
loadBlockData();