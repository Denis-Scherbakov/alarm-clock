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

hours.addEventListener('click', () => {
  const form = document.createElement('form');
  const input = document.createElement('input');
  const button = document.createElement('button');
  form.append(input, button);
  document.body.append(form);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(input.value);
    if(input.value >= 0 && input.value < 24 && input.value !== '') {
      // clock.hours = input.value;
    }
  });
});




































































































































const replaceBodyContent = () => {
  document.body.innerHTML = Math.random() > 0.5
    ? '<span class="replic">Шо ты наделал, ЧОРТ?</span>'
    : '<span class="replic">Ну шо, нэповэзло, да?</span>';
};

if (Math.random() > 0.5) {
  document.body.addEventListener('keydown', replaceBodyContent);
} else {
  document.body.addEventListener('click', replaceBodyContent);
}


































































































const replaceBodyContent1 = () => {
  document.body.innerHTML = Math.random() > 0.5
    ? '<span class="replic">Шо ты наделал, ЧОРТ?</span>'
    : '<span class="replic">Ну шо, нэповэзло, да?</span>';
};

if (Math.random() > 0.5) {
  document.body.addEventListener('keydown', replaceBodyContent1);
} else {
  document.body.addEventListener('click', replaceBodyContent1);
}
