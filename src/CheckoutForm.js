import React from 'react';
import { injectStripe } from 'react-stripe-elements';

import CardSection from './CardSection';

class CheckoutForm extends React.Component {


  handleSubmit = async (ev) => {
    // We don't want to let default form submission happen here, which would refresh the page.
    ev.preventDefault();

    const cardElement = this.props.elements.getElement('card');

    const paymentMethod = await this.props.stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: {
        email: 'jenny4.rosen@example.com',
      },
    });
    console.log('paymentMethod', paymentMethod);
    console.log('id', paymentMethod.paymentMethod.id);
    console.log('email', paymentMethod.paymentMethod.billing_details.email);

    try {
      const response = await fetch('http://localhost:4242/create-customer', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: `${paymentMethod.paymentMethod.billing_details.email}`,
          payment_method: `${paymentMethod.paymentMethod.id}`
        })
      });
      const customer = await response.json();
      console.log('customer', customer);
      // The customer has been created
    } catch (error) {
      console.log('error', error);
      // Handle error from server if customer wasn't created
    }

  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <CardSection />
        <button>Confirm order</button>
      </form>
    );
  }
}

export default injectStripe(CheckoutForm);
