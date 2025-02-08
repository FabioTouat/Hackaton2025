
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/services/api";

const Index = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["mainData"],
    queryFn: fetchData,
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-sage-50 to-sage-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 py-16"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <span className="inline-block px-3 py-1 text-sm bg-sage-200 text-sage-800 rounded-full mb-4">
            Welcome to VegIA
          </span>
          <h1 className="text-5xl font-bold text-sage-900 mb-6">
            Intelligent Vegetation Analysis
          </h1>
          <p className="text-xl text-sage-700 max-w-2xl mx-auto mb-12">
            Transforming agricultural intelligence with advanced AI technology
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16"
        >
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-soft"
            >
              <div className="h-12 w-12 bg-sage-100 rounded-xl mb-6"></div>
              <h3 className="text-xl font-semibold text-sage-800 mb-4">
                Feature {i}
              </h3>
              <p className="text-sage-600">
                Experience the future of agricultural analysis with our cutting-edge
                AI solutions.
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Index;
