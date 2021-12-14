const toJson = (data) => data.json();

const $weatherForm = document.querySelector('form');
const $search = document.querySelector('input');
const $message1 = document.querySelector('.message-1');
const $message2 = document.querySelector('.message-2');

$weatherForm.addEventListener('submit', (ev) => {
  ev.preventDefault();
  $message1.textContent = '';
  $message2.textContent = '';

  fetch(`http://localhost:3000/weather?address=${$search.value}`)
    .then(toJson)
    .then((data) => {
      if (data.error) {
        console.log(data.error);
        $message1.textContent = data.error;
      } else {
        console.log(data.location);
        $message1.textContent = data.location;
        $message2.textContent = data.weather.weather_descriptions[0];
        console.log(data.weather);
      }
    });
});
