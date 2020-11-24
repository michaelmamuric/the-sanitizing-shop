# The Sanitizing Shop

This is an e-commerce app that I built using React.js. Due to the [2019-2020 COVID-19 pandemic](https://en.wikipedia.org/wiki/COVID-19_pandemic), products such as Hand Sanitizer, Wet Wipes, and Face Masks have been in high demand, so I thought I would "open" my "own" Sanitizing Shop.

It is deployed on Heroku, at https://the-sanitizing-shop.herokuapp.com/.

The corresponding backend of the app is also hosted on Heroku. Its corresponding Github repository can be found here: https://github.com/michaelmamuric/the-sanitizing-shop-backend

Some of the technologies and websites I used for this project:
* [Redux](https://redux.js.org/) for state management.
* [Redux Persist](https://www.npmjs.com/package/redux-persist) to persist Redux state in local storage.
* [Firebase](https://firebase.google.com/) for user authentication.
* [Material UI](https://material-ui.com/) to easily create React UI components.
* [Free Logo Design](https://www.freelogodesign.org/) to design the logo of my "own shop"
* [Day.js](https://day.js.org/) for dates formatting
* [Numeral.js](http://numeraljs.com/) for number formatting
* [validator.js](https://www.npmjs.com/package/validator) for form validation

## Notes

### Login Details
To test the app, please use the following credentials:
* E-mail address: test@test.com
* Password: Testp@ss

### Credit Card Payment
This app features a credit card payment page. **Please note that no credit card payment will actually be processed, nor any credit card data will be stored in the server**.
Please enter the following credit card details when prompted:
* Card Number: 4242424242424242
* Expiry Date: Any date in the future
* Security Code: Any valid whole number (non-decimal)
