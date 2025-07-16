import React from 'react';

const AI = () => {
    const [input, setInput] = React.useState('');
    const [output, setOutput] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    
    const handleAI = async (e) => {
        e.preventDefault();
        if (!input.trim()) {
            setOutput('Please enter a message first!');
            return;
        }
        
        setLoading(true);
        try {
            const result = await fetch(`${import.meta.env.VITE_BACKEND_URL}/ai`, {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_message: input }),
            });
            const data = await result.json();
            setOutput(data.data[0][1].content);
            console.log('AI Response:', data.data[0][1].content);
        } catch (error) {
            console.error('Error:', error);
            setOutput('Error: Unable to get AI response. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleAI(e);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'Arial, sans-serif',
            margin: 0,
            padding: '20px'
        }}>
            <div style={{
                background: 'rgba(255, 255, 255, 0.95)',
                padding: '40px',
                borderRadius: '20px',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                maxWidth: '500px',
                width: '100%'
            }}>
                <div style={{
                    textAlign: 'center',
                    fontSize: '2.5em',
                    fontWeight: 'bold',
                    background: 'linear-gradient(45deg, #667eea, #764ba2)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    marginBottom: '30px',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
                }}>
                    ✨ AI Assistant
                </div>
                
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px'
                }}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px'
                    }}>
                        <label style={{
                            fontWeight: '600',
                            color: '#4a5568',
                            fontSize: '1.1em'
                        }}>
                            💬 Your Message
                        </label>
                        <input 
                            type="text" 
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Ask me anything..."
                            disabled={loading}
                            style={{
                                padding: '15px 20px',
                                border: '2px solid #e2e8f0',
                                borderRadius: '12px',
                                fontSize: '1em',
                                background: '#f8fafc',
                                transition: 'all 0.3s ease',
                                outline: 'none',
                                fontFamily: 'inherit',
                                opacity: loading ? 0.7 : 1
                            }}
                            onFocus={(e) => {
                                e.target.style.borderColor = '#667eea';
                                e.target.style.background = '#ffffff';
                                e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = '#e2e8f0';
                                e.target.style.background = '#f8fafc';
                                e.target.style.boxShadow = 'none';
                            }}
                        />
                    </div>
                    
                    <button 
                        type="button"
                        onClick={handleAI}
                        disabled={loading}
                        style={{
                            background: loading ? '#a0a0a0' : 'linear-gradient(45deg, #667eea, #764ba2)',
                            color: 'white',
                            padding: '15px 30px',
                            border: 'none',
                            borderRadius: '12px',
                            fontSize: '1.1em',
                            fontWeight: '600',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            opacity: loading ? 0.7 : 1
                        }}
                        onMouseOver={(e) => {
                            if (!loading) {
                                e.target.style.transform = 'translateY(-2px)';
                                e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.4)';
                            }
                        }}
                        onMouseOut={(e) => {
                            if (!loading) {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
                            }
                        }}
                    >
                        {loading ? '⏳ Processing...' : '🚀 Submit'}
                    </button>
                </div>
                <button><a href="/allChats">AllChats</a></button>
                <div style={{
                    marginTop: '20px',
                    padding: '20px',
                    background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                    borderRadius: '12px',
                    borderLeft: '4px solid #667eea',
                    minHeight: '60px',
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    <div style={{
                        color: '#4a5568',
                        fontSize: '1em',
                        lineHeight: '1.6',
                        width: '100%'
                    }}>
                        <strong style={{color: '#667eea'}}>🤖 AI Response:</strong>
                        <div style={{
                            marginTop: '8px',
                            color: '#2d3748',
                            fontStyle: output ? 'normal' : 'italic',
                            whiteSpace: 'pre-wrap',
                            wordBreak: 'break-word'
                        }}>
                            {output || 'Your AI response will appear here...'}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AI;