'use client'; // This component uses client-side state (useState)

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link'; // Import Link for navigation
import ReviewFormModal from './ReviewFormModal'; // Import the new modal component

const Reviews = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  const reviews = [
    {
      name: "Molly",
      date: "May 8, 2025",
      rating: 5,
      comment: "Amazing quality! I love the dress I bought was even better than I had expected. It's probably a big greatest thing I own in my closet now. Super happy with my item! 💕",
      userAvatar: "/Product-Detail-Image/Molly.png" // Specific avatar for Molly
    },
    {
      name: "Rofath Nii",
      date: "Mar 22, 2025",
      rating: 4,
      comment: "great seller & pleasant exp 💗",
      userAvatar: "/Product-Detail-Image/Rofath.png" // Specific avatar for Rofath Nii
    },
    {
      name: "Engelina",
      date: "Mar 16, 2025",
      rating: 5,
      comment: "seller was very nice and kind, tho meeting up can be quite troublesome, im thankful she still made the effort to post me the shirt after her work thank you",
      userAvatar: "/Product-Detail-Image/Engelina.png" // Specific avatar for Engelina
    },
    {
      name: "Christa",
      date: "Mar 16, 2025",
      rating: 5,
      comment: "Adorable stock of great quality and fantastic price! Seller sent out so quickly we received it the very next day in the mailbox! Really really appreciated! Thanks so much! :)",
      userAvatar: "/Product-Detail-Image/Christa.png" // Specific avatar for Christa
    }
  ];

  const handleReviewSubmit = (reviewData) => {
    // In a real application, you'd integrate with your backend to save the review.
    // For now, we'll just log it.
    console.log('New review submitted:', reviewData);
    // You might also want to refetch reviews or add the new review to the local state
    // to update the displayed reviews immediately.
  };
  
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm"> {/* Removed border-gray-200 if parent already has it */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-gray-900 text-lg">Reviews for Seller</h3>
        <button
          onClick={() => setIsModalOpen(true)} // Open modal on click
          className="bg-orange-500 text-white px-5 py-2 rounded-[50px] text-sm font-medium hover:bg-orange-600 transition-colors"
        >
          Write a review
        </button>
      </div>
      
      <div className="space-y-6">
        {reviews.map((review, index) => (
          <div 
            key={index} 
            // Apply bottom border and padding only to items that are NOT the last one
            className={`flex space-x-4 pb-6 ${index < reviews.length - 1 ? '' : ''}`}
          >
            <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src={review.userAvatar}
                alt={review.name}
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-x-2 mb-1">
                <h4 className="font-semibold text-gray-900">{review.name}</h4>
                <div className="flex text-yellow-400 text-sm">
                  {'★'.repeat(review.rating)}
                </div>
                <span className="text-xs text-gray-500 ml-auto md:ml-0">{review.date}</span>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">{review.comment}</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* "Read all review" Link */}
      <div className="mt-6 text-center"> {/* Added margin-top for spacing and center alignment */}
        <Link href="/seller-reviews" className="text-gray-900 hover:text-orange-500 text-sm font-medium"> {/* Adjusted styling */}
          Read all review &gt;
        </Link>
      </div>

      {/* Render the ReviewFormModal */}
      <ReviewFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleReviewSubmit}
      />
    </div>
  );
};

export default Reviews;