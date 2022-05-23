import axios from 'axios';
import { useState } from 'react';
import { showToast } from '../../../../utils/ToastHelper';
import './RatingReviewForm.css'

const RatingReviewForm = ({ item = null, redactSusess }) => {
    const [rating, setRating] = useState(0);
    const [reviewText, reviewTextSet] = useState('');
    const [reviewTextError, reviewTextErrorSet] = useState('');
    const [loading, loadingSet] = useState(false);

    const hangleReviewText = (event) => {
        reviewTextErrorSet('');
        reviewTextSet(event.target.value);
    }

    const handleSubmitReview = async () => {
        if (!reviewText || !rating) {
            return reviewTextErrorSet('Please provide rating and write something!');
        } else {
            const apiEndPoint = process.env.API_URL || "https://dev.taamid.com/api";

            try {
                loadingSet(true);
                const response = await axios.post(`${apiEndPoint}/create_review/${item}`, { rating, comment: reviewText });

                if ([200, 201].includes(response.status)) {
                    loadingSet(false);
                    showToast("success", "Rating successfully given!");
                    redactSusess()

                }
            } catch (error) {
                loadingSet(false);
                showToast("error", "Rating could not given!");
            }
        }
    };

    return (
        <div className=''>
            <p className='declineText'>Your Review & Rating</p>

            <div className="media-body d-flex justify-content-center align-items-center">
                {[...Array(5)].map((star, index) => {
                    index += 1;
                    return (
                        <button
                            type="buttonForStar"
                            key={index}
                            className={index <= rating ? "on" : "off"}
                            onClick={() => setRating(index)}
                        >
                            <span className="star fs-1">&#9733;</span>
                        </button>
                    );
                })}
            </div>


            <div>
                <textarea
                    className='customReviewBox p-3 fs-6'
                    placeholder='Write your review here....'
                    value={reviewText}
                    onChange={hangleReviewText}
                />
                {reviewTextError && <p className='text-center text-danger ml-1'>{reviewTextError}</p>}
            </div>

            <div className='submitReview'>
                <button
                    className='completeBtn'
                    disabled={loading}
                    onClick={handleSubmitReview}
                >
                    {loading ? "Submitting..." : "Submit"}
                </button>
            </div>
        </div>
    );
};

export default RatingReviewForm;