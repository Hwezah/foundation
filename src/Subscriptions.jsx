import React, { useState } from "react";
import Button from "./Button";
import Card, { CardContent } from "./Card";
import { useForm } from "react-hook-form";
export default function SubscriptionForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { register, errors, handleSubmit } = useForm();
  function onSubmit(data) {
    // 👉 Add your API call here
    console.log(data);
    setSubmitted(true);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <Card className="w-full max-w-md p-6 shadow-lg border border-gray-200 rounded-2xl">
        <CardContent>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Subscribe to our Newsletter
          </h2>
          <p className="text-gray-500 mb-6 text-sm">
            Get the latest updates, offers, and news straight to your inbox.
          </p>
          {submitted ? (
            <div className="bg-green-50 text-green-700 text-sm px-4 py-3 rounded-lg">
              ✅ Thank you for subscribing!
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <input
                {...register("email")}
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 bg-white placeholder-gray-400 transition"
              />
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-sm font-medium transition-colors"
              >
                Subscribe
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
