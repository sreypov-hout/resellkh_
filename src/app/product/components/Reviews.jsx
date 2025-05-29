'use client'; // The "Write a review" button suggests client-side interaction

import Image from 'next/image';

const Reviews = () => {
  const reviews = [
    {
      name: "Molly",
      date: "May 8, 2024",
      rating: 5,
      comment: "Amazing quality! I love the dress I bought was even better than I had expected. It's probably a big greatest thing I own in my closet now. Super happy with my item! 💕"
    },
    {
      name: "Rolath Nil",
      date: "Mar 22, 2024",
      rating: 4,
      comment: "great seller & pleasant exp 💗"
    },
    {
      name: "Engelina",
      date: "Mar 16, 2024",
      rating: 5,
      comment: "seller was very nice and kind, the meeting up can be quite troublesome, im thankful she still made the effort to post me the shirt after her work thank you"
    },
    {
      name: "Christa",
      date: "Mar 16, 2024",
      rating: 5,
      comment: "Adorable stock of great quality and fantastic price! Seller sent out so quickly we received it the very next day in the mailbox! Really really appreciated! Thanks so much! :)"
    }
  ];
  
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-gray-900">Reviews for Seller</h3>
        <button className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-orange-600">
          Write a review
        </button>
      </div>
      
      <div className="space-y-6">
        {reviews.map((review, index) => (
          <div key={index} className="flex space-x-3">
            <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden flex-shrink-0">
              <Image 
                src={`https://images.unsplash.com/photo-${1494790108755 + index}?w=100&h=100&fit=crop&crop=face`} 
                alt={review.name} 
                width={40} 
                height={40} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h4 className="font-medium text-gray-900">{review.name}</h4>
                <div className="flex text-yellow-400 text-sm">
                  {'★'.repeat(review.rating)}
                </div>
                <span className="text-sm text-gray-500">{review.date}</span>
              </div>
              <p className="text-gray-600 text-sm">{review.comment}</p>
            </div>
          </div>
        ))}
      </div>
      
      <button className="text-orange-500 text-sm mt-4 hover:text-orange-600">
        Read all reviews →
      </button>
    </div>
  );
};

export default Reviews;