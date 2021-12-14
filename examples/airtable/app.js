const result = document.querySelector('#result');

axios
  .get('/api/airtable')
  .then(({ data }) => {
    let cards = '';
    data.forEach(
      (el) =>
        (cards += `<div class='column is-one-third'>
        <a href="product.html?id=${el.id}">
    <div class='card'>
      <div class='card-image'>
        <figure class='image is-4by3'>
          <img src=${el.image} alt='Placeholder image' />
        </figure>
      </div>
      <div class="card-content">
      <div class="level">
        <div class="level-left is-capitalized">
          ${el.name}
        </div>
        <div class="level-right has-text-weight-bold">
          ${el.price}€
        </div>
      </div>
    </div>
      </div></a>
    </div>`)
    );

    result.innerHTML = `<div class='columns is-multiline'>${cards}</div>`;
  })

  .catch((error) => {
    result.innerHTML = `<h2 class='title is-4'>Something went wrong</h2>
    <h3 class='subtitle is-6'>${error.response.data}</h3>`;
    console.log(error);
  });
