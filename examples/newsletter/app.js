const result = document.querySelector('#result');
const form = document.getElementById('form');
const input = document.getElementById('input');
const button = document.querySelector('.button');

form.addEventListener('submit', logSubmit);
input.addEventListener('input', logInput);

let email = '';

function logInput(event) {
  email = event.target.value;
}

async function logSubmit(event) {
  event.preventDefault();
  button.classList.add('is-loading');
  if (email.trim() === '') {
    button.classList.remove('is-loading');
    alert('field cannot be empty');

    return;
  }
  input.value = '';
  try {
    const { data } = await axios.post('/api/newsletter', {
      email,
    });
    console.log(data);
    button.classList.remove('is-loading');

    result.innerHTML = `<div class="notification is-success">
    You have successul register your email! Please check your inbox    
  </div>`;
  } catch (error) {
    result.innerHTML = `<div class="notification is-danger">
    ${error.response.data[0] || error.response.data.email[0]}   
  </div>`;
    button.classList.remove('is-loading');
  }
}
