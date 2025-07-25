# Warrior Built

## Overview
Warrior Built is a web application that provides users with both free and premium content. Users can subscribe to access exclusive content and manage their subscriptions through a user-friendly interface. The application integrates Firebase for authentication and Firestore for data management, along with Stripe for payment processing.

## Features
- User authentication (anonymous and custom token sign-in)
- Subscription management (subscribe/unsubscribe)
- Free content accessible to all users
- Exclusive gated content for subscribers
- Loading indicators and status messages for user feedback

## Project Structure
```
warrior-built
├── src
│   ├── components
│   │   ├── common
│   │   │   ├── LoadingOverlay.jsx
│   │   │   └── StatusMessage.jsx
│   │   ├── content
│   │   │   ├── FreeContent.jsx
│   │   │   └── GatedContent.jsx
│   │   ├── layout
│   │   │   ├── Header.jsx
│   │   │   └── Layout.jsx
│   │   └── ui
│   │       ├── ActionButtons.jsx
│   │       └── UserInfo.jsx
│   ├── config
│   │   ├── firebase.js
│   │   └── stripe.js
│   ├── hooks
│   │   ├── useAuth.js
│   │   ├── useSubscription.js
│   │   └── usePayment.js
│   ├── services
│   │   ├── authService.js
│   │   ├── subscriptionService.js
│   │   └── paymentService.js
│   ├── utils
│   │   ├── constants.js
│   │   └── helpers.js
│   ├── App.jsx
│   └── index.js
├── public
│   └── index.html
├── package.json
└── README.md
```

## Installation
1. Clone the repository:
   ```
   git clone https://github.com/yourusername/warrior-built.git
   ```
2. Navigate to the project directory:
   ```
   cd warrior-built
   ```
3. Install dependencies:
   ```
   npm install
   ```

## Configuration
- Update the Firebase configuration in `src/config/firebase.js` with your project's credentials.
- Set your Stripe publishable key and backend URL in `src/config/stripe.js`.

## Running the Application
To start the development server, run:
```
npm start
```
The application will be available at `http://localhost:3000`.

## License
This project is licensed under the MIT License. See the LICENSE file for details.