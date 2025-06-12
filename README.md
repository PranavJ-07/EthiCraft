# EthiCraft Student Registration

A modern student registration portal built with **React** (frontend) and **Spring Boot** (backend).

## Features

- Student registration form with validation
- Add, update, delete, and view student records
- RESTful API integration
- Responsive, modern UI (Tailwind CSS)
- Payment QR code for registration fee

## Tech Stack

- **Frontend:** React, Tailwind CSS, Axios
- **Backend:** Spring Boot (API endpoints)
- **Other:** React Icons

## Getting Started

### Prerequisites

- Node.js & npm
- Java & Spring Boot (for backend)
- Git

### Setup

#### 1. Clone the repository

```sh
git clone https://github.com/Neerajkharde/EthiCraft.git
cd EthiCraft
```

#### 2. Install frontend dependencies

```sh
npm install
```

#### 3. Start the React app

```sh
npm start
```

The app runs at [http://localhost:3000](http://localhost:3000).

#### 4. Start the backend

Make sure your Spring Boot server is running at `http://localhost:8080`.

## Project Structure

```
src/
  components/
    Register.js      # Main registration form
  service/
    api.js           # API calls to backend
```

## API Endpoints

- `GET    /students`           - Get all students
- `GET    /student/{rollNo}`   - Get student by roll number
- `POST   /student`            - Add new student
- `PUT    /student`            - Update student
- `DELETE /student/{rollNo}`   - Delete student

## Customization

- **Logo:** Replace `favicon.ico` in `public/` or `src/` as needed.
- **QR Code:** Update the QR code image URL in `Register.js` for your payment link.

## License

MIT

---

*Built with ❤️ for EthiCraft*