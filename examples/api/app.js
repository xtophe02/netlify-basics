const result = document.querySelector('#result');

axios
  .get('/api/basic-api')
  .then(({ data }) => {
    let cards = '';
    data.forEach(
      (el) =>
        (cards += `<div class='column is-one-third'>
    <div class='card'>
      <div class='card-image'>
        <figure class='image is-4by3'>
          <img src=${el.urls.small} alt='Placeholder image' />
        </figure>
      </div>
    </div>
    </div>`)
    );

    result.innerHTML = `<div class='columns is-multiline'>${cards}</div>`;
  })

  .catch((error) => {
    result.innerHTML = `<h2 class='title is-4'>Something went wrong</h2>
    <h3 class='subtitle is-6'>${error.response.data}</h3>`;
    console.log(error);
  });
