'use client';

import { useEffect, useState } from 'react';
import { StarIcon as OutlineStar } from '@heroicons/react/24/outline';
import { StarIcon as SolidStar } from '@heroicons/react/24/solid';
import { useFormState, useFormStatus  } from 'react-dom';
import toast from 'react-hot-toast';

export default function AddReview({submitAction}) {
    const [rating, setRating] = useState(1);
    const [reviewText, setReviewText] = useState('');
    const { pending } = useFormStatus();

    const [state, handleSubmit] = useFormState(submitAction.bind(null, rating,reviewText),
    {
        status: null,
        message: '',
        error: ''
    })

    const handleRatingChange = (value) => {
        setRating(value);
    };

    useEffect(() => {
        if (state.message) {
            toast.success(state.message);
            setRating(1);
            setReviewText('');
            state.message = '';
        }
        if (state.error) {
            toast.error(state.error);
            state.error = '';
        }
    }, [state.message, state.error]);

    return (
        <form action={handleSubmit} className="max-w-screen-md p-6 rounded-lg">
            <div className="flex items-center mb-4">
                {[1, 2, 3, 4, 5].map((value) => (
                    <button
                        key={value}
                        type="button"
                        onClick={() => handleRatingChange(value)}
                        className={`w-8 h-8 focus:outline-none ${
                            value <= rating ? 'text-yellow-400' : 'text-gray-400'
                        }`}
                    >
                        {value <= rating ? (
                            <SolidStar className="w-full h-full" />
                        ) : (
                            <OutlineStar className="w-full h-full" />
                        )}
                    </button>
                ))}
            </div>
            <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Write your review..."
                className="w-full h-20 px-3 py-2 mb-4 bg-gray-700 bg-opacity-60 backdrop-blur-2xl text-white rounded-lg resize-none focus:outline-none"
                required
            />
            <button 
            type="submit" 
            className="w-fit px-3 py-2 bg-yellow-400 disabled:bg-yellow-600 text-gray-800 rounded-lg hover:bg-yellow-500 focus:outline-none"
            disabled={pending}
            >
                {pending ? 'Submitting...' : 'Submit'}
            </button>
        </form>
    );
}
