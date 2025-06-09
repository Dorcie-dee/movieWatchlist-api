import { MovieModel } from "../models/movie.js";

import { addMovieValidator } from "../validators/movie.js";


export const addMovie = async (req, res) => {
  try {
    const userId = req.user.userId; //extract userId from JWT 
    const { error, value } = addMovieValidator.validate({
      ...req.body,
      userId, //attach userId automatically
      image: req.file?.filename // ensures image is optional
    }, { abortEarly: false });

    if (error) {
      return res.status(422).json(error);
    }

    const existingMovie = await MovieModel.findOne({ userId, title: value.title });

    if (existingMovie) {
      return res.status(400).json({ message: 'You have already added this movie.' });
    }

    const result = await MovieModel.create(value)
    res.status(201).json(result);
  } catch (error) {
    res.status(409).json({ message: "Something went wrong" });
  }
};


//get all movies for a user
export const getMovies = async (req, res) => {
  try {
    const userId = req.user.userId
    const movies = await MovieModel.find({ userId });

    res.json(movies);
  } catch (error) {
    res.status(409).json({ message: "Something went wrong" });
  }
};


//Mark a movie as watched or not watched

export const updateMovieStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId; // from JWT middleware
    const { status} = req.body;
    
    // Optional: Validate status only if provided
    if (status && !["watched", "not watched"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    // Find the movie
    const existingMovie = await MovieModel.findById(id);
    
    if (!existingMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    // Check if this movie belongs to the logged-in user
    if (existingMovie.userId.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Unauthorized: You can only update your own movies" });
    }

    // Update only the fields provided
    if (status) existingMovie.status = status;
    
    await existingMovie.save();
    
    res.json({ message: "Movie status updated", existingMovie });
  } catch (error) {
    console.error("Error updating movie status:", error);
    res.status(409).json({ message: "Something went wrong" });
  }
};



//remove a movie from the watchlist
export const deleteMovie = async (req, res) => {
  try {
    await MovieModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Movie removed successfully" });
  } catch (error) {
    res.status(409).json({ message: "Something went wrong" });
  }
};































































































// export const updateMovieStatus = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { status } = req.body;

//     //ensures the provided status is valid
//     if (!["watched", "not watched"].includes(status)) {
//       return res.status(400).json({ message: "Invalid status value" });
//     }

//     //find and update the movie
//     const updatedMovie = await MovieModel.findByIdAndUpdate(id,
//       { title, status },
//       { new: true } // ensures the response returns the updated movie
//     );

//     if (!updatedMovie) {
//       return res.status(404).json({ message: "Movie not found" });
//     }

//     res.json({ message: "Movie status updated", movie: updatedMovie });
//   } catch (error) {
//     console.error("Error updating movie status:", error);
//     res.status(409).json({ message: "Something went wrong" });
//   }
// // };