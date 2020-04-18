const clock = new AlarmClock();

const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
const hoursButton = document.getElementById('hoursButton');
const minutesButton = document.getElementById('minutesButton');
const modeButton = document.getElementById('modeButton');
const clockWrappers = document.querySelectorAll('.wrapper');
const clockAlarmHours = document.getElementById('alarmHours');
const clockAlarmMinutes = document.getElementById('alarmMinutes');

const numToTimeStr = (num) => (num < 10) ? `0${num}` : String(num);

const updateAlarmTime = () => {
  clockAlarmMinutes.innerHTML = numToTimeStr(clock.alarmMinutes);
  clockAlarmHours.innerHTML = numToTimeStr(clock.alarmHours);
}

const updateTime = () => {
  hours.innerHTML = numToTimeStr(clock.hours);
  minutes.innerHTML = numToTimeStr(clock.minutes)
  seconds.innerHTML = numToTimeStr(clock.seconds)
};

const updateClockTime = () => {
  updateAlarmTime();
  updateTime();
};

modeButton.addEventListener('click', () => {
  clock.clickMode();
  console.log(`mode switched to ${clock.currentMode}`);
  clockWrappers.forEach((node) => node.classList.toggle('hide'));
});

hoursButton.addEventListener('click', () => {
  clock.clickH();
  updateClockTime();
});

minutesButton.addEventListener('click', () => {
  clock.clickM();
  updateClockTime();
});

setInterval(() => { 
  //  clock.tick(); // теперь обновляет время внутри класса
  updateClockTime();
}, 1000);


