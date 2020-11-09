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

const datePickerContainer = document.querySelector('.datepicker');

function createElement(elementType: string, classes: string): HTMLElement {
  const element = document.createElement(elementType);
  element.className = `${classes}`;
  return element;
}

function datePicker(containerElement: HTMLElement) {
  if (containerElement === null) {
    throw new Error('please prodide container element');
  }

  let dayColumn = createElement(
    'div',
    'datepicker__column datepicker__column--day'
  );
  let monthColumn = createElement(
    'div',
    'datepicker__column datepicker__column--month'
  );
  let yearColumn = createElement(
    'div',
    'datepicker__column datepicker__column--year'
  );

  const availableClasses: string[] = [
    'pre',
    'before',
    'first',
    'previous',
    'current',
    'next',
    'last',
    'after',
    'pra',
  ];
  function generateColumnChildElements(classNames: string[]): HTMLElement[] {
    return classNames.map((className) => createElement('span', `${className}`));
  }
  const [pre, before, first, prev, curr, next, last, after, pra] = [
    ...generateColumnChildElements(availableClasses),
  ];

  const childElements = [
    pre,
    before,
    first,
    prev,
    curr,
    next,
    last,
    after,
    pra,
  ];

  const arrayOfDayChildElements = [
    ...generateColumnChildElements(availableClasses),
  ];
  const arrayOfMonthChildElements = [
    ...generateColumnChildElements(availableClasses),
  ];
  const arrayOfYearChildElements = [
    ...generateColumnChildElements(availableClasses),
  ];

  function fillColumnWithChildren(
    column: HTMLElement,
    children: HTMLElement[]
  ) {
    const container = column;
    const childrenToAppend = [...children];
    childrenToAppend.map((element) => container.appendChild(element));
    return container;
  }

  dayColumn = fillColumnWithChildren(dayColumn, arrayOfMonthChildElements);
  monthColumn = fillColumnWithChildren(monthColumn, arrayOfYearChildElements);
  yearColumn = fillColumnWithChildren(yearColumn, arrayOfDayChildElements);

  [dayColumn, monthColumn, yearColumn].map((column) =>
    containerElement.appendChild(column)
  );
}

datePicker(datePickerContainer);

// function datePickerElement(
//   container: HtmlDivElement,
//   listOfDates: number[] | string[]
// ): void {
//   let pre: HTMLSpanElement;
//   let before: HTMLSpanElement;
//   let first: HTMLSpanElement;
//   let prev: HTMLSpanElement;
//   let curr: HTMLSpanElement;
//   let next: HTMLSpanElement;
//   let last: HTMLSpanElement;
//   let after: HTMLSpanElement;
//   let pra: HTMLSpanElement;

//   const availableClasses: string[] = [
//     'pre',
//     'before',
//     'first',
//     'previous',
//     'current',
//     'next',
//     'last',
//     'after',
//     'pra',
//   ];

//   listOfDates.forEach((date: string | number) => {
//     const span: HTMLSpanElement = document.createElement('span');
//     container.appendChild(span);
//     span.innerHTML = date.toString();
//   });

//   curr = container.firstElementChild;
//   prev = curr.previousElementSibling || container.lastElementChild;
//   first = prev.previousElementSibling || container.lastElementChild;
//   before = first.previousElementSibling || container.lastElementChild;
//   pre = before.previousElementSibling || container.lastElementChild;
//   next = curr.nextElementSibling || container.firstElementChild;
//   last = next.nextElementSibling || container.firstElementChild;
//   after = last.nextElementSibling || container.firstElementChild;
//   pra = after.nextElementSibling || container.firstElementChild;

//   function addClasses(): void {
//     pre.classList.add('pre');
//     before.classList.add('before');
//     first.classList.add('first');
//     prev.classList.add('previous');
//     curr.classList.add('current');
//     next.classList.add('next');
//     last.classList.add('last');
//     after.classList.add('after');
//     pra.classList.add('pra');
//   }
//   addClasses();
//   function removeClasses(): void {
//     [pre, before, first, prev, curr, next, last, after, pra].map((item) =>
//       item.classList.remove(...availableClasses)
//     );
//   }

//   function move(direction?: string): void {
//     removeClasses();
//     if (direction === 'down') {
//       [pre, before, first, prev, curr, next, last, after, pra] = [
//         pre.previousElementSibling || container.lastElementChild,
//         pre,
//         before,
//         first,
//         prev,
//         curr,
//         next,
//         last,
//         after,
//       ];
//     } else {
//       [pre, before, first, prev, curr, next, last, after, pra] = [
//         before,
//         first,
//         prev,
//         curr,
//         next,
//         last,
//         after,
//         pra,
//         pra.nextElementSibling || container.firstElementChild,
//       ];
//     }
//     addClasses();
//   }
//   function calculateDirection(initial: number, offset: number): number {
//     return initial - offset;
//   }

//   const indicatorManager = (
//     positionX: number,
//     positionY: number
//   ): HTMLDivElement => {
//     const indicator = document.createElement('div');
//     indicator.className = '';
//     indicator.style.top = `${positionY - indicator.offsetHeight / 2}px`;
//     indicator.style.left = `${positionX - indicator.offsetWidth / 2}px`;
//     indicator.classList.add('indicator');
//     document.body.appendChild(indicator);
//     indicator.onmouseup = () => indicator.remove();
//     return indicator;
//   };

//   function moveElement(
//     element: HTMLElement,
//     positionX: number,
//     positionY: number
//   ): void {
//     element.style.top = `${positionY}px`;
//     element.style.left = `${positionX}px`;
//   }

//   function handleMouseDown(event: MouseEvent): void {
//     const startPosition = event.y;

//     let indicator = indicatorManager(event.clientX, event.clientY);

//     function handleMouseMove(event: MouseEvent) {
//       const haveMovedEnough =
//         calculateDirection(startPosition, event.y) % 20 === 0;

//       if (event.movementY > 0 && haveMovedEnough) {
//         move('down');
//       }
//       if (event.movementY < 0 && haveMovedEnough) {
//         move();
//       }

//       moveElement(indicator, event.clientX, event.clientY);
//     }

//     function handleMouseUp() {
//       container.removeEventListener('mousemove', handleMouseMove);
//       indicator.remove();
//     }

//     container.addEventListener('mouseup', handleMouseUp);
//     container.addEventListener('mousemove', handleMouseMove);
//   }
//   container.addEventListener('wheel', (e: WheelEvent) => {
//     e.deltaY > 0 ? move('down') : move();
//   });
//   container.addEventListener('mousedown', handleMouseDown);
// }

// datePickerElement(dateColumns[0], days);
// datePickerElement(dateColumns[1], months);
// datePickerElement(dateColumns[2], years);
