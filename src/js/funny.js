const box = document.querySelector('#box');
const yes = document.querySelector('#yes');
const no = document.querySelector('#no');
const question = document.querySelector('#question');

const boxVol = box.getBoundingClientRect();
const noVol = no.getBoundingClientRect();

yes.addEventListener('click', () => {answer.innerHTML = 'I love you too 😘'});


no.addEventListener('mouseover', () => {
    answer.innerHTML = '';
    const i = Math.floor(Math.random() * (boxVol.width - noVol.width)) + 1;
    const j = Math.floor(Math.random() * (boxVol.height - noVol.height)) + 1;
    
    no.style.left = i + 'px';
    no.style.top = j + 'px';
});
