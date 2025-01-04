import React, { useState } from "react";
import { Helmet } from "react-helmet";
import {
  Clock,
  BarChart2,
  Download,
  Eye,
  UserMinus,
  Shield,
  X,
} from "lucide-react";

// Custom Dialog Component
const Dialog = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg max-w-md w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>
        {children}
      </div>
    </div>
  );
};

const WinstagramLanding = () => {
  const [showLoginDialog, setShowLoginDialog] = useState(false);

  const handleGetStarted = () => {
    setShowLoginDialog(true);
  };

  const scrollToJourney = () => {
    setShowLoginDialog(false);
    window.location.href = "/instagram-login";
  };

  const handleLearnMore = () => {
    const learnMoreSection = document.getElementById("learn-more");
    if (learnMoreSection) {
      learnMoreSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Helmet>
        <title>Winstagram - Take Control of Your Instagram Experience</title>
        <link rel="icon" type="image/png" href="/winstagram.png" />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
        {/* Navbar */}
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <img
              src="/winstagram.png"
              alt="Winstagram Logo"
              className="h-10 w-auto object-contain"
            />
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
              Winstagram
            </span>
          </div>
        </nav>

        {/* Hero Section */}
        <header className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text leading-relaxed py-2">
            Take Control of Your Instagram Experience
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            For all those W's who need modular control over their Instagram.
            Stop doom scrolling, track your engagement, and build healthier
            social media habits.
          </p>
          <button
            onClick={handleGetStarted}
            className="bg-purple-600 text-white px-8 py-3 rounded-full text-lg font-semibold 
            hover:bg-purple-700 transition-colors mr-4"
          >
            Get Started
          </button>
          <button
            onClick={handleLearnMore}
            className="border-2 border-purple-600 text-purple-600 px-8 py-3 rounded-full text-lg 
            font-semibold hover:bg-purple-50 transition-colors"
          >
            Learn More
          </button>
        </header>

        {/* Learn More Section */}
        <section id="learn-more" className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-8">
            Why Choose Winstagram?
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-4">Smart Management</h3>
              <p className="text-gray-600">
                Our intelligent algorithms help you manage your Instagram usage
                effectively, providing insights and controls that Instagram
                doesn't offer natively.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-4">Data Privacy</h3>
              <p className="text-gray-600">
                Your data stays with you. We prioritize your privacy and
                security, ensuring your Instagram data is stored locally and
                securely.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-4">Engagement Boost</h3>
              <p className="text-gray-600">
                Understand your audience better with detailed analytics and
                insights that help you optimize your content strategy.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-4">Mental Wellness</h3>
              <p className="text-gray-600">
                Build healthier social media habits with our comprehensive suite
                of wellness tools and time management features.
              </p>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Clock className="w-8 h-8 text-purple-600" />}
              title="Smart Time Limits"
              description="Set custom time limits for different activities. Once you hit your limit, take a break and focus on what matters."
            />
            <FeatureCard
              icon={<BarChart2 className="w-8 h-8 text-purple-600" />}
              title="Detailed Analytics"
              description="Get comprehensive insights about your Instagram activity, engagement rates, and audience behavior."
            />
            <FeatureCard
              icon={<Download className="w-8 h-8 text-purple-600" />}
              title="Local Backup"
              description="Download and save your favorite Instagram content locally for offline access and better organization."
            />
            <FeatureCard
              icon={<Eye className="w-8 h-8 text-purple-600" />}
              title="Profile Visitors"
              description="Track who viewed your profile and understand your audience better than ever before."
            />
            <FeatureCard
              icon={<UserMinus className="w-8 h-8 text-purple-600" />}
              title="Unfollower Tracking"
              description="Stay informed about who unfollowed you and when, with detailed timeline analysis."
            />
            <FeatureCard
              icon={<Shield className="w-8 h-8 text-purple-600" />}
              title="Digital Wellbeing"
              description="Build healthier social media habits with our comprehensive suite of wellness tools."
            />
          </div>
        </section>

        {/* Statistics Section */}
        <section className="bg-purple-900 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <StatCard number="2hr" text="Average Time Saved Daily" />
              <StatCard number="40%" text="Reduction in Mindless Scrolling" />
              <StatCard number="89%" text="Users Report Better Focus" />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section
          id="start-journey"
          className="container mx-auto px-4 py-16 text-center"
        >
          <h2 className="text-3xl font-bold mb-6">Ready to Take Control?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of users who have transformed their Instagram
            experience with Winstagram.
          </p>
          <button
            onClick={() => (window.location.href = "/instagram-login")}
            className="bg-purple-600 text-white px-8 py-3 rounded-full text-lg font-semibold 
            hover:bg-purple-700 transition-colors"
          >
            Start Your Journey
          </button>
        </section>

        {/* Footer */}
        <footer className="bg-gray-50 py-8">
          <div className="container mx-auto px-4 text-center text-gray-600">
            <p>© 2025 Winstagram. All rights reserved.</p>
          </div>
        </footer>

        {/* Custom Login Dialog */}
        <Dialog
          isOpen={showLoginDialog}
          onClose={() => setShowLoginDialog(false)}
        >
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">
              Instagram Login Required
            </h2>
            <p className="text-gray-600 mb-6">
              To get started with Winstagram, you'll need to connect your
              Instagram account. This helps us provide you with personalized
              analytics and controls.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowLoginDialog(false)}
                className="text-gray-500 hover:text-gray-700 px-4 py-2"
              >
                Cancel
              </button>
              <button
                onClick={scrollToJourney}
                className="bg-purple-600 text-white px-6 py-2 rounded-full font-semibold 
                hover:bg-purple-700 transition-colors"
              >
                Connect Instagram
              </button>
            </div>
          </div>
        </Dialog>
      </div>
    </>
  );
};

// Feature Card Component
const FeatureCard = ({ icon, title, description }) => (
  <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

// Statistic Card Component
const StatCard = ({ number, text }) => (
  <div>
    <div className="text-4xl font-bold mb-2">{number}</div>
    <div className="text-purple-200">{text}</div>
  </div>
);

export default WinstagramLanding;
