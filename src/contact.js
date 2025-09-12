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
    const command = new PutItemCommand({
      TableName: 'YourTableName',
      Item: {
        id: { S: Date.now().toString() },
        text: { S: message }
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
    <Card sx={{ maxWidth: 500, margin: '2rem auto' }}>
      <CardContent>
        <Typography variant="h5">Message Board</Typography>
        <TextField
          label="Your Message"
          value={message}
          onChange={e => setMessage(e.target.value)}
          fullWidth
        />
        <Button onClick={postMessage} variant="contained" color="primary" sx={{ mt: 2 }}>
          Post
        </Button>
        <div style={{ marginTop: '1rem' }}>
          {messages.map(msg => (
            <Typography key={msg.id.S}>{msg.text.S}</Typography>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<MessageBoard />);
