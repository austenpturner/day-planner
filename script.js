// DOM Elements
const currentDate = document.getElementById('current-date');
const hours = document.getElementsByClassName('hour');
const inputContainer = document.getElementsByClassName('input-container');
const userInput = document.getElementsByClassName('user-input');
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

// Statement to change color of past time inputs and present time input
for (let i = 0; i < hours.length; i++) {
    if (hours[i].textContent !== currentHour) {
        let pastInput = hours[i].nextElementSibling;
        pastInput.classList.add('past-time');
    } else if (hours[i].textContent === currentHour) {
        let presentInput = hours[i].nextElementSibling;
        presentInput.classList.add('present-time');
        break;
    }
}

// Print schedule saved in local storage to screen
renderSchedule();
console.log(eventHours);
console.log(schedule);

// Display save or check icons when user is updating schedule
for (let i = 0; i < userInput.length; i++) {
    let siblingBtn = userInput[i].nextElementSibling;
    let childIcon = siblingBtn.firstElementChild;
    let iconClass = childIcon.getAttribute('class');
    userInput[i].addEventListener('keydown', function() {
        childIcon.className = 'far fa-save fa-lg';
        if (childIcon.className = 'far fa-save fa-lg') {
            siblingBtn.addEventListener('click', function() {
                childIcon.className = 'far fa-check-square fa-lg';
                setTimeout(function() {
                    childIcon.className = '';
                }, 1500);
            })
        }
    })
}

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
        input: plans
    }
    schedule.push(event);
}

function updateEvent() {
    for (let i = 0; i < schedule.length; i++) {
        if (schedule[i].time === hour) {
            schedule[i].input = inputElement.value;
        }
    }
}

function deleteEvent() {
    console.log(eventHours);
    console.log(schedule);
    for (let i = 0; i < eventHours.length; i++) {
        if (eventHours[i] === hour) {
            console.log(hour);
            console.log(eventHours[i]);
            eventHours.splice(eventHours[i], 1);
            console.log(eventHours);
        }
    }
    for (let i = 0; i < schedule.length; i++) {
        if (schedule[i].time === hour) {
            console.log(schedule[i]);
            console.log(schedule[i].time);
            schedule.splice(schedule[i], 1);
            console.log(schedule);
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
    if (JSON.parse(localStorage.getItem('mySchedule') !== null)) {
        let lastSchedule = (JSON.parse(localStorage.getItem('mySchedule')).schedule);
        for (let i = 0; i < lastSchedule.length; i++) {
            hour = lastSchedule[i].time;
            eventHours.push(hour);
            plans = lastSchedule[i].input;
            let event = {
                time: hour,
                input: plans
            }
            schedule.push(event);
        }
        for (let i = 0; i < hours.length; i++) {
            let hourToSet = eventHours.indexOf(hours[i].textContent)
            if (hourToSet > -1) {
                let inputToSet = hours[i].nextElementSibling;
                inputToSet.value = schedule[hourToSet].input;
            }
        }
    }
}