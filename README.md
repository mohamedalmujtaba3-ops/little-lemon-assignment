# Little Lemon Table Booking

A React web app for the Little Lemon restaurant. Visitors can read about the restaurant and reserve a table online.

## Features

- Home page with a hero section and weekly specials.
- Booking page with a validated reservation form: date, time, number of diners and occasion.
- Available times update when the date changes.
- Confirmation page with a reservation summary.
- Responsive layout that works from small phones to wide desktops.
- Accessible markup: landmarks, skip link, labelled fields, error messages linked to fields, visible focus and reduced motion support.
- Unit tests for the form, the available times logic and the routes.

## Requirements

- Node.js 18 or newer
- npm 9 or newer

## Setup

1. Clone the repository.
2. Install the dependencies:

```
npm install
```

3. Start the development server:

```
npm start
```

The app opens at http://localhost:3000.

## Scripts

| Command | Description |
| --- | --- |
| `npm start` | Runs the app in development mode. |
| `npm test` | Runs the unit tests in watch mode. |
| `npm run build` | Creates a production build in the `build` folder. |

To run the tests once without watch mode:

```
CI=true npm test
```

On Windows PowerShell:

```
$env:CI="true"; npm test
```

## Project structure

```
src/
  api.js                  Simulated API for available times and form submission
  App.js                  Routes, available times state and form submission
  App.css, index.css      Styles
  components/
    Header.js, Nav.js, Footer.js
    Home.js
    BookingPage.js
    BookingForm.js          Booking form and validation
    ConfirmedBooking.js
  utils/
    dates.js                Date helpers
    times.js                initializeTimes and updateTimes reducer
```

## Validation rules

- Date: required and cannot be in the past.
- Time: required and must be one of the available times for the chosen date.
- Number of diners: required, a whole number from 1 to 10.
- The submit button stays disabled until the form is valid.
- If a date has no free tables, the form explains it and asks for another date.
- If the submission fails, an alert message is shown and the user can try again.
- Opening the confirmation page without a reservation shows a helpful message.
- Unknown addresses show a "Page not found" message.

## Accessibility

- Semantic elements: `header`, `nav`, `main`, `section`, `article`, `footer`, `address`.
- Every field has a visible `label`.
- Invalid fields use `aria-invalid` and `aria-describedby` to point to the error message.
- Messages use `aria-live` or `role="alert"` so screen readers announce them.
- A skip link lets keyboard users jump to the main content.
- Colors keep strong contrast and focus outlines are always visible.

## Version control

Commit the project to a Git repository:

```
git init
git add .
git commit -m "Add Little Lemon table booking app"
git branch -M main
git remote add origin <your-repository-url>
git push -u origin main
```
