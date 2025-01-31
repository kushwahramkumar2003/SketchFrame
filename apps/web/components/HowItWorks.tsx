import React from "react";
import { motion } from "framer-motion";
import { Pen, Share2, Users } from "lucide-react";

const steps = [
  {
    icon: <Pen className="h-8 w-8" />,
    title: "Create a New Project",
    description: "Start with a blank canvas or choose from our templates.",
  },
  {
    icon: <Share2 className="h-8 w-8" />,
    title: "Invite Collaborators",
    description:
      "Share your project link with teammates and start collaborating.",
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: "Sketch & Collaborate",
    description: "Draw, annotate, and brainstorm together in real-time.",
  },
];

const HowItWorks = () => {
  return (
    <section
      id="how-it-works"
      className="py-20 bg-gradient-to-br from-indigo-50 via-white to-purple-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            How It Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600"
          >
            Get started with SketchFrame in three simple steps
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative"
            >
              <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                <div className="text-indigo-600 mb-4">{step.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                  <div className="w-8 h-0.5 bg-gray-300"></div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
