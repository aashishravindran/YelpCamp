# YelpCamp

YelpCamp is a full-stack web application that allows users to view, create, and review campgrounds. Users can register, log in, add new campgrounds, comment on them, and more.

## Features
- User authentication (register, login, logout)
- Add, edit, and delete campgrounds
- Comment on campgrounds
- Responsive design

## Technologies Used
- Node.js
- Express.js
- MongoDB & Mongoose
- EJS templating
- Passport.js (authentication)
- Bootstrap (styling)

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/YelpCamp.git
   cd YelpCamp
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start MongoDB (if running locally):
   ```bash
   mongod
   ```
4. Seed the database (optional):
   ```bash
   node seeds.js
   ```
5. Start the application:
   ```bash
   node app.js
   ```
6. Visit `http://localhost:3000` in your browser.

## Folder Structure
- `models/` - Mongoose models (campgrounds, comments, users)
- `routes/` - Express route handlers
- `views/` - EJS templates
- `public/` - Static assets (CSS)
- `middleware/` - Custom middleware

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](LICENSE) 