import React, { useState } from 'react';

const Add = () => {
    const [num1, setNum1] = useState('');
    const [num2, setNum2] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleAdd = async (e) => {
        e.preventDefault();
        
        if (!num1 || !num2) {
            setResult('Please enter both numbers');
            return;
        }
        
        setLoading(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ num1, num2 }),
            });

            const data = await res.text();
            setResult(data);
            console.log('Result:', data);
        } catch (error) {
            console.error('Error:', error);
            setResult('Error: Unable to calculate. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleAdd(e);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
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
                    background: 'linear-gradient(45deg, #48bb78, #38a169)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    marginBottom: '30px',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
                }}>
                    🔢 Add Numbers
                </div>
                
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px'
                }}>
                    {/* Number 1 Input */}
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
                            🔢 First Number
                        </label>
                        <input 
                            type="number" 
                            value={num1}
                            onChange={(e) => setNum1(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Enter first number..."
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
                                e.target.style.borderColor = '#48bb78';
                                e.target.style.background = '#ffffff';
                                e.target.style.boxShadow = '0 0 0 3px rgba(72, 187, 120, 0.1)';
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = '#e2e8f0';
                                e.target.style.background = '#f8fafc';
                                e.target.style.boxShadow = 'none';
                            }}
                        />
                    </div>

                    {/* Number 2 Input */}
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
                            ➕ Second Number
                        </label>
                        <input 
                            type="number" 
                            value={num2}
                            onChange={(e) => setNum2(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Enter second number..."
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
                                e.target.style.borderColor = '#48bb78';
                                e.target.style.background = '#ffffff';
                                e.target.style.boxShadow = '0 0 0 3px rgba(72, 187, 120, 0.1)';
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
                        onClick={handleAdd}
                        disabled={loading}
                        style={{
                            background: loading ? '#a0a0a0' : 'linear-gradient(45deg, #48bb78, #38a169)',
                            color: 'white',
                            padding: '15px 30px',
                            border: 'none',
                            borderRadius: '12px',
                            fontSize: '1.1em',
                            fontWeight: '600',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 4px 15px rgba(72, 187, 120, 0.3)',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            opacity: loading ? 0.7 : 1
                        }}
                        onMouseOver={(e) => {
                            if (!loading) {
                                e.target.style.transform = 'translateY(-2px)';
                                e.target.style.boxShadow = '0 6px 20px rgba(72, 187, 120, 0.4)';
                            }
                        }}
                        onMouseOut={(e) => {
                            if (!loading) {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = '0 4px 15px rgba(72, 187, 120, 0.3)';
                            }
                        }}
                    >
                        {loading ? '⏳ Calculating...' : '🧮 Calculate'}
                    </button>
                </div>
                
                <div style={{
                    marginTop: '20px',
                    padding: '20px',
                    background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                    borderRadius: '12px',
                    borderLeft: '4px solid #48bb78',
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
                        <strong style={{color: '#48bb78'}}>🔢 Result:</strong>
                        <div style={{
                            marginTop: '8px',
                            color: '#2d3748',
                            fontStyle: result ? 'normal' : 'italic',
                            fontSize: result ? '1.2em' : '1em',
                            fontWeight: result ? '600' : '400'
                        }}>
                            {result || 'Your calculation result will appear here...'}
                        </div>
                    </div>
                </div>

                {/* Navigation Back */}
                <div style={{
                    marginTop: '30px',
                    textAlign: 'center'
                }}>
                    <a 
                        href="/"
                        style={{
                            textDecoration: 'none',
                            color: '#48bb78',
                            fontWeight: '600',
                            padding: '10px 20px',
                            border: '2px solid #48bb78',
                            borderRadius: '8px',
                            transition: 'all 0.3s ease',
                            fontSize: '0.9em',
                            display: 'inline-block'
                        }}
                        onMouseOver={(e) => {
                            e.target.style.background = '#48bb78';
                            e.target.style.color = 'white';
                        }}
                        onMouseOut={(e) => {
                            e.target.style.background = 'transparent';
                            e.target.style.color = '#48bb78';
                        }}
                    >
                        ← Back to Home
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Add;