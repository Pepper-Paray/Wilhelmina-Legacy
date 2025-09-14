import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { TextField, Button, Card, CardContent, Typography } from '@mui/material';
import { DynamoDBClient, PutItemCommand, ScanCommand } from '@aws-sdk/client-dynamodb';

const client = new DynamoDBClient({ region: 'your-region' });

const MessageBoard = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    const command = new ScanCommand({ TableName: 'YourTableName' });
    const response = await client.send(command);
    setMessages(response.Items || []);
  };

  const postMessage = async () => {
    const now = new Date();
    const timestamp = now.toISOString();
    const command = new PutItemCommand({
      TableName: 'YourTableName',
      Item: {
        id: { S: Date.now().toString() },
        text: { S: message },
        timestamp: { S: timestamp }
      }
    });
    await client.send(command);
    setMessage('');
    fetchMessages();
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <Card sx={{
      maxWidth: 600,
      margin: '2rem auto',
      background: 'linear-gradient(135deg, #fdf6e3 0%, #f7cac9 100%)',
      border: '2px solid #e5e7eb',
      borderRadius: '16px',
      boxShadow: '0 4px 24px rgba(0,0,0,0.08)'
    }}>
      <CardContent>
        <Typography variant="h4" align="center" sx={{ color: '#a0522d', fontFamily: 'Georgia, serif', fontWeight: 'bold', mb: 2 }}>
          Southern Tribute Message Board
        </Typography>
        <Typography align="center" sx={{ color: '#7c4700', fontFamily: 'Georgia, serif', mb: 3 }}>
          Leave a memory, recipe, or kind word in honor of Wilhelmina, a true Southern woman.
        </Typography>
        <TextField
          label="Share your message..."
          value={message}
          onChange={e => setMessage(e.target.value)}
          fullWidth
          sx={{ mb: 2, background: '#fffbe6', borderRadius: '8px' }}
        />
        <Button onClick={postMessage} variant="contained" sx={{ background: '#a0522d', color: '#fff', mb: 2, fontWeight: 'bold', fontFamily: 'Georgia, serif' }}>
          Post
        </Button>
        <div style={{
          marginTop: '1rem',
          maxHeight: '250px',
          overflowY: 'auto',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          padding: '1rem',
          background: '#fffbe6',
          boxShadow: '0 2px 8px rgba(160,82,45,0.08)'
        }}>
          {messages.length === 0 ? (
            <Typography color="textSecondary" align="center" sx={{ fontStyle: 'italic' }}>No messages yet. Be the first to share a memory!</Typography>
          ) : (
            messages.map(msg => {
              let dateStr = '';
              if (msg.timestamp && msg.timestamp.S) {
                const date = new Date(msg.timestamp.S);
                dateStr = date.toLocaleString();
              }
              return (
                <div key={msg.id.S} style={{ marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px dashed #e5e7eb' }}>
                  <Typography sx={{ fontWeight: 'bold', color: '#a0522d', fontFamily: 'Georgia, serif', mb: 0.5 }}>
                    {msg.text.S}
                  </Typography>
                  <Typography variant="caption" color="textSecondary" sx={{ fontFamily: 'Georgia, serif' }}>
                    {dateStr}
                  </Typography>
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<MessageBoard />);
