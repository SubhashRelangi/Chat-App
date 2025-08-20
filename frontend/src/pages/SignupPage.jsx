import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthStore } from '../store/useAuthStore.js';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { signup, isSigningUp } = useAuthStore();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, email, password, confirmPassword } = formData;
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    if (!gmailRegex.test(email)) {
      toast.error('Email must be a valid Gmail address');
      return;
    }

    if (email.length <= 6) {
      toast.error('Email must be longer than 6 characters');
      return;
    }

    if (password.length <= 6) {
      toast.error('Password must be longer than 6 characters');
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    await signup({
      username: formData.username,
      email: formData.email,
      password: formData.password,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#667eea] via-[#764ba2] to-[#6b8dd6] flex items-center justify-center px-4">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-10 w-full max-w-md text-white transition-all duration-300 hover:scale-[1.01]">
        <h2 className="text-4xl font-extrabold text-center mb-8 tracking-wide drop-shadow-lg">Create Account</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {['username', 'email', 'password', 'confirmPassword'].map((field) => (
            <div key={field} className="relative">
              <input
                type={
                  field === 'password' || field === 'confirmPassword'
                    ? 'password'
                    : field === 'email'
                      ? 'email'
                      : 'text'
                }
                name={field}
                value={formData[field]}
                onChange={handleChange}
                required
                className="peer w-full px-4 pt-6 pb-2 bg-white/20 text-white placeholder-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-all"
                placeholder={
                  field === 'confirmPassword'
                    ? 'Confirm Password'
                    : field.charAt(0).toUpperCase() + field.slice(1)
                }
              />
              <label
                htmlFor={field}
                className="absolute left-4 top-2 text-sm text-white/70 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-white/50 peer-focus:top-2 peer-focus:text-sm peer-focus:text-white/70"
              >
                {field === 'confirmPassword' ? 'Confirm Password' : field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
            </div>
          ))}
          <button
            type="submit"
            disabled={isSigningUp}
            className={`w-full py-2 rounded-lg font-semibold shadow-lg transition-all duration-300 ease-in-out ${isSigningUp
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white hover:shadow-xl hover:scale-[1.02]'
              }`}
          >
            {isSigningUp ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-white/80">
          Already have an account?{' '}
          <a href="/login" className="text-white underline hover:text-indigo-200 transition">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;