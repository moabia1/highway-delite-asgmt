import React from "react";
import Router from "./routes/router";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-white">
      <Navbar />
      <main className="w-full max-w-screen mx-auto px-3 sm:px-6 py-8">
        <Router />
      </main>
    </div>
  );
}
