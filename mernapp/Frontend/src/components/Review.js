import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './Modal'; 
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Review = ({ itemId }) => {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [showModal, setShowModal] = useState(false); 
  const [thankYouMsg, setThankYouMsg] = useState(''); 

  useEffect(() => {
    axios.get(`/api/reviews/${itemId}`)
      .then(response => setReviews(response.data))
      .catch(error => console.error('Error fetching reviews:', error));
  }, [itemId]);

  const submitReview = () => {
    const newReview = { rating, comment, itemId };
    axios.post('/api/reviews', newReview)
      .then(response => {
        setReviews([...reviews, response.data]);
        setRating(0);
        setComment('');
        setThankYouMsg('Thanks for the review!');
        setTimeout(() => {
          setThankYouMsg('');
          setShowModal(false);
        }, 3000);
      })
      .catch(error => console.error('Error submitting review:', error));
      toast.success("Thanks for your review!");
  };

  const handleRating = (rate) => {
    setRating(rate);
  };

  return (
    <React.Fragment >
      <Button
        style={{ float:"right" }}
        onClick={() => setShowModal(true)}
      >
        Reviews
      </Button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div>
            <ul>
              {reviews.map(review => (
                <li key={review._id}>
                  <strong>Rating: {Array(review.rating).fill('★').join('')}</strong>
                  <p>{review.comment}</p>
                </li>
              ))}
            </ul>
            <div>
              <div>
                {[1, 2, 3, 4, 5].map(star => (
                  <span
                    key={star}
                    onClick={() => handleRating(star)}
                    style={{ cursor: 'pointer', color: star <= rating ? 'gold' : 'gray' }}
                  >
                    ★
                  </span>
                ))}
              </div>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Comment"
              ></textarea>
              <button onClick={submitReview}>Submit Review</button>
              {thankYouMsg && <p>{thankYouMsg}</p>}
            </div>
            <ToastContainer />
          </div>
        </Modal>
      )}
    </React.Fragment>
  );
};

export default Review;
