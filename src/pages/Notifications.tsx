import React from 'react';

function Notifications() {
  // Mock notifications data
  const notifications = [
    {
      id: 1,
      title: "New article in Technology",
      message: "Check out the latest article about AI advancements",
      time: "2 hours ago"
    },
    {
      id: 2,
      title: "Article saved",
      message: "You saved 'Space Exploration Milestone'",
      time: "5 hours ago"
    }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Notifications</h1>
      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-2">{notification.title}</h2>
            <p className="text-gray-600 mb-2">{notification.message}</p>
            <span className="text-sm text-gray-500">{notification.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notifications;