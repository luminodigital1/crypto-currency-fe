# Cryptocurrency Data Display

A cryptocurrency data display application built with Next.js, React, and Chart.js. This application connects to a WebSocket server to fetch real-time cryptocurrency prices and displays them in both a table and a line graph.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)

## Features

- Real-time updates of cryptocurrency prices using WebSocket.
- Interactive line graph displaying the percentage change in prices.
- A responsive table that lists various cryptocurrencies with their current and previous prices.
- Dropdown menu to display graph of selected currency.

## Technologies Used

- **Next.js**: For server-side rendering and routing and building user interfaces.
- **Chart.js**: For rendering graphs.
- **MUI (Material-UI)**: For styling and UI components.
- **Socket.IO**: For real-time communication.

## Installation

To get started with this project, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/luminodigital1/crypto-currency-fe.git
   cd crypto-currency-fe
   ```

2. **Install dependencies:**

   Make sure you have Node.js installed. Then run:

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory of the project and copy environmental variables from `env.example.js`

4. **Run the application:**

   Start the development server:

   ```bash
   npm run dev
   ```

   Navigate to `http://localhost:3005` in your browser to view the application.

## Usage

- Select a cryptocurrency from the dropdown menu to get data of selected currency on graph.
- View real-time updates in both the graph and table formats.
