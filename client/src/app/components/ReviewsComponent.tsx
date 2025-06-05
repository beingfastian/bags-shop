'use client';

import Rating from './RatingStars';

const ReviewsComponent = ({ review }: any) => {
  return (
    <div className="w-full px-1 py-3">
      <div className="flex w-full items-center justify-between">
        <div className="flex space-x-2 items-center">
          <img
            src={review.url || '/avator.png'}
            alt="User Avatar"
            className="w-10 h-10 rounded-full"
          />
          <div className="flex flex-col items-center space-x-3 md:flex-row">
            <h1 className="text-sm">{review.username}</h1>
            <h1 className="text-sm">{review.timeAgo}</h1>
            <Rating rating={review.rating} starDimension="14px" />
          </div>
        </div>

        {/* <div className="flex space-x-4 mb-1">
          <span
            className="flex items-center space-x-2 cursor-pointer"
            onClick={handleReply}
          >
            <Replay />
            <h1 className="text-sm">Reply</h1>
          </span>
          <h1>
            <DeletIcon />
          </h1>
        </div> */}
      </div>

      <div className="px-8 text-sm">
        <p>{review.content}</p>
      </div>

      {/* {review.replies?.map((reply: any) => (
        <div key={reply.id} className="pl-8 border-l-2 border-gray-200 mt-2">
          <div className="flex space-x-2 items-center">
            <img
              src={'/avator.png'}
              alt="Reply Avatar"
              className="w-8 h-8 rounded-full"
            />
            <h1 className="text-sm">{reply.username}</h1>
            <h1 className="text-sm">{reply.timeAgo}</h1>
          </div>
          <div className="px-8 text-sm">
            <p>{reply.content}</p>
          </div>
        </div>
      ))}

      {showReply && (
        <div className="px-4  flex  space-y-2 md:space-y-0 flex-col md:flex-row items-center space-x-4 py-3 ">
          <img
            src={'/avator.png'}
            alt="User Avatar"
            className="w-10 h-10 rounded-full"
          />

          <span className="w-[80%] ">
            <input
              type="text"
              placeholder="enter the Reply"
              className="rounded-md  focus:outline-none  border w-full py-6  !px-2   "
            />
          </span>

          <button className="text-white px-6 py-2  text-lg rounded-md bg-primary">
            Reply
          </button>
        </div>
      )} */}
    </div>
  );
};

export default ReviewsComponent;
