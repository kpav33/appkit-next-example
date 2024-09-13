"use client";

import React, { useState } from "react";

export default function SendNotification() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const sendNotification = async () => {
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch("/api/notify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          notification: {
            title,
            body,
            url: "https://app.example.com", // example URL for the notification
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send notification");
      }

      setSuccess(true);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || "Something went wrong");
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const enviroment = process.env.NODE_ENV === "development";

  if (!enviroment) {
    return (
      <div className="max-w-md mx-auto p-6 bg-gray-100 shadow-md rounded-md">
        <p className="text-gray-700">
          The notification feature is only available in development mode.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-100 shadow-md rounded-md">
      <h1 className="text-xl font-semibold mb-4">Send Notification</h1>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Enter notification title"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Body
        </label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Enter notification body"
        />
      </div>

      <button
        onClick={sendNotification}
        className={`w-full bg-blue-500 text-white p-2 rounded-md ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={loading}
      >
        {loading ? "Sending..." : "Send Notification"}
      </button>

      {success && (
        <p className="text-green-600 mt-4">Notification sent successfully!</p>
      )}
      {error && <p className="text-red-600 mt-4">Error: {error}</p>}
    </div>
  );
}
