import React, { useState } from 'react';

interface LoginFormProps {
  onLogin: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple hardcoded login for demo
    if (username === 'surgery' && password === 'team') {
      setError('');
      onLogin();
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-8 p-4 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Surgery Team Login</h2>
      <div className="mb-4">
        <label className="block mb-1">Username</label>
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Password</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Login</button>
    </form>
  );
};

export default LoginForm;
