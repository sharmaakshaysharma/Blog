import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';

interface CommentInputProps {
    onAddComment: (content: string, parentId: string | null) => void;
    parentId: string | null;
}
const CommentInput: React.FC<CommentInputProps> = ({ onAddComment, parentId }) => {
    const [content, setContent] = useState('');
    const [error, setError] = useState<string | null>(null); 

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (content.trim()) {
            onAddComment(content, parentId);
            setContent(''); 
            setError(null); 
        } else {
            setError('Please write something before submitting.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="comment-input-form">
            <TextField
                label="Write a comment"
                multiline
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                fullWidth
                error={!!error} 
                helperText={error} 
            />
            <Button
                type="submit"
                variant="text" color="primary"        
            >
                {parentId ? 'Reply' : 'Comment'}
            </Button>
        </form>
    );
};

export default CommentInput;
