import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { nhost } from '../nhost';
import "./Signup.css";

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); 

  // Redirect to home if the user is already signed in
  useEffect(() => {
    if (nhost.auth.isAuthenticated()) {
      navigate('/home');
    }
  }, [navigate]);

  const handleSignup = async () => {
    if (!firstName || !lastName) {
      setMessage('Please enter your first and last name.');
      return;
    }

    if (password !== confirmPassword) {
      setMessage('Passwords do not match!');
      return;
    }

    const { session, error } = await nhost.auth.signUp({
      email,
      password,
      options: {
        metadata: {
          firstName,
          lastName
        }
      }
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage('Verification email sent. Please verify your email.');
      
      // Redirect to login after signup (only after email verification)
      if (session) {
        setTimeout(() => navigate('/login'), 3000);
      }
    }
  };

  return (
    <div className='signup-container'>
      <h2>Sign Up</h2>
      <div className='input-group'>
        <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
      </div>
      
      <button className='signup-button' onClick={handleSignup}>Sign Up</button>
      <p>{message}</p>
    </div>
  );
};

export default Signup;
