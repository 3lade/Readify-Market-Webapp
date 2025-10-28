const Review = require('../models/review');

const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find({})
      .populate('user', 'username email mobileNumber')
      .populate('book', 'title price');
    
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id)
      .populate('user', 'username email mobileNumber')
      .populate('book', 'title price');
    
    if (!review) {
      return res.status(404).json({ message: `Cannot find any review with ID ${req.params.id}` });
    }
    
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getReviewsByUserId = async (req, res) => {
  try {
    const reviews = await Review.find({ user: req.params.userId })
      .populate('user', 'username email mobileNumber')
      .populate('book', 'title price');
    
    if (!reviews || reviews.length === 0) {
      return res.status(404).json({ message: 'No reviews found for this user' });
    }
    
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getReviewsByBookId = async (req, res) => {
  try {
    const reviews = await Review.find({ book: req.params.bookId })
      .populate('user', 'username email mobileNumber')
      .populate('book', 'title price');
    
    if (!reviews || reviews.length === 0) {
      return res.status(404).json({ message: 'No reviews found for this book' });
    }
    
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addReview = async (req, res) => {
  try {
    const { userId, bookId, rating, comment } = req.body;
    
    const reviewData = {
      reviewText: comment,
      rating: rating,
      user: userId,
      book: bookId
    };
    
    const review = await Review.create(reviewData);
    res.status(201).json({ message: 'Review Added Successfully', review });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!review) {
      return res.status(404).json({ message: `Cannot find any review with ID ${req.params.id}` });
    }
    res.status(200).json({ message: 'Review Updated Successfully', review });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
      return res.status(404).json({ message: `Cannot find any review with ID ${req.params.id}` });
    }
    res.status(200).json({ message: 'Review Deleted Successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllReviews,
  getReviewById,
  getReviewsByUserId,
  getReviewsByBookId,
  addReview,
  updateReview,
  deleteReview
};