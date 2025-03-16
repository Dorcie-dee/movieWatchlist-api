import { Router } from "express";
import { addMovie, deleteMovie, getMovies, updateMovieStatus } from "../controllers/movieController.js";
import authMiddleware from "../middlewares/auth.js";

const movieRouter = Router();

movieRouter.post("/", authMiddleware, addMovie);
movieRouter.get("/", authMiddleware, getMovies);
movieRouter.patch("/:id", authMiddleware, updateMovieStatus);
movieRouter.delete("/:id", authMiddleware, deleteMovie);

export default movieRouter;