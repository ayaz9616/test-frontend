import React from 'react';

const Home = () => {
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
        maxWidth: '600px',
        width: '100%',
        textAlign: 'center'
      }}>
        {/* Header */}
        <h1 style={{
          fontSize: '2.5em',
          fontWeight: 'bold',
          background: 'linear-gradient(45deg, #667eea, #764ba2)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: '20px',
          textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
        }}>
          Welcome to the Frontend App 👋
        </h1>
        
        {/* Description */}
        <p style={{
          fontSize: '1.2em',
          color: '#4a5568',
          marginBottom: '40px',
          lineHeight: '1.6'
        }}>
          Choose from the options below to explore different features
        </p>
        
        {/* Navigation Cards */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          marginBottom: '30px'
        }}>
          {/* AI Assistant Card */}
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: '25px',
            borderRadius: '15px',
            boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            color: 'white'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.boxShadow = '0 12px 30px rgba(102, 126, 234, 0.4)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.3)';
          }}
          onClick={() => {
            // For demonstration - in real app you'd use React Router
            window.location.href = '/ai';
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '15px'
            }}>
              <span style={{ fontSize: '2em' }}>🤖</span>
              <div style={{ textAlign: 'left' }}>
                <h3 style={{ margin: 0, fontSize: '1.3em', fontWeight: '600' }}>
                  AI Assistant
                </h3>
                <p style={{ 
                  margin: '5px 0 0 0', 
                  fontSize: '0.9em', 
                  opacity: 0.9,
                  fontWeight: '300'
                }}>
                  Chat with our intelligent AI assistant
                </p>
              </div>
            </div>
          </div>
          
          {/* Add Numbers Card */}
          <div style={{
            background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
            padding: '25px',
            borderRadius: '15px',
            boxShadow: '0 8px 25px rgba(72, 187, 120, 0.3)',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            color: 'white'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.boxShadow = '0 12px 30px rgba(72, 187, 120, 0.4)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(72, 187, 120, 0.3)';
          }}
          onClick={() => {
            // For demonstration - in real app you'd use React Router
            window.location.href = '/add';
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '15px'
            }}>
              <span style={{ fontSize: '2em' }}>🔢</span>
              <div style={{ textAlign: 'left' }}>
                <h3 style={{ margin: 0, fontSize: '1.3em', fontWeight: '600' }}>
                  Add Numbers
                </h3>
                <p style={{ 
                  margin: '5px 0 0 0', 
                  fontSize: '0.9em', 
                  opacity: 0.9,
                  fontWeight: '300'
                }}>
                  Simple calculator for adding numbers
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Quick Links */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '15px',
          marginTop: '30px'
        }}>
          <a 
            href="/ai" 
            style={{
              textDecoration: 'none',
              color: '#667eea',
              fontWeight: '600',
              padding: '10px 20px',
              border: '2px solid #667eea',
              borderRadius: '8px',
              transition: 'all 0.3s ease',
              fontSize: '0.9em'
            }}
            onMouseOver={(e) => {
              e.target.style.background = '#667eea';
              e.target.style.color = 'white';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.color = '#667eea';
            }}
          >
            Go to AI →
          </a>
          <a 
            href="/add" 
            style={{
              textDecoration: 'none',
              color: '#48bb78',
              fontWeight: '600',
              padding: '10px 20px',
              border: '2px solid #48bb78',
              borderRadius: '8px',
              transition: 'all 0.3s ease',
              fontSize: '0.9em'
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
            Go to Add →
          </a>
          <a 
            href="/videoCall" 
            style={{
              textDecoration: 'none',
              color: '#764ba2',
              fontWeight: '600',
              padding: '10px 20px',
              border: '2px solid #764ba2',
              borderRadius: '8px',
              transition: 'all 0.3s ease',
              fontSize: '0.9em'
            }}
            onMouseOver={(e) => {
              e.target.style.background = '#764ba2';
              e.target.style.color = 'white';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.color = '#764ba2';
            }}
          >
            Go to Video Call →
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;