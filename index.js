const quoteDisplay = document.querySelector('#body');
const btn = document.querySelector('#btn');
const usersList = document.querySelector('.users');

let assignedBefore = [];
if (!localStorage.getItem('users')) localStorage.setItem('users', '[]');

let counter = 0;
let randomNumber;

document.querySelector('form').addEventListener('submit', e => {
  e.preventDefault();
  const storage = JSON.parse(localStorage.getItem('users'));
  const newUser = {
    name: e.target.children[0].value,
    ttl: false
  };
  const updatedStorage = [...storage, newUser];
  localStorage.setItem('users', JSON.stringify(updatedStorage));
  while (usersList.hasChildNodes()) usersList.firstChild.remove();
  updatedStorage.forEach(user => {
    usersList.insertAdjacentHTML('beforeend', `<li class="user">${user.name}</li>`);
  });
});

window.addEventListener('load', () => {
  let storage = JSON.parse(localStorage.getItem('users'));
  storage.forEach(user => {
    usersList.insertAdjacentHTML('beforeend', `<li class="user">${user.name}</li>`);
  });
  storage.forEach(user => {
    if (user.ttl) {
      quoteDisplay.innerHTML = `Current TTL: ${user.name}`;
    }
  });
});

let teamList = JSON.parse(localStorage.getItem('users'));

function trackUsed() {
  counter += 1;
  if (counter === teamList.length) {
    assignedBefore = [];
    counter = 0;
    quoteDisplay.innerHTML = teamList[randomNumber];
  }
}

function getAssignedUser() {
  randomNumber = Math.floor(Math.random() * teamList.length);
  if (assignedBefore.indexOf(randomNumber) === -1) {
    assignedBefore.push(randomNumber);
    trackUsed();
    quoteDisplay.innerHTML = teamList[randomNumber].name.toUpperCase();
  } else {
    while (assignedBefore.indexOf(randomNumber) > -1) {
      randomNumber = Math.floor(Math.random() * teamList.length);
    }
    assignedBefore.push(randomNumber);
    trackUsed();
    quoteDisplay.innerHTML = teamList[randomNumber].name.toUpperCase();
  }
}

btn.addEventListener('click', () => getAssignedUser());
