'use client';

import { useEffect, useState } from 'react';

interface Feedback {
  _id: string;
  name: string;
  email: string;
  rating: number;
  message: string;
  pageUrl: string;
  status: string;
  createdAt: string;
}

export default function AdminFeedbackTable() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchFeedbacks = async () => {
    try {
      const res = await fetch('/api/admin/feedback');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setFeedbacks(data);
    } catch (err) {
      setError('Failed to load feedback');
    } finally {
      setLoading(false);
    }
  };

  const deleteFeedback = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      const res = await fetch(`/api/admin/feedback?id=${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setFeedbacks(feedbacks.filter((f) => f._id !== id));
      }
    } catch (err) {
      alert('Delete failed');
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-red-600 text-center py-8">{error}</div>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border">Date</th>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Email</th>
            <th className="px-4 py-2 border">Rating</th>
            <th className="px-4 py-2 border">Message</th>
            <th className="px-4 py-2 border">Page</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center py-8 text-gray-500">
                No feedback yet
              </td>
            </tr>
          ) : (
            feedbacks.map((fb) => (
              <tr key={fb._id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border text-sm">
                  {new Date(fb.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 border">{fb.name}</td>
                <td className="px-4 py-2 border">{fb.email}</td>
                <td className="px-4 py-2 border text-center">{fb.rating}★</td>
                <td className="px-4 py-2 border">{fb.message}</td>
                <td className="px-4 py-2 border text-sm">{fb.pageUrl}</td>
                <td className="px-4 py-2 border">
                  <button
                    onClick={() => deleteFeedback(fb._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}