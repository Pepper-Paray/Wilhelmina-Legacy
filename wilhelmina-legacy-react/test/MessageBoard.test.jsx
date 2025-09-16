
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import MessageBoard from '../src/components/MessageBoard';
import React from 'react';

describe('MessageBoard', () => {
  it('renders input fields and post button', () => {
    render(<MessageBoard />);
    expect(screen.getByPlaceholderText('Your name...')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Share your message...')).toBeInTheDocument();
    expect(screen.getByText('Post')).toBeInTheDocument();
  });

  it('does not post empty message or name', async () => {
    render(<MessageBoard />);
    fireEvent.click(screen.getByText('Post'));
    expect(screen.getByPlaceholderText('Your name...').value).toBe('');
    expect(screen.getByPlaceholderText('Share your message...').value).toBe('');
  });

  it('shows no messages initially', () => {
    render(<MessageBoard />);
    expect(screen.getByText(/No messages yet/i)).toBeInTheDocument();
  });

  it('can type in name and message', () => {
    render(<MessageBoard />);
    fireEvent.change(screen.getByPlaceholderText('Your name...'), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByPlaceholderText('Share your message...'), { target: { value: 'Hello world!' } });
    expect(screen.getByPlaceholderText('Your name...').value).toBe('Test User');
    expect(screen.getByPlaceholderText('Share your message...').value).toBe('Hello world!');
  });

  it('renders Southern Tribute Message Board title', () => {
    render(<MessageBoard />);
    expect(screen.getByText(/Southern Tribute Message Board/i)).toBeInTheDocument();
  });
});