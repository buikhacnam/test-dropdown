# Test Dropdown

## Pre-requisites

- Node.js verion 18 or higher

## Installation

1. Clone the repository
2. Install the dependencies

```bash
yarn install
```

3. Add .env file and update the values

```bash
cp .env.example .env
```

4. Start the application

```bash
yarn dev
```

5. Open the browser and navigate to [http://localhost:3000](http://localhost:3000)

## End to end test

### Prerequisites

- local server running on port 3000

### Test cases

View the test cases in the `cypress/e2e` folder

### Running the tests

- To run the tests and view the test runner

```bash
yarn cypress:open
```

then select `E2E testing` in the UI

- To run the tests in headless mode

```bash
yarn cypress:e2e
```