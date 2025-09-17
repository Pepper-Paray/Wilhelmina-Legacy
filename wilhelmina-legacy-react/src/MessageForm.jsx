import { useState } from 'react';
import TextField from '@mui/material/TextField';

export default function MessageForm({ onSubmit, submitting }) {
  const [text, setText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(text);
    setSubmitted(true);
  };

  return (
    <div className="form-container">
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <TextField
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Your tribute"
            className="textarea"
            fullWidth
            multiline
          />
          <button type="submit" disabled={submitting} className="submit-button">
            {submitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      ) : (
        <div className="poetic-transition">
          <p>Thank you for your tribute. It means a lot.</p>
          <p>Just like a Southern sunset, your words will linger in our hearts.</p>
        </div>
      )}
    </div>
  );
}

