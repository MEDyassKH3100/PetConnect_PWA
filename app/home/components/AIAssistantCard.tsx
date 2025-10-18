'use client';

import React, { useState } from 'react';
import { MessageSquareIcon, SendIcon, MicIcon } from 'lucide-react';

export const AIAssistantCard = () => {
    const [message, setMessage] = useState('');
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
                <div className="p-2 bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] rounded-full mr-3">
                    <MessageSquareIcon size={24} className="text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">
                    Assistant IA PetConnect
                </h3>
            </div>
            <p className="text-gray-600 mb-4">
                Posez des questions sur la santé, le comportement ou les soins de votre animal.
            </p>
            <div className="bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] p-4 rounded-lg mb-4">
                <p className="text-sm text-white">
                    <span className="font-medium">Bonjour !</span> Comment puis-je vous aider avec votre animal aujourd'hui ?
                </p>
            </div>
            <div className="flex space-x-2">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Posez une question..."
                    className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB8C2]"
                />
                <button className="p-2 bg-gray-100 rounded-md hover:bg-gray-200">
                    <MicIcon size={20} className="text-gray-600" />
                </button>
                <button className="p-2 bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] text-white rounded-md hover:from-[#FFB8C2] hover:to-[#F5F5DC]">
                    <SendIcon size={20} />
                </button>
            </div>
        </div>
    );
};