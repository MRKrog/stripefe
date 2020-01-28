import React from 'react';
import logo from './logo.svg';
import './App.css';
import { StripeProvider } from 'react-stripe-elements';
import MyStoreCheckout from './MyStoreCheckout';

function App() {
  return (
    <div className="App">
      <StripeProvider apiKey="pk_test_rhig9CatNKj275zMOhM2itvO00OxLvgAK7" >
        <MyStoreCheckout />
      </StripeProvider>
    </div>
  );
}

export default App;
