'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageSquareIcon, SendIcon, MicIcon } from 'lucide-react';

export const AIAssistantCard = () => {
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState<{ role: string; content: string }[]>([
        { role: 'assistant', content: "Bonjour ! Comment puis-je vous aider avec votre animal aujourd'hui ?" },
    ]);
    const [loading, setLoading] = useState(false);

    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chatHistory]);

    const handleSend = async () => {
        if (!message.trim()) return;

        setChatHistory((prev) => [...prev, { role: 'user', content: message }]);
        setLoading(true);
        const userMessage = message;
        setMessage('');

        try {
            const res = await fetch('/api/groqChat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMessage }),
            });

            if (!res.ok) {
                const text = await res.text();
                console.error('API error:', text);
                setChatHistory((prev) => [...prev, { role: 'assistant', content: 'Erreur lors de la requête.' }]);
                return;
            }

            const data = await res.json();
            setChatHistory((prev) => [...prev, { role: 'assistant', content: data.message }]);
        } catch (error) {
            console.error('Fetch error:', error);
            setChatHistory((prev) => [...prev, { role: 'assistant', content: 'Erreur lors de la requête.' }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow h-full flex flex-col max-w-md mx-auto">
            <div className="flex items-center mb-4">
                <div className="p-2 bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] rounded-full mr-3">
                    <MessageSquareIcon size={24} className="text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Assistant IA PetConnect</h3>
            </div>

            <div
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto mb-4 space-y-2"
                style={{ maxHeight: '300px' }}  // Hauteur maximale pour le défilement
            >
                {chatHistory.map((msg, idx) => (
                    <div
                        key={idx}
                        className={`p-2 rounded-lg ${msg.role === 'assistant'
                            ? 'bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] text-black'
                            : 'bg-gray-100 text-gray-800'
                            }`}
                    >
                        {msg.content}
                    </div>
                ))}
            </div>

            <form
                className="flex space-x-2 mt-auto"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSend();
                }}
            >
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Posez une question..."
                    className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB8C2]"
                />
                <button
                    type="button"
                    className="p-2 bg-gray-100 rounded-md hover:bg-gray-200"
                    onClick={() => console.log('Mic clicked')}
                >
                    <MicIcon size={20} className="text-gray-600" />
                </button>
                <button
                    type="submit"
                    className="p-2 bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] text-white rounded-md hover:from-[#FFB8C2] hover:to-[#F5F5DC]"
                    disabled={loading}
                >
                    <SendIcon size={20} />
                </button>
            </form>
        </div>
    );
};