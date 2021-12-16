const result = document.querySelector('#result');
const button = document.querySelector('.button');
let myForm = document.getElementById('form');
let formData = new FormData(myForm);

myForm.onsubmit = async (e) => {
  e.preventDefault();
  button.classList.add('is-loading');
  const { name, email, subject, message } = e.target.elements;

  try {
    const data = await axios.post('/api/email', {
      name: name.value,
      email: email.value,
      subject: subject.value,
      message: message.value,
    });
    console.log(data);
    button.classList.remove('is-loading');
    result.innerHTML = `<div class="notification is-success">
    You have successul register your email! Please check your inbox    
  </div>`;
    myForm.reset();
  } catch (error) {
    console.log(error.response);
    result.innerHTML = `<div class="notification is-danger">
    ${error.response.data.body}
  </div>`;
    button.classList.remove('is-loading');
  }
};
