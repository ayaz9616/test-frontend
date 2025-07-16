import React from 'react'
import { useState,useEffect } from 'react';


const AllChats = () => {
    const [chats, setChats] = useState([]);
    const [user_message, setUserMessage] = useState('');
    const [ai_response, setAIResponse] = useState('');

    const handleAddChat = async (e) => {
        e.preventDefault();
        if (!user_message.trim() || !ai_response.trim()) {
            console.error('Both fields are required');
            return;
        }
        
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/addChat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_message, ai_response }),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log('Chat added:', data);
            setChats([...chats, data]);
        } catch (error) {
            console.error('Error adding chat:', error);
        }
    };

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/allChats`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log(data);
                setChats(data);
            } catch (error) {
                console.error('Error fetching chats:', error);
            }
        };
        fetchChats();
    }, []);

    return (
        <div>
            <form onSubmit={handleAddChat}>
                <div>user_message</div><input type="text" value={user_message} onChange={e=>setUserMessage(e.target.value)}/>
                <div>ai_response</div><input type="text" value={ai_response} onChange={e=>setAIResponse(e.target.value)}/>
                <button type="submit">Add Chat</button>
            </form>
            <h2>All Chats</h2>
            <ul>
                {chats.map((chat, idx) => (
                    <li key={idx}>
                        <strong>User:</strong> {chat.user_message} <br />
                        <strong>AI:</strong> {chat.ai_response}
                    </li>
                ))}
            </ul>
        </div>
    );
}   

export default AllChats