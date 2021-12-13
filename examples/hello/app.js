const result = document.querySelector('#result');

result.textContent = 'Loading...';

axios
  .get('/api/hello')
  .then(({ data }) => {
    setTimeout(() => {
      result.textContent = data.message;
    }, 5000);
  })
  .catch((error) => console.log(error));

// fetch('/api/hello', {
//   method: 'GET', // *GET, POST, PUT, DELETE, etc.
//   mode: 'no-cors', // no-cors, *cors, same-origin
//   // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//   credentials: 'same-origin', // include, *same-origin, omit
//   headers: {
//     'Content-Type': 'application/json',
//     // 'Content-Type': 'application/x-www-form-urlencoded',
//   },
//   // redirect: 'follow', // manual, *follow, error
//   // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//   // body: JSON.stringify(data) // body data type must match "Content-Type" header
// })
//   .then((data) => data.json())
//   .then((data) => {
//     result.textContent = data.message;
//   })
//   .catch((error) => {
//     console.error('Error:', error);
//   });
