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
    let pre;
    let before;
    let first;
    let prev;
    let curr;
    let next;
    let last;
    let after;
    let pra;
    const availableClasses = [
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
    listOfDates.forEach((date) => {
        const span = document.createElement('span');
        container.appendChild(span);
        span.innerHTML = date.toString();
    });
    curr = container.firstElementChild;
    prev = curr.previousElementSibling || container.lastElementChild;
    first = prev.previousElementSibling || container.lastElementChild;
    before = first.previousElementSibling || container.lastElementChild;
    pre = before.previousElementSibling || container.lastElementChild;
    next = curr.nextElementSibling || container.firstElementChild;
    last = next.nextElementSibling || container.firstElementChild;
    after = last.nextElementSibling || container.firstElementChild;
    pra = after.nextElementSibling || container.firstElementChild;
    function addClasses() {
        pre.classList.add('pre');
        before.classList.add('before');
        first.classList.add('first');
        prev.classList.add('previous');
        curr.classList.add('current');
        next.classList.add('next');
        last.classList.add('last');
        after.classList.add('after');
        pra.classList.add('pra');
    }
    addClasses();
    function removeClasses() {
        [pre, before, first, prev, curr, next, last, after, pra].map((item) => item.classList.remove(...availableClasses));
    }
    function move(direction) {
        removeClasses();
        if (direction === 'down') {
            [pre, before, first, prev, curr, next, last, after, pra] = [
                pre.previousElementSibling || container.lastElementChild,
                pre,
                before,
                first,
                prev,
                curr,
                next,
                last,
                after,
            ];
        }
        else {
            [pre, before, first, prev, curr, next, last, after, pra] = [
                before,
                first,
                prev,
                curr,
                next,
                last,
                after,
                pra,
                pra.nextElementSibling || container.firstElementChild,
            ];
        }
        addClasses();
    }
    function calculateDirection(initial, offset) {
        return initial - offset;
    }
    const indicatorManager = (positionX, positionY) => {
        const indicator = document.createElement('div');
        indicator.className = '';
        indicator.style.top = `${positionY - indicator.offsetHeight / 2}px`;
        indicator.style.left = `${positionX - indicator.offsetWidth / 2}px`;
        indicator.classList.add('indicator');
        document.body.appendChild(indicator);
        indicator.onmouseup = () => indicator.remove();
        return indicator;
    };
    function moveElement(element, positionX, positionY) {
        element.style.top = `${positionY}px`;
        element.style.left = `${positionX}px`;
    }
    function handleMouseDown(event) {
        const startPosition = event.y;
        let indicator = indicatorManager(event.clientX, event.clientY);
        function handleMouseMove(event) {
            const haveMovedEnough = calculateDirection(startPosition, event.y) % 20 === 0;
            if (event.movementY > 0 && haveMovedEnough) {
                move('down');
            }
            if (event.movementY < 0 && haveMovedEnough) {
                move();
            }
            moveElement(indicator, event.clientX, event.clientY);
        }
        function handleMouseUp() {
            container.removeEventListener('mousemove', handleMouseMove);
            indicator.remove();
        }
        container.addEventListener('mouseup', handleMouseUp);
        container.addEventListener('mousemove', handleMouseMove);
    }
    container.addEventListener('wheel', (e) => {
        e.deltaY > 0 ? move('down') : move();
    });
    container.addEventListener('mousedown', handleMouseDown);
}
datePickerElement(dateColumns[0], days);
datePickerElement(dateColumns[1], months);
datePickerElement(dateColumns[2], years);
