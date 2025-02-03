import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import CommentInput from './CommentInput.tsx';
import { Comment as CommentType } from '../../types/type';
import './Comment.scss';

interface CommentProps {
    comment: CommentType;
    onAddComment: (content: string, parentId: string | null) => void;
    blogId: string;
}

const Comment: React.FC<CommentProps> = ({ comment, onAddComment }) => {
    const [showReplyInput, setShowReplyInput] = useState(false);

    const toggleReplyInput = () => {
        setShowReplyInput(!showReplyInput);
    };

    const handleAddReply = (content: string) => {
        onAddComment(content, comment.id); 
        setShowReplyInput(false); 
    };

    return (
        <Box className={`comment-container ${comment.parentId ? 'reply' : ''}`}>
            <Typography variant="body1" className="comment-author">
                {comment.author}
            </Typography>
            <Typography variant="body2" className="comment-content" paragraph>
                {comment.content}
            </Typography>
            <Typography variant="caption" className="comment-date">
                {comment.date}
            </Typography>

            <Button
                variant="outlined"
                onClick={toggleReplyInput}
                className="reply-button"
            >
                {showReplyInput ? 'Cancel Reply' : 'Reply'}
            </Button>

            {showReplyInput && (
                <CommentInput onAddComment={handleAddReply} parentId={comment.id} />
            )}

            
            {comment.replies && comment.replies.length > 0 && (
                <Box className="nested-replies">
                    {comment.replies.map((reply) => (
                        <Comment
                            key={reply.id}
                            comment={reply}
                            onAddComment={onAddComment}
                           
                        />
                    ))}
                </Box>
            )}
        </Box>
    );
};

export default Comment;
