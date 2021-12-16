const stripe = Stripe(
  'pk_test_51GtG96AMntE4WZQOItfZzP8JjZT36KgKCAtZJfTcFZtL0KYiZ7PN2qGPEkWQLNqrqIpPvfKo3MRl0yozycuI7RhH008iwWBGoZ'
);

// The items the customer wants to buy
const items = [{ id: 'xl-tshirt', price: 2000 }];

let elements;

initialize();
checkStatus();

document
  .querySelector('#payment-form')
  .addEventListener('submit', handleSubmit);

// Fetches a payment intent and captures the client secret
async function initialize() {
  const response = await fetch('/api/stripe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items }),
  });
  const { clientSecret } = await response.json();

  const appearance = {
    theme: 'stripe',
  };
  elements = stripe.elements({ appearance, clientSecret });

  const paymentElement = elements.create('payment');
  paymentElement.mount('#payment-element');
}

async function handleSubmit(e) {
  e.preventDefault();
  setLoading(true);

  const { error } = await stripe.confirmPayment({
    elements,
    confirmParams: {
      // Make sure to change this to your payment completion page
      return_url: window.location.href,
    },
  });

  // This point will only be reached if there is an immediate error when
  // confirming the payment. Otherwise, your customer will be redirected to
  // your `return_url`. For some payment methods like iDEAL, your customer will
  // be redirected to an intermediate site first to authorize the payment, then
  // redirected to the `return_url`.
  if (error.type === 'card_error' || error.type === 'validation_error') {
    showMessage(error.message);
  } else {
    showMessage('An unexpected error occured.');
  }

  setLoading(false);
}

// Fetches the payment intent status after payment submission
async function checkStatus() {
  const clientSecret = new URLSearchParams(window.location.search).get(
    'payment_intent_client_secret'
  );

  if (!clientSecret) {
    return;
  }

  const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);

  switch (paymentIntent.status) {
    case 'succeeded':
      showMessage('Payment succeeded!');
      result.innerHTML = `<div class="notification is-success">
      Payment succeeded!
    </div>`;
      break;
    case 'processing':
      showMessage('Your payment is processing.');
      result.innerHTML = `<div class="notification is-warning">
      Your payment is processing.    
    </div>`;
      break;
    case 'requires_payment_method':
      showMessage('Your payment was not successful, please try again.');
      result.innerHTML = `<div class="notification is-danger">
      Your payment was not successful, please try again.  
    </div>`;
      break;
    default:
      result.innerHTML = `<div class="notification is-danger">
      Something went wrong.   
    </div>`;
      showMessage('Something went wrong.');
      break;
  }
}

// ------- UI helpers -------

function showMessage(messageText) {
  const messageContainer = document.querySelector('#payment-message');

  messageContainer.classList.remove('hidden');
  messageContainer.textContent = messageText;

  setTimeout(function () {
    messageContainer.classList.add('hidden');
    messageText.textContent = '';
  }, 4000);
}

// Show a spinner on payment submission
function setLoading(isLoading) {
  if (isLoading) {
    // Disable the button and show a spinner
    document.querySelector('#submit').disabled = true;
    document.querySelector('#spinner').classList.remove('hidden');
    document.querySelector('#button-text').classList.add('hidden');
  } else {
    document.querySelector('#submit').disabled = false;
    document.querySelector('#spinner').classList.add('hidden');
    document.querySelector('#button-text').classList.remove('hidden');
  }
}