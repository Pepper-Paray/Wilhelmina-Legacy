import React from 'react';
import ReactDOM from 'react-dom/client';
import MessageForm from './components/MessageForm'; // adjust path if needed

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<MessageForm onSubmit={yourSubmitFunction} submitting={false} />);
