// @flow

export const formDate = (dateI: Date) => {
  const date = new Date(dateI);
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let minutesfinal = '' + minutes;
  let hoursfinal = '' + hours;
  if (minutes < 10) {
    minutesfinal = '0' + minutes;
  }
  if (hours < 10) {
    hoursfinal = '0' + hours;
  }
  return (
    date.getDay() + '/' + (date.getMonth() + 1) + '-' + date.getFullYear() + '  ' + hoursfinal + ':' + minutesfinal
  );
};
