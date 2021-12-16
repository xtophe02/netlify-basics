const result = document.querySelector('#result');
const form = document.getElementById('form');
const input = document.getElementById('input');
const button = document.querySelector('.button');

form.addEventListener('submit', logSubmit);
input.addEventListener('input', logInput);

let city = '';

function logInput(event) {
  city = event.target.value;
}
async function logSubmit(event) {
  event.preventDefault();
  button.classList.add('is-loading');
  if (city.trim() === '') {
    button.classList.remove('is-loading');
    alert('field cannot be empty');

    return;
  }
  input.value = '';
  try {
    const { data } = await axios.post('/api/weather', {
      city,
    });

    button.classList.remove('is-loading');
    const { coord, name, main, sys, weather } = data;
    result.innerHTML = `<h2 class='title is-3 mt-3'>${name}</h2>
    <nav class="level">
    <div class="level-item">
      <div>
        <p class="heading">Coordinates</p>
        <p class="title is-5">
       
          <span class='icon'>
            <i class="fas fa-map-pin"></i>
          </span>
     
       ${coord.lon} lon.</p>
        <p class="title is-5">
      
          <span class='icon'>
            <i class="fas fa-map-pin"></i>
          </span>
      
        ${coord.lat} lat.</p>
      </div>
    </div>
    <div class="level-item ">
      <div>
        <p class="heading">Temperature Celcius</p>
        <p class="title is-5"><span class='icon'><i class="fas fa-thermometer-half"></i></i></span> ${
          main.temp
        }</p>
        <p class="title is-5"><span class='icon'><i class="fas fa-temperature-low"></i></i></i></span> ${
          main.feels_like
        } feeling</p>
      </div>
    </div>
    <div class="level-item">
      <div>
        <p class="heading">Day Light</p>
        <p class="title is-5"><span class='icon'><i class="fas fa-sun"></i></span> ${new Date(
          sys.sunrise * 1000
        ).getHours()}h${new Date(sys.sunrise * 1000).getMinutes()}m</p>
        <p class="title is-5"><span class='icon'><i class="fas fa-moon"></i></span> ${new Date(
          sys.sunset * 1000
        ).getHours()}h${new Date(sys.sunset * 1000).getMinutes()}m</p>
      </div>
    </div>
    <div class="level-item">
      <div>
        <p class="heading">Weather</p>
        <p class="title is-5"><span class='icon'><i class="fas fa-cloud-sun"></i></span> ${
          weather[0].main
        }</p>
        <p class="title is-5"><span class='icon'><i class="fas fa-cloud-sun"></i></i></span> ${
          weather[0].description
        }</p>
       
      </div>
    </div>
  </nav>`;
  } catch (error) {
    result.innerHTML = `<h2 class='title is-4'>Something went wrong</h2>
    <h3 class='subtitle is-6'>City not found</h3>`;
    button.classList.remove('is-loading');
  }
}
