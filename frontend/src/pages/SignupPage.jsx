import React, { useState } from 'react';
import toast from 'react-hot-toast';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    const toastId = toast.loading('Signing you up...');

    try {
      const res = await fetch('http://localhost:5005/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      toast.dismiss(toastId);

      if (res.ok) {
        toast.success('Signup successful!');
        setFormData({
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      } else {
        toast.error(data.message || 'Signup failed');
      }
    } catch (err) {
      toast.dismiss(toastId);
      toast.error('Server error. Please try again.');
      console.error(err);
    }
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
            className="w-full bg-indigo-500 hover:bg-indigo-600 py-2 rounded-lg font-semibold shadow-md transition duration-300"
          >
            Sign Up
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