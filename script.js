// Пусть у него имеются три кнопки. H - кнопка для увеличения часа на единицу, M - для увеличения минуты на единицу и кнопка Mode, которая переключает часы в режим настройки будильника. В этом режиме на экране отображается время срабатывания будильника, а кнопки H и M устанавливают не текущее время, а время срабатывания будильника. Повторное нажатие кнопки Mode возвращает часы в обычный режим. Кроме того, затяжное нажатие на кнопку Mode приводит к тому, что будильник активируется. Такое же нажатие ещё раз отключает будильник.

// После этого, если текущее время совпадает со временем будильника, включается звонок, который отключается либо нажатием кнопки Mode, либо самопроизвольно через минуту. Кнопки H и M в режиме звонка (когда сработал будильник) не активны.

// Поведение часов с будильником уже является сложным, поскольку одни и те же входные воздействия (нажатие одних и тех же кнопок) в зависимости от режима инициируют различные действия.

// Подведём итог. У нас есть следующие действия:

// Установка времени
// Установка времени срабатывания будильника
// Включение/Выключение будильника
// Отключение звонка будильника

// При использовании кнопок H и M часы и минуты изменяются независимо, и никак друг на друга не влияют (как и в большинстве реальных будильников). То есть если происходит увеличение минут с 59 до 60 (сброс на 00), то цифра с часами остается неизменной.
// Интерфейсными методами часов являются:

console.info(`
  clickMode() - нажатие на кнопку Mode
  longClickMode() - долгое нажатие на кнопку Mode
  clickH() - нажатие на кнопку H
  clickM() - нажатие на кнопку M
  tick() - при вызове увеличивает время на одну секунду
  isAlarmOn() - показывает включен ли режим будильника
  isAlarmTime() - возвращает true, если время на часах совпадает со временем на будильнике
  minutes - возвращает минуты, установленные на часах
  hours - возвращает часы, установленные на часах
  alarmMinutes - возвращает минуты, установленные на будильнике
  alarmHours - возвращает часы, установленные на будильнике
  currentMode - возвращает текущий режим (alarm | clock | bell)
`);

const modes = {
  bell: 'bell',
  alarm: 'alarm',
  clock: 'clock'
};

const time = new Date();
const currentHours = time.getHours();
const currentMinutes = time.getMinutes();
const currentSeconds = time.getSeconds();

class AlarmClock {
  constructor({ hours = currentHours, minutes = currentMinutes, seconds = currentSeconds } = {}) {
    this.time = {
      clock: { hours, minutes, seconds },
      alarm: { hours: 12, minutes: 0 }
    };
    this.mode = modes.clock;
    this.alarmMode = false;
    this.tickIntervalId = setInterval(() => this.tick(), 1000);
  }

  set hours(num) {
    this.time.clock.hours = num;
  }

  set minutes(num) {
    this.time.clock.minutes = num;
  }

  set seconds(num) {
    this.time.clock.seconds = num;
  }

  set alarmHours(num) {
    this.time.alarm.hours = num;
  }

  set alarmMinutes(num) {
    this.time.alarm.minutes = num;
  }

  get hours() {
    return this.time.clock.hours;
  }

  get minutes() {
    return this.time.clock.minutes;
  }

  get seconds() {
    return this.time.clock.seconds;
  }

  get alarmHours() {
    return this.time.alarm.hours;
  }

  get alarmMinutes() {
    return this.time.alarm.minutes;
  }

  get currentMode() {
    return this.mode;
  }

  isAlarmTime() {
    const { clock, alarm } = this.time;
    return clock.hours === alarm.hours && clock.minutes === alarm.minutes;
  }

  isAlarmOn() {
    return this.alarmMode;
  }

  tick() {
    const { clock, alarm } = this.time;
    if (this.mode === modes.bell && !this.isAlarmTime()) this.mode = modes.clock;
    clock.seconds = (clock.seconds + 1) % 60;
    if (clock.seconds === 0) {
      clock.minutes = (clock.minutes + 1) % 60;
      if (clock.minutes === 0) clock.hours = (clock.hours + 1) % 24;
    }
    if (this.isAlarmTime() && this.alarmMode) this.mode = modes.bell;
  }

  clickM() {
    if (this.mode !== modes.bell) {
      const time = this.time[this.mode];
      time.minutes = (time.minutes + 1) % 60;
    }
  }

  clickH() {
    if (this.mode !== modes.bell) {
      const time = this.time[this.mode];
      time.hours = (time.hours + 1) % 24;
    }
  }

  clickMode() {
    if (this.mode === modes.clock) {
      this.mode = modes.alarm;
    } else {
      this.mode = modes.clock;
    }
  }

  longClickMode() {
    this.alarmMode = !this.alarmMode;
  }
}

