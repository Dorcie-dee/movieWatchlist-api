// movie-watchlist/
// │── index.js
// │── models/
// │   ├── user.js
// │   ├── movie.js
// │── routes/
// │   ├── auth.js  <-- (Routes for authentication)
// │   ├── movies.js  <-- (Routes for movie operations)
// │── controllers/
// │   ├── authController.js  <-- (Handles register & login logic)
// │   ├── movieController.js  <-- (Handles movie CRUD logic)
// │── middleware/
// │   ├── auth.js  <-- (Middleware for connection)
// │── package.json
// │── .env


import express from "express"
import mongoose from "mongoose";
import authRouter from "./routes/auth.js";
import movieRouter from "./routes/movies.js";
import cors from "cors"

const app = express();

//database connection
await mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('Database connected');
}).catch((error) => {
  console.log(error)
})

//middleware
app.use(cors());
app.use(express.json());

//routes
app.use("/api/auth", authRouter);
app.use("/api/movies", movieRouter);


const PORT = process.env.PORT || 6002
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
