import React from 'react';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">🏠 Smart Hostel Management</h1>
          <p className="text-xl mb-8">Streamline your hostel operations with our intelligent management system</p>
          <div className="flex gap-4 justify-center">
            <a href="/login" className="btn btn-primary bg-white text-blue-600 hover:bg-gray-100">
              Login
            </a>
            <a href="/register" className="btn btn-primary bg-green-500 hover:bg-green-600">
              Register Now
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card">
              <h3 className="text-2xl font-bold text-blue-600 mb-4">👤 Resident Management</h3>
              <p className="text-gray-600">Easy management of resident profiles, documents, and personal information</p>
            </div>
            <div className="card">
              <h3 className="text-2xl font-bold text-green-600 mb-4">🏘️ Room Allocation</h3>
              <p className="text-gray-600">Efficient room allocation and occupancy tracking</p>
            </div>
            <div className="card">
              <h3 className="text-2xl font-bold text-purple-600 mb-4">💰 Billing System</h3>
              <p className="text-gray-600">Automated fee calculation and online payment tracking</p>
            </div>
            <div className="card">
              <h3 className="text-2xl font-bold text-red-600 mb-4">🔧 Complaint Management</h3>
              <p className="text-gray-600">Log and track maintenance requests and complaints efficiently</p>
            </div>
            <div className="card">
              <h3 className="text-2xl font-bold text-yellow-600 mb-4">📢 Announcements</h3>
              <p className="text-gray-600">Send important updates and announcements to residents</p>
            </div>
            <div className="card">
              <h3 className="text-2xl font-bold text-indigo-600 mb-4">📊 Analytics</h3>
              <p className="text-gray-600">Comprehensive reports and statistics for administrators</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-12">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-lg mb-8">Join our platform and manage your hostel efficiently</p>
          <a href="/register" className="btn btn-primary bg-white text-blue-600 hover:bg-gray-100">
            Create Your Account
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2026 Smart Hostel Management System. All rights reserved.</p>
          <p className="text-sm text-gray-400 mt-2">A Final Year Project by Harish</p>
        </div>
      </footer>
    </div>
  );
}
