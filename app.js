'use strict';
const days = Array.from({ length: 31 }, (item, index) => index + 1);
const years = Array.from({ length: 41 }, (item, index) => 2000 + index);
const months = [
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
const dateColumns = document.querySelectorAll('.datepicker__column');
function datePickerElement(container, listOfDates) {
  let first;
  let prev;
  let curr;
  let next;
  let last;
  let actionDB = [];
  const classes = ['first', 'previous', 'current', 'next', 'last'];
  listOfDates.forEach((date) => {
    const span = document.createElement('span');
    container.appendChild(span);
    span.innerHTML = date;
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
  function move(direction) {
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
  function calculateDirection() {
    return actionDB.reduce((mousedown, mouseup) => mousedown - mouseup);
  }
  function handleMouseDown(event) {
    actionDB.length = 0;
    actionDB.unshift(event.clientY);
  }
  function handleMouseUp(event) {
    actionDB.unshift(event.clientY);
    if (calculateDirection() > 0) {
      move('back');
    } else {
      move();
    }
  }
  container.addEventListener('mousedown', handleMouseDown);
  container.addEventListener('mouseup', handleMouseUp);
}
datePickerElement(dateColumns[0], days);
datePickerElement(dateColumns[1], months);
datePickerElement(dateColumns[2], years);
