const result = document.querySelector('#result');

const fetchData = async () => {
  try {
    const { data } = await axios.get('/api/survey');

    let htmlString = '';
    // console.log(data);
    data.map(
      (pilot) =>
        (htmlString += `
    <article class="media box">
  <figure class="media-left">
    <p class="image is-96x96">
      <img src=${pilot.image}>
    </p>
  </figure>
  <div class="media-content">
    <div class="content">
      <div>
        <h3 class='title is-4 is-capitalized'>${pilot.pilots}</h3>
        <p >
          <span class="icon-text ">
            <span class="icon has-text-danger">
            <i class="fas fa-lg fa-poll"></i>
            
            </span>
            <span >votes</span>
          </span>
          <small class='${pilot.id}' data-votes='${pilot.votes}'>${pilot.votes}</small>
        </p> 
      </div>
    </div>

  </div>
  <div class="media-right">
  <a class='button is-info is-light' id=${pilot.id} >
    <span class='icon'>
    <i class="fas fa-2x fa-vote-yea" ></i>
    </span></a>
  </div>
</article>
    `)
    );

    result.innerHTML = htmlString;
  } catch (error) {
    result.innerHTML = `<h2 class='title is-4'>Something went wrong</h2>
    <h3 class='subtitle is-6'>${error.response}</h3>`;
    console.log(error);
  }
};

const modifyData = async (id, votes) => {
  const button = document.getElementById(id);
  button.classList.add('is-loading');
  try {
    const { data } = await axios.put(`/api/survey`, {
      id,
      votes,
    });
    button.classList.remove('is-loading');
    return data.votes;
  } catch (error) {
    console.log(error.response.data);
    return null;
  }
  // return Number(votes) + 1;
};

window.addEventListener('load', async () => {
  await fetchData();
  const buttonListeners = document.querySelectorAll('.button');

  buttonListeners.forEach((doc) =>
    doc.addEventListener('click', async function (e) {
      const voteNode = document.querySelector(
        `.${e.target.parentElement.parentElement.id}`
      );
      const vote = voteNode.dataset.votes;
      const newVotes = await modifyData(
        e.target.parentElement.parentElement.id,
        vote
      );
      if (newVotes) {
        voteNode.textContent = newVotes;
        voteNode.dataset.votes = newVotes;
      }
    })
  );
});

// document.addEventListener("click", function(){
//   document.getElementById("demo").innerHTML = "Hello World";
// });
