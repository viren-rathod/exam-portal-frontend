# Exam Portal Front-End

This is the front-end application for an exam portal built using Angular and PrimeNG. It provides a user interface for managing exams, questions, and student results.

## Features

- Login and authentication system.
- Admin dashboard for managing exams, questions, and students.
- Student dashboard for taking exams and viewing results.
- CRUD operations for exams and questions.
- Interactive user interfaces using PrimeNG components.

## Prerequisites

- Node.js (v18.16.0 or higher)
- Angular CLI (v16.1.0 or higher)

## Installation

1. Clone the repository:

```shell
git clone https://github.com/viren-rathod/exam-portal-frontend.git
cd exam-portal-frontend
```

2. Install the dependencies:

```shell
npm install
```

## Configuration

1. Open the `src/environments/environment.ts` file and update the API endpoint URL:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://127.0.0.1:8080/api' 
};
```

2. If necessary, update other configuration parameters in the `environment.ts` file.

## Development Server

To run the development server, use the following command:

```shell
ng serve
```

The application will be served at `http://localhost:4200/`.

## Build

To build the application for production, use the following command:

```shell
ng build --prod
```

The build artifacts will be stored in the `dist/` directory.

## Deployment

Deploy the generated `dist/` directory to your web server or hosting platform of choice.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvement, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgements

- [Angular](https://angular.io/)
- [PrimeNG](https://www.primefaces.org/primeng/)

## Contact

For any questions or inquiries, please contact [viren.rathod.2023@gmail.com](mailto:viren.rathod.2023@gmail.com).

---