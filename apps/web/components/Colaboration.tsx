import React from "react";
import { motion } from "framer-motion";

const Collaboration = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-4xl font-bold text-gray-900">
              Collaborate Like Never Before
            </h2>
            <p className="text-xl text-gray-600">
              Experience real-time collaboration that feels natural and
              intuitive. See your team's cursors, changes, and annotations
              instantly as you work together.
            </p>
            <blockquote className="text-lg italic text-gray-600 border-l-4 border-indigo-600 pl-4">
              "SketchFrame transformed how our team brainstorms ideas. It's like
              having everyone in the same room, even when we're miles apart!"
              <footer className="mt-2 text-sm text-gray-500">
                - Sarah Chen, Product Designer at Dropbox
              </footer>
            </blockquote>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=80"
              alt="Collaboration Demo"
              className="relative rounded-lg shadow-2xl transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Collaboration;
