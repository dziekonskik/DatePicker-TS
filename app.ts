const days: number[] = Array.from({ length: 31 }, (item, index) => index + 1);
const years: number[] = Array.from(
  { length: 41 },
  (item, index) => 2000 + index
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

let currentDay: number = 0;

function reflectState(
  element: HTMLDivElement,
  calendarUnit: string[] | number[]
): void {
  const [first, previous, current, next, last] = element.children;
  const ifCurrentIsBegginingIamBeforetheEndOrTwoUnitsBehindCurrent: string = `${
    currentDay === 0
      ? calendarUnit[calendarUnit.length - 2]
      : currentDay === 1
      ? calendarUnit[calendarUnit.length - 1]
      : calendarUnit[currentDay - 2]
  }`;
  const ifCurrentIsFirstIamLastOrOneBehindCurrent: string = `${
    currentDay === 0
      ? calendarUnit[calendarUnit.length - 1]
      : calendarUnit[currentDay - 1]
  }`;
  const ifCurrentIsLastIAmFirstOrOneBeforeCurrent: string = `${
    currentDay === calendarUnit.length - 1
      ? calendarUnit[0]
      : calendarUnit[currentDay + 1]
  }`;
  const ifCurrentIsLastIamSecondOrTwoUnitsAheadOfCurrent: string = `${
    currentDay === calendarUnit.length - 1
      ? calendarUnit[1]
      : currentDay === calendarUnit.length - 2
      ? calendarUnit[0]
      : calendarUnit[currentDay + 2]
  }`;

  first.innerHTML = ifCurrentIsBegginingIamBeforetheEndOrTwoUnitsBehindCurrent;
  previous.innerHTML = ifCurrentIsFirstIamLastOrOneBehindCurrent;
  current.innerHTML = `${calendarUnit[currentDay]}`;
  next.innerHTML = ifCurrentIsLastIAmFirstOrOneBeforeCurrent;
  last.innerHTML = ifCurrentIsLastIamSecondOrTwoUnitsAheadOfCurrent;
}

console.log(dateColumns);

const buttonInc = document.querySelector('.increment');
const buttonDec = document.querySelector('.decrement');

buttonInc?.addEventListener('click', (e) => {
  currentDay = currentDay >= years.length - 1 ? 0 : currentDay + 1;
  reflectState(dateColumns[2], years);
});

buttonDec?.addEventListener('click', (e) => {
  currentDay = currentDay <= 0 ? years.length - 1 : currentDay - 1;
  reflectState(dateColumns[2], years);
});
