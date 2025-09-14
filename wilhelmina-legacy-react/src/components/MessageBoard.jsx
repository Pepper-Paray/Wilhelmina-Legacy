
import React, { useState, useEffect } from "react";
import { DynamoDBClient, PutItemCommand, ScanCommand, UpdateItemCommand, DeleteItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "your-region" });
const TABLE_NAME = "YourTableName";

export default function MessageBoard() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [editName, setEditName] = useState("");

  // Read messages
  const fetchMessages = async () => {
    const command = new ScanCommand({ TableName: TABLE_NAME });
    const response = await client.send(command);
    setMessages(response.Items || []);
  };

  // Create message
  const postMessage = async () => {
    if (!message.trim() || !name.trim()) return;
    const now = new Date();
    const timestamp = now.toISOString();
    const command = new PutItemCommand({
      TableName: TABLE_NAME,
      Item: {
        id: { S: Date.now().toString() },
        name: { S: name },
        text: { S: message },
        timestamp: { S: timestamp }
      }
    });
    await client.send(command);
    setMessage("");
    setName("");
    fetchMessages();
  };

  // Update message
  const updateMessage = async (id) => {
    const command = new UpdateItemCommand({
      TableName: TABLE_NAME,
      Key: { id: { S: id } },
      UpdateExpression: "set text = :t, name = :n",
      ExpressionAttributeValues: { ":t": { S: editText }, ":n": { S: editName } }
    });
    await client.send(command);
    setEditingId(null);
    setEditText("");
    setEditName("");
    fetchMessages();
  };

  // Delete message
  const deleteMessage = async (id) => {
    const command = new DeleteItemCommand({
      TableName: TABLE_NAME,
      Key: { id: { S: id } }
    });
    await client.send(command);
    fetchMessages();
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="max-w-xl mx-auto my-8 p-6 bg-gradient-to-br from-yellow-50 to-pink-100 rounded-xl shadow-lg border-2 border-yellow-200 font-serif">
      <h2 className="text-2xl font-bold text-pink-900 mb-4 text-center">Southern Tribute Message Board</h2>
      <div className="mb-4 flex flex-col gap-2 md:flex-row md:gap-4">
        <input
          type="text"
          className="flex-1 p-2 rounded border border-yellow-300 bg-white"
          placeholder="Your name..."
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          type="text"
          className="flex-1 p-2 rounded border border-yellow-300 bg-white"
          placeholder="Share your message..."
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <button
          className="bg-yellow-900 text-white px-4 py-2 rounded font-bold hover:bg-pink-700"
          onClick={postMessage}
        >
          Post
        </button>
      </div>
      <div className="max-h-64 overflow-y-auto bg-white rounded-lg border border-yellow-200 p-4">
        {messages.length === 0 ? (
          <div className="italic text-yellow-900 text-center">No messages yet. Be the first to share a memory!</div>
        ) : (
          messages.map(msg => {
            let dateStr = "";
            if (msg.timestamp && msg.timestamp.S) {
              const date = new Date(msg.timestamp.S);
              dateStr = date.toLocaleString();
            }
            return (
              <div key={msg.id.S} className="mb-4 pb-2 border-b border-yellow-100">
                {editingId === msg.id.S ? (
                  <div className="flex gap-2 items-center">
                    <input
                      type="text"
                      className="flex-1 p-2 rounded border border-yellow-300 bg-white"
                      value={editName}
                      onChange={e => setEditName(e.target.value)}
                    />
                    <input
                      type="text"
                      className="flex-1 p-2 rounded border border-yellow-300 bg-white"
                      value={editText}
                      onChange={e => setEditText(e.target.value)}
                    />
                    <button className="bg-pink-700 text-white px-2 py-1 rounded font-bold" onClick={() => updateMessage(msg.id.S)}>Save</button>
                    <button className="bg-gray-300 px-2 py-1 rounded" onClick={() => setEditingId(null)}>Cancel</button>
                  </div>
                ) : (
                  <>
                    <div className="font-bold text-yellow-900">{msg.name ? msg.name.S : "Anonymous"}</div>
                    <div className="font-bold text-yellow-900">{msg.text.S}</div>
                    <div className="text-xs text-pink-900 italic mb-1">{dateStr}</div>
                    <div className="flex gap-2">
                      <button className="text-pink-700 hover:underline" onClick={() => { setEditingId(msg.id.S); setEditText(msg.text.S); setEditName(msg.name ? msg.name.S : ""); }}>Edit</button>
                      <button className="text-red-600 hover:underline" onClick={() => deleteMessage(msg.id.S)}>Delete</button>
                    </div>
                  </>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
