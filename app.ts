const days: number[] = Array.from({ length: 31 }, (item, index) => index + 1);
const years: number[] = Array.from(
  { length: 40 },
  (item, index) => 2001 + index
);
const months: string[] = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const dateColumns: NodeListOf<HTMLDivElement> = document.querySelectorAll(
  '.datepicker__column'
);

const [first, previous, current, next, last] = dateColumns[0].children;

let currentDay: number = 0;

function reflectState(): void {
  first.innerHTML = `${
    currentDay === 0
      ? days[days.length - 2]
      : currentDay === 1
      ? days[days.length - 1]
      : days[currentDay - 2]
  }`;
  previous.innerHTML = `${
    currentDay === 0 ? days[days.length - 1] : days[currentDay - 1]
  }`;

  current.innerHTML = `${days[currentDay]}`;
  next.innerHTML = `${
    currentDay === days.length - 1 ? days[0] : days[currentDay + 1]
  }`;
  last.innerHTML = `${
    currentDay === days.length - 1 ? days[1] : days[currentDay + 2]
  }`;
}

console.log(dateColumns);

const buttonInc = document.querySelector('.increment');
const buttonDec = document.querySelector('.decrement');

buttonInc?.addEventListener('click', (e) => {
  currentDay = currentDay >= days.length - 1 ? 0 : currentDay + 1;
  console.log('akak');
  console.log(currentDay);
  reflectState();
});

buttonDec?.addEventListener('click', (e) => {
  currentDay = currentDay <= 0 ? days.length - 1 : currentDay - 1;
  console.log('akassk');
  console.log(currentDay);
  reflectState();
});
