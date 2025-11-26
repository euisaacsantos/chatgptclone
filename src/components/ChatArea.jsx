import React, { useState, useRef, useEffect } from 'react';
import { FiSend, FiUser, FiCpu, FiAlertCircle } from 'react-icons/fi';
import { sendMessageToGemini } from '../services/gemini';

const ChatArea = ({ currentModel }) => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([
        { role: 'ai', content: 'Hello! How can I help you today?' }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const textareaRef = useRef(null);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const handleInput = (e) => {
        setInput(e.target.value);
        e.target.style.height = 'auto';
        e.target.style.height = `${e.target.scrollHeight}px`;
    };

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setInput('');
        setError(null);
        setIsLoading(true);

        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
        }

        try {
            // Filter out error messages from history if any
            const history = messages.filter(msg => msg.role !== 'error');
            const response = await sendMessageToGemini(currentModel, history, userMessage);

            setMessages(prev => [...prev, { role: 'ai', content: response }]);
        } catch (err) {
            console.error(err);
            setError(err.message || "Something went wrong. Please check your API key and try again.");
            setMessages(prev => [...prev, { role: 'error', content: err.message || "Failed to get response." }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <main className="chat-area">
            <div className="messages-container">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.role}`}>
                        <div className="message-content">
                            <div className="avatar">
                                {msg.role === 'ai' ? <FiCpu size={20} /> :
                                    msg.role === 'user' ? <FiUser size={20} /> :
                                        <FiAlertCircle size={20} />}
                            </div>
                            <div className="text">
                                {msg.role === 'error' ? <span style={{ color: '#ef4444' }}>{msg.content}</span> : msg.content}
                            </div>
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="message ai">
                        <div className="message-content">
                            <div className="avatar">
                                <FiCpu size={20} />
                            </div>
                            <div className="text typing-indicator">
                                <span></span><span></span><span></span>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="input-area">
                {error && (
                    <div className="error-banner">
                        <FiAlertCircle />
                        <span>{error}</span>
                    </div>
                )}
                <div className="input-container">
                    <textarea
                        ref={textareaRef}
                        value={input}
                        onChange={handleInput}
                        onKeyDown={handleKeyDown}
                        placeholder={`Message ${currentModel}...`}
                        rows={1}
                        disabled={isLoading}
                    />
                    <button className="send-btn" onClick={handleSend} disabled={!input.trim() || isLoading}>
                        <FiSend size={16} />
                    </button>
                </div>
                <div className="disclaimer">
                    ChatGPT can make mistakes. Consider checking important information.
                </div>
            </div>
        </main>
    );
};

export default ChatArea;
