(() => {
  console.log("AlarmClock");
  console.log("\nSTART ---> should have default values");
  const clock = new AlarmClock();
  console.log(clock.minutes(), 0);
  console.log(clock.hours(), 12);
  console.log(clock.alarmHours(), 6);
  console.log(clock.alarmMinutes(), 0);
  console.log("END ---> should have default values");
})();

(() => {
  console.log('\nSTART ---> should change state when click to mode');
  const clock = new AlarmClock();
  console.log(clock.isAlarmOn(), false);
  console.log(clock.getCurrentMode(), 'clock');

  clock.clickMode();
  clock.tick();
  console.log(clock.isAlarmOn(), false);
  console.log(clock.getCurrentMode(), 'alarm');

  clock.clickMode();
  clock.tick();
  console.log(clock.isAlarmOn(), false);
  console.log(clock.getCurrentMode(), 'clock');

  clock.longClickMode();
  clock.tick();
  console.log(clock.isAlarmOn(), true);
  console.log(clock.getCurrentMode(), 'clock');

  clock.clickMode();
  clock.tick();
  console.log(clock.isAlarmOn(), true);
  console.log(clock.getCurrentMode(), 'alarm');

  clock.clickMode();
  clock.tick();
  console.log(clock.isAlarmOn(), true);
  console.log(clock.getCurrentMode(), 'clock');

  clock.longClickMode();
  console.log(clock.isAlarmOn(), false);
  console.log(clock.getCurrentMode(), 'clock');
  console.log('END ---> should change state when click to mode');
})();

(() => {
  console.log('\nSTART ---> should change hours and minutes');
  const clock = new AlarmClock();
  clock.clickH();
  console.log(clock.minutes(), 0);
  console.log(clock.hours(), 13);
  console.log(clock.alarmHours(), 6);
  console.log(clock.alarmMinutes(), 0);

  clock.clickM();
  console.log(clock.minutes(), 1);
  console.log(clock.hours(), 13);
  console.log(clock.alarmHours(), 6);
  console.log(clock.alarmMinutes(), 0);

  clock.clickMode();

  clock.clickH();
  console.log(clock.minutes(), 1);
  console.log(clock.hours(), 13);
  console.log(clock.alarmHours(), 7);
  console.log(clock.alarmMinutes(), 0);

  clock.clickM();
  console.log(clock.minutes(), 1);
  console.log(clock.hours(), 13);
  console.log(clock.alarmHours(), 7);
  console.log(clock.alarmMinutes(), 1);

  for (let i = 0; i < 60; i += 1) {
    clock.clickM();
  }
  console.log(clock.alarmMinutes(), 1);
  console.log(clock.alarmHours(), 7);

  for (let i = 0; i < 17; i += 1) {
    clock.clickH();
  }
  console.log(clock.alarmHours(), 0);
  console.log('END ---> should change hours and minutes');
})();

(() => {
  console.log('\nSTART ---> should not start bell if alarm off');
  const clock = new AlarmClock();

  for (let i = 0; i < 18 * 60; i += 1) {
    clock.tick();
  }

  console.log(clock.isAlarmTime(), true);
  console.log(clock.getCurrentMode(), 'clock');
  clock.clickM();
  clock.clickH();

  clock.tick();
  console.log(clock.getCurrentMode(), 'clock');
  console.log('END ---> should not start bell if alarm off');
})();

(() => {
  console.log('\nSTART ---> should start bell if alarm on 1');
  const clock = new AlarmClock();
  clock.longClickMode();

  for (let i = 0; i < 18 * 60; i += 1) {
    clock.tick();
  }

  console.log(clock.isAlarmTime(), true);
  console.log(clock.getCurrentMode(), 'bell');
  clock.clickM();
  clock.clickH();

  clock.tick();
  console.log(clock.getCurrentMode(), 'clock');
  console.log('END ---> should start bell if alarm on 1');
})();

(() => {
  console.log('\nSTART ---> should start bell if alarm on 2');
  const clock = new AlarmClock();
  clock.longClickMode();

  for (let i = 0; i < 18 * 60; i += 1) {
    clock.tick();
  }
  console.log(clock.isAlarmTime(), true);
  console.log(clock.getCurrentMode(), 'bell');

  clock.clickMode();
  console.log(clock.getCurrentMode(), 'clock');
  console.log('END ---> should start bell if alarm on 2');
})();

(() => {
  console.log('\nSTART ---> should start bell if state is Alarm');
  const clock = new AlarmClock();
  clock.longClickMode();
  clock.clickMode();
  console.log(clock.getCurrentMode(), 'alarm');

  for (let i = 0; i < 18 * 60; i += 1) {
    clock.tick();
  }
  console.log(clock.isAlarmOn(), true);
  console.log(clock.isAlarmTime(), true);
  console.log(clock.getCurrentMode(), 'bell');

  clock.clickMode();
  console.log(clock.getCurrentMode(), 'clock');
  console.log('END ---> should start bell if state is Alarm');
})();
