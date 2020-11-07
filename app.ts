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

function datePickerElement(
  container: HtmlDivElement,
  listOfDates: number[] | string[]
): void {
  let first: HTMLSpanElement;
  let prev: HTMLSpanElement;
  let curr: HTMLSpanElement;
  let next: HTMLSpanElement;
  let last: HTMLSpanElement;

  const classes = ['first', 'previous', 'current', 'next', 'last'];

  listOfDates.forEach((date: string | number) => {
    const span: HTMLSpanElement = document.createElement('span');
    container.appendChild(span);
    span.innerHTML = date.toString();
  });

  curr = container.firstElementChild;
  prev = curr.previousElementSibling || container.lastElementChild;
  first = prev.previousElementSibling || container.lastElementChild;
  next = curr.nextElementSibling || container.firstElementChild;
  last = next.nextElementSibling || container.firstElementChild;

  function addClasses() {
    first.classList.add('first');
    prev.classList.add('previous');
    curr.classList.add('current');
    next.classList.add('next');
    last.classList.add('last');
  }
  addClasses();
  function removeClasses() {
    [first, prev, curr, next, last].map((item) =>
      item.classList.remove(...classes)
    );
  }

  function move(direction?: string) {
    removeClasses();
    if (direction === 'back') {
      [first, prev, curr, next, last] = [
        first.previousElementSibling || container.lastElementChild,
        first,
        prev,
        curr,
        next,
      ];
    } else {
      [first, prev, curr, next, last] = [
        prev,
        curr,
        next,
        last,
        last.nextElementSibling || container.firstElementChild,
      ];
    }
    addClasses();
  }
  function calculateDirection(initial: number, offset: number): number {
    return initial - offset;
  }

  function handleMouseDown(event: MouseEvent): void {
    const startPosition = event.y;
    console.log('mousedown');

    function handleMouseMove(event: MouseEvent) {
      console.log(event.movementY);
      const haveMovedEnough =
        calculateDirection(startPosition, event.y) % 30 === 0;
      if (event.movementY > 0 && haveMovedEnough) {
        move('back');
      }
      if (event.movementY < 0 && haveMovedEnough) {
        move();
      }
    }

    function handleMouseUp() {
      container.removeEventListener('mousemove', handleMouseMove);
      console.log('mousemove REmoved');
    }

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseup', handleMouseUp);
  }

  container.addEventListener('mousedown', handleMouseDown);
}

datePickerElement(dateColumns[0], days);
datePickerElement(dateColumns[1], months);
datePickerElement(dateColumns[2], years);
