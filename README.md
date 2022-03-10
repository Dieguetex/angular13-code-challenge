# Welcome to Angular13-code-challenge 👋

### ✨ [Demo in local](http://localhost:4200/register)

## Description

A simple application that displays a registration page with a form. If the data is filled in, it navigates to the home page. On the home page it receives the id of the post registration sent to the JSON-server and executes a get, receiving all the complete data. It is mobile first and in my point of view, modern.

## Task

### Functional Requirements

- Prepare a simple registration form based on the `@angular/material` UI component library containing following fields:
  - Email (required; proper email form)
  - Username (required; minimum 8 alphanumerical characters)
  - Password (required; minimum 8 characters)
  - Full name (optional)
  - Country (required):
    - Available countries should be loaded from the `/countries` API endpoint
    - Use `flag-icons` package to display country flag alongside the name (it is already part of the `package.json`)
- Make sure that the form meets other requirements:
  - There is a submit button that gets disabled if the form is invalid
  - There is a form reset button that restores the form to the default state
  - There are error messages displayed when field validation fails
  - There are field requirements described as field hints
  - After clicking a submit button:
    - Send a POST request to the `/employees` API endpoint to create a new employee (use the form fields to create an Employee object)
    - Country code should be saved instead of country name as a part of the Employee object
    - Small spinner should be displayed to indicate the process
- After submit user should receive feedback in the next view:
  - Display a newly created user details
  - Show a spinner while loading the data from the GET request to the `/employees` endpoint

### Non-functional Requirements

- Prepare unit tests
- Make sure that `npm test` and `npm run check` pass
- Do not use any new packages, see [package.json](package.json) for the list of available packages

## Development

### Install

```sh
npm i
```

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Build

```sh
npm build
```

Run `npm build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Run tests

```sh
npm test
```

### Check

```sh
npm run check
```

Run `npm run check` to make sure that code meets defined standards.

### Fix

```sh
npm run check
```

Run `npm run fix` to fix some issues reported by the `npm run fix`.

## Author

👤 **Diego Pérez Mansilla**

- Website: <https://www.linkedin.com/in/diego-perez-mansilla/?locale=en_US>
- Github: [@Dieguetex](https://github.com/Dieguetex)
- LinkedIn: [@https:\/\/www.linkedin.com\/in\/diego-perez-mansilla\/?locale=en_US](https://linkedin.com/in/https://www.linkedin.com/in/diego-perez-mansilla/?locale=en_US)
