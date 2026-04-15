import FeedbackForm from '@/components/FeedbackForm';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-3xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-center text-gray-800">
            Share Your Feedback
          </h1>
          <p className="text-center text-gray-600 mt-2">
            We value your opinion. Help us improve!
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <FeedbackForm />
        </div>

        {/* Footer note */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>Your feedback helps us serve you better.</p>
          <p className="mt-1">
            <a href="/admin" className="text-blue-600 hover:underline">
              Admin Login →
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}