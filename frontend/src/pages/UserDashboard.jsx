import React, { useState, useEffect } from 'react';
import { authAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const UserDashboard = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState({
    full_name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await authAPI.getProfile();
      setProfile(response.data.user);
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    }
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await authAPI.updateProfile(profile);
      toast.success('Profile updated!');
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">My Profile</h1>

      <div className="card p-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Full Name</label>
            <input
              type="text"
              name="full_name"
              value={profile.full_name}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              value={profile.email}
              className="input-field bg-gray-100"
              disabled
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Phone</label>
            <input
              type="tel"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Address</label>
            <textarea
              name="address"
              value={profile.address}
              onChange={handleChange}
              className="input-field"
              rows="3"
              required
            />
          </div>

          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? 'Updating...' : 'Update Profile'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserDashboard;
