
const clock = new AlarmClock();

const clocks = document.getElementById('clocks');
const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
const hoursButton = document.getElementById('hoursButton');
const minutesButton = document.getElementById('minutesButton');
const modeButton = document.getElementById('modeButton');
const clockWrappers = document.querySelectorAll('.wrapper');
const clockAlarmHours = document.getElementById('alarmHours');
const clockAlarmMinutes = document.getElementById('alarmMinutes');
// const form = document.querySelector('form');

const numToTimeStr = (num) => (num < 10) ? `0${num}` : String(num);

const updateAlarmTime = () => {
  clockAlarmMinutes.innerHTML = numToTimeStr(clock.alarmMinutes);
  clockAlarmHours.innerHTML = numToTimeStr(clock.alarmHours);
}

const updateTime = () => {
  hours.innerHTML = numToTimeStr(clock.hours);
  minutes.innerHTML = numToTimeStr(clock.minutes);
  seconds.innerHTML = numToTimeStr(clock.seconds);
};

const updateClockTime = () => {
  updateAlarmTime();
  updateTime();
};

// switch alram, on / off
let btnPressStart;
const timeout = 1000;

modeButton.addEventListener('mousedown', () => {
  btnPressStart = Date.now();
});

modeButton.addEventListener('mouseup', () => {
  const timePressed =  Date.now() - btnPressStart;
  if (timePressed < timeout) {
    clock.clickMode();
    console.log(`mode switched to ${clock.currentMode}`);
    clockWrappers.forEach((node) => node.classList.toggle('hide'));
  } else {
    clock.longClickMode();
    console.log(`alarm is ${clock.isAlarmOn() ? 'on' : 'off' }`);
    clocks.classList.toggle('alarm--on');
  }
});  

// handle click H
hoursButton.addEventListener('click', () => {
  clock.clickH();
  updateClockTime();
});

// handle click M
minutesButton.addEventListener('click', () => {
  clock.clickM();
  updateClockTime();
});

const clockBell = () => {
  const isContainsBell = clocks.classList.contains('bell');
  if (!isContainsBell && clock.currentMode === modes.bell) {
    clocks.classList.add('bell');
  }
  if (isContainsBell && clock.currentMode !== modes.bell) {
    clocks.classList.remove('bell');
  }
};

const createForm = () => {
  const form = document.createElement('form');
  const input = document.createElement('input');
  const button = document.createElement('button');
  form.append(input, button);
  form.classList.add('form');
  form.querySelector('button').innerHTML = 'Apply'
  return { form, input, button };
};

// console.log(document.getElementsByClassName('form'));

hours.addEventListener('click', () => {
  const { form, input, button } = createForm();
  input.classList.add('inputHours');
  button.classList.add('input-button-hours');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(input.value);
    if (input.value >= 0 && input.value < 24 && input.value !== '') {
      clock.hours = Number(input.value); 
    }
    form.remove();
  });
  document.body.append(form);
  form.querySelector('input').focus();
  form.querySelector('input').setAttribute('value', clock.hours);
});

minutes.addEventListener('click', () => {
  const { form, input } = createForm();
  input.classList.add('inputMinutes');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(input.value);
    if (input.value >= 0 && input.value < 60 && input.value !== '') {
      clock.minutes = Number(input.value);
      
    }
    form.remove();
  });
  document.body.append(form);
  form.querySelector('input').focus();
  form.querySelector('input').setAttribute('value', clock.minutes);
});


setInterval(updateClockTime, 1000);








