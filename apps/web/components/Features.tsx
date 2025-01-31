import React from "react";
import { motion } from "framer-motion";
import { Pen, Users, Infinity, Share2 } from "lucide-react";

const features = [
  {
    icon: <Pen className="h-8 w-8" />,
    title: "Intuitive Drawing Tools",
    description:
      "Professional-grade drawing tools that feel natural and responsive.",
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: "Real-Time Collaboration",
    description:
      "Work together seamlessly with real-time updates and live cursors.",
  },
  {
    icon: <Infinity className="h-8 w-8" />,
    title: "Unlimited Canvas",
    description: "Expand your creativity with an infinite drawing space.",
  },
  {
    icon: <Share2 className="h-8 w-8" />,
    title: "Easy Sharing",
    description:
      "Export and share your sketches in multiple formats instantly.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            Why Choose SketchFrame?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600"
          >
            Everything you need to bring your ideas to life
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{
                scale: 1.05,
                background:
                  "linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)",
              }}
              className="group bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-100 transition-all duration-300 hover:border-indigo-200"
            >
              <div className="text-indigo-600 mb-4 transform transition-transform duration-300 group-hover:scale-110">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-indigo-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 rounded-xl transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
