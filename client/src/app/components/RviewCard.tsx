// import React from "react";
// import Rating from "./RatingStars";
// import { DeletIcon, Replay } from "./Icons";

// const CommentCard = () => {

//   return (
//     <>
//     <div className="w-full flex items-center justify-center">
//       <div className="w-full flex justify-between">
//         <div className="w-full flex flex-col sm:flex-row">
//           <div className="w-full flex   items-center gap-2 sm:space-x-4">
//             <img
//               src={"https://via.placeholder.com/40"}
//               alt="User Avatar"
//               className="w-10 h-10 rounded-full"
//             />
//             <div className="flex  ">
//               <h3 className="font-semibold text-gray-800 !text-nowrap">
//                 Afaq Hussain
//               </h3>
//             </div>
//             <div className="flex ">
//               <p className="text-xs text-gray-500 !text-nowrap">2 weeks ago</p>
//             </div>
//             <div className="w-full flex ">
//               <Rating rating={0} starDimension="14px" />
//             </div>
//           </div>

//           <div className="w-full sm:w-1/2 flex  sm:justify-end items-center gap-2">
//             <p className="flex items-center justify-center gap-2 text-[#5357B6] ">
//               <Replay />
//               Replay
//             </p>
//             <p className="">
//               <DeletIcon />
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//     <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur eum ipsa est placeat expedita reiciendis debitis reprehenderit minus laudantium, vitae corrupti iusto eaque quo mollitia. Repellendus consequuntur maiores omnis sapiente.</p>

//     </>
//   );
// };

// export default CommentCard;

import React, { useState } from 'react';
import Rating from './RatingStars';
import { DeletIcon, Replay } from './Icons';

const CommentCard = ({ comment, addReply, deleteComment }: any) => {
  const [replyText, setReplyText] = useState('');
  const [showReplyBox, setShowReplyBox] = useState(false);

  const handleAddReply = () => {
    if (replyText.trim()) {
      addReply(comment.id, replyText.trim());
      setReplyText('');
      setShowReplyBox(false);
    }
  };

  return (
    <div className="w-full my-4 border p-4 rounded-md">
      {/* Main Comment Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src={'https://via.placeholder.com/40'}
            alt="User Avatar"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h3 className="font-semibold text-gray-800">{comment.author}</h3>
            <p className="text-xs text-gray-500">{comment.time}</p>
          </div>
          <Rating rating={comment.rating || 0} starDimension="14px" />
        </div>
        <div className="flex items-center gap-4">
          <button
            className="flex items-center text-[#5357B6] hover:underline"
            onClick={() => setShowReplyBox(!showReplyBox)}
          >
            <Replay />
            Reply
          </button>
          <button
            className="text-red-500 hover:text-red-700"
            onClick={() => deleteComment(comment.id)}
          >
            <DeletIcon />
          </button>
        </div>
      </div>

      <p className="mt-2 text-gray-600">{comment.text}</p>

      {showReplyBox && (
        <div className="mt-4">
          <textarea
            className="w-full border rounded-md p-2 text-sm resize-none outline-[#3734A9]"
            rows={2}
            placeholder="Write your reply..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          />
          <div className="flex justify-end mt-2">
            <button
              className="px-4 py-1 bg-blue-500 text-white rounded-md"
              onClick={handleAddReply}
            >
              Reply
            </button>
          </div>
        </div>
      )}

      {/* Render Replies */}
      <div className="ml-6 mt-4 border-l-2 pl-4">
        {comment.replies.map((reply: { id: React.Key | null | undefined }) => (
          <CommentCard
            key={reply.id}
            comment={reply}
            addReply={addReply}
            deleteComment={deleteComment}
          />
        ))}
      </div>
    </div>
  );
};

const CommentsSection = () => {
  const [comments, setComments] = useState([
    {
      id: 1,
      author: 'Afaq Hussain',
      time: '2 weeks ago',
      text: 'This is a great product!',
      rating: 5,
      replies: [
        {
          id: 2,
          author: 'John Doe',
          time: '1 week ago',
          text: 'I agree with you!',
          rating: 4,
          replies: [],
        },
      ],
    },
  ]);

  const addReply = (parentId: any, replyText: any) => {
    const addNestedReply = (comments: any) =>
      comments.map((comment: { id: any; replies: string | any[] }) => {
        if (comment.id === parentId) {
          const newReply = {
            id: Date.now(),
            author: 'You',
            time: 'Just now',
            text: replyText,
            rating: 0,
            replies: [],
          };
          return { ...comment, replies: [...comment.replies, newReply] };
        } else if (comment.replies.length > 0) {
          return { ...comment, replies: addNestedReply(comment.replies) };
        }
        return comment;
      });

    setComments((prevComments) => addNestedReply(prevComments));
  };

  const deleteComment = (commentId: any) => {
    const deleteNestedComment = (comments: any) =>
      comments
        .map((comment: { id: any; replies: string | any[] }) => {
          if (comment.id === commentId) {
            return null;
          }
          if (comment.replies.length > 0) {
            return {
              ...comment,
              replies: deleteNestedComment(comment.replies).filter(
                (reply: null) => reply !== null
              ),
            };
          }
          return comment;
        })
        .filter((comment: null) => comment !== null);

    setComments((prevComments) => deleteNestedComment(prevComments));
  };

  return (
    <div className="w-full  mx-auto">
      {comments.map((comment) => (
        <CommentCard
          key={comment.id}
          comment={comment}
          addReply={addReply}
          deleteComment={deleteComment}
        />
      ))}
    </div>
  );
};

export default CommentsSection;
