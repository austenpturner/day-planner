// DOM Elements
const currentDate = document.getElementById('current-date');
const hours = document.getElementsByClassName('hour');
const inputContainer = document.getElementsByClassName('input-container');
const input = document.getElementsByClassName('user-input');
const saveBtns = document.getElementsByClassName('save-button');

// Schedule variables
let day = moment().format('dddd');
let date = moment().format('MMMM Do YYYY');
let currentHour = moment().format('ha');
let inputElement;
let hourElement;
let hour;
let plans;
let eventHours = [];
let schedule = [];

// Statement to display current day and date
currentDate.textContent = `Today is ${day}, ${date}`;

// Statement to change color of present and past hour slots
for (let i = 0; i < hours.length; i++) {
    if (hours[i].textContent === currentHour) {
        let presentInput = hours[i].nextElementSibling;
        presentInput.classList.add('present-time');
        // TO DO: give all previous inputs class of past-time...
        if (i !== 0) {
            let parentLi = hours[i].parentElement;
            let prevLi = parentLi.previousElementSibling;
            let prevHour = prevLi.firstElementChild;
            let prevInput = prevHour.nextElementSibling;
            prevInput.classList.add('past-time');
        }
    } 
}

// Print schedule saved in local storage to screen
renderSchedule();

// Event listener for save buttons
for (let i = 0; i < saveBtns.length; i++) {
    saveBtns[i].addEventListener('click', function() {
        inputElement = saveBtns[i].previousElementSibling;
        plans = inputElement.value;
        hourElement = inputElement.previousElementSibling;
        hour = hourElement.textContent;
    
        if (inputElement.value === '' && eventHours.indexOf(hour) > -1) {
            deleteEvent();
            saveSchedule();
           
        } else if (inputElement.value !== '' && eventHours.indexOf(hour) === -1) {
            saveEvent();
            saveSchedule();

        } else if (inputElement.value !== '' && eventHours.indexOf(hour) > -1) {
            updateEvent();
            saveSchedule();
        }
    })  
}

// Functions for updating calendar
function saveEvent() {
    eventHours.push(hour);
    let event = {
        time: hour,
        myPlans: plans
    }
    schedule.push(event);
}

function updateEvent() {
    for (let i = 0; i < schedule.length; i++) {
        if (schedule[i].time === hour) {
            schedule[i].myPlans = inputElement.value;
        }
    }
}

function deleteEvent() {
    for (let i = 0; i < eventHours.length; i++) {
        if (eventHours[i] === hour) {
            eventHours.splice(eventHours[i], 1);
        }
    }
    for (let i = 0; i < schedule.length; i++) {
        if (schedule[i].time === hour) {
            schedule.splice(schedule[i], 1);
        }
    }
}

function saveSchedule() {
    let savedSchedule = {
        'date': date,
        'schedule': schedule
    };
    localStorage.setItem('mySchedule', JSON.stringify(savedSchedule));
}

function renderSchedule() {
    let lastSchedule = (JSON.parse(localStorage.getItem('mySchedule')).schedule);
    for (let i = 0; i < lastSchedule.length; i++) {
        hour = lastSchedule[i].time;
        eventHours.push(hour);
        plans = lastSchedule[i].myPlans;
        let event = {
            time: hour,
            myPlans: plans
        }
        schedule.push(event);
    }
    for (let i = 0; i < hours.length; i++) {
        let hourToSet = eventHours.indexOf(hours[i].textContent)
        if (hourToSet > -1) {
            let inputToSet = hours[i].nextElementSibling;
            inputToSet.value = schedule[hourToSet].myPlans;
        }
    }
}