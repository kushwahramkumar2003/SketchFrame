import React from "react";
import { motion } from "framer-motion";
import { Slack, Github, Figma, Option as Notion } from "lucide-react";

const integrations = [
  {
    icon: <Slack className="h-8 w-8" />,
    name: "Slack",
    description: "Share sketches directly to your Slack channels",
  },
  {
    icon: <Github className="h-8 w-8" />,
    name: "GitHub",
    description: "Attach drawings to issues and pull requests",
  },
  {
    icon: <Figma className="h-8 w-8" />,
    name: "Figma",
    description: "Import and export designs seamlessly",
  },
  {
    icon: <Notion className="h-8 w-8" />,
    name: "Notion",
    description: "Embed sketches in your Notion workspace",
  },
];

const Integrations = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            Seamless Integrations
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600"
          >
            Connect SketchFrame with your favorite tools
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {integrations.map((integration, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
            >
              <div className="text-indigo-600 mb-4">{integration.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {integration.name}
              </h3>
              <p className="text-gray-600">{integration.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Integrations;
