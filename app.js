"use strict";
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
    const availableClasses = [
        'first',
        'previous',
        'current',
        'next',
        'last',
    ];
    listOfDates.forEach((date) => {
        const span = document.createElement('span');
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
        [first, prev, curr, next, last].map((item) => item.classList.remove(...availableClasses));
    }
    function move(direction) {
        removeClasses();
        if (direction === '') {
            [first, prev, curr, next, last] = [
                first.previousElementSibling || container.lastElementChild,
                first,
                prev,
                curr,
                next,
            ];
        }
        else {
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
    function calculateDirection(initial, offset) {
        return initial - offset;
    }
    function handleMouseDown(event) {
        const startPosition = event.y;
        const indicatorManager = (mode) => {
            const indicator = document.createElement('div');
            indicator.className = '';
            indicator.classList.add('indicator');
            indicator.style.top = `${event.clientY + indicator.offsetHeight / 2}px`;
            indicator.style.left = `${event.clientX - indicator.offsetWidth / 2}px`;
        };
        indicatorManager('create');
        function handleMouseMove(event) {
            const haveMovedEnough = calculateDirection(startPosition, event.y) % 20 === 0;
            if (event.movementY > 0 && haveMovedEnough) {
                move('');
            }
            if (event.movementY < 0 && haveMovedEnough) {
                move();
            }
        }
        function handleMouseUp() {
            container.removeEventListener('mousemove', handleMouseMove);
            console.log('indicator');
        }
        container.addEventListener('mouseup', handleMouseUp);
        container.addEventListener('mousemove', handleMouseMove);
    }
    container.addEventListener('wheel', (e) => {
        e.deltaY > 0 ? move('') : move();
    });
    container.addEventListener('mousedown', handleMouseDown);
}
datePickerElement(dateColumns[0], days);
datePickerElement(dateColumns[1], months);
datePickerElement(dateColumns[2], years);
