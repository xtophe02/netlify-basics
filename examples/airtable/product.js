const result = document.querySelector('#result');
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

axios
  .get(`/api/airtable?id=${id}`)
  .then(({ data }) => {
    const { name, image, description, price } = data;

    result.innerHTML = `<div class="title is-capitalized">${name}</div>
      
      <div class="columns is-vcentered">
      <div class='column'>
      <figure class="image is-5by4 block">
      <img src=${image} alt=${name}/></figure>
      </div>
      <div class='column'>
      <p class='block has-text-justified'>${description}</p>
      <p class='has-text-weight-bold'>Price: ${price}€</p>
      </div>
    </div>`;
  })

  .catch((error) => {
    result.innerHTML = `<h2 class='title is-4'>Something went wrong</h2>
    <h3 class='subtitle is-6'>${error.response.data}</h3>`;
    console.log(error);
  });
