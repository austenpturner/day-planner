// DOM Elements
const currentDate = document.getElementById('current-date');
const hours = document.getElementsByClassName('hour');
const inputContainer = document.getElementsByClassName('input-container');
const input = document.getElementsByClassName('user-input');
const saveBtns = document.getElementsByClassName('save-button');

// Schedule variables
let date = moment().format('dddd, MMMM Do YYYY');
let currentHour = moment().format('ha');
let inputElement;
let hourElement;
let hour;
let savedPlans;
let eventHours = [];
let schedule = [];

// Statement to display current day and date
currentDate.textContent = `Today is ${date}`;

// Statement to change color of present and past hour slots
for (let i = 0; i < hours.length; i++) {
    if (hours[i].textContent === currentHour) {
        let presentInput = hours[i].nextElementSibling;
        presentInput.classList.add('present-time');
        
        let parentLi = hours[i].parentElement;
        let prevLi = parentLi.previousElementSibling;
        let prevHour = prevLi.firstElementChild;
        let prevInput = prevHour.nextElementSibling;
        prevInput.classList.add('past-time');
    } 
}

// Event listener for save buttons
for (let i = 0; i < saveBtns.length; i++) {
    saveBtns[i].addEventListener('click', function() {
        inputElement = saveBtns[i].previousElementSibling;
        savedPlans = inputElement.value;
        hourElement = inputElement.previousElementSibling;
        hour = hourElement.textContent;
    
        if (inputElement.value === '' && eventHours.indexOf(hour) > -1) {
            deleteEvent();
           
        } else if (inputElement.value !== '' && eventHours.indexOf(hour) === -1) {
            saveEvent();

        } else if (inputElement.value !== '' && eventHours.indexOf(hour) > -1) {
            updateEvent();
        }
    })  
}

// Function for updating calendar
function saveEvent() {
    eventHours.push(hour);
    let event = {
        time: hour,
        plans: savedPlans
    }
    schedule.push(event);
}
function updateEvent() {
    for (let i = 0; i < schedule.length; i++) {
        if (schedule[i].time === hour) {
            schedule[i].plans = inputElement.value;
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
