import { motion } from "framer-motion";

const GlassCard = ({ title, icon: Icon, children, delay = 0, className = "" }) => (
  <motion.section
    initial={{ opacity: 0, y: 28 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.45, delay }}
    whileHover={{ y: -4 }}
    className={`rounded-2xl border border-white/20 bg-panel p-5 shadow-glass backdrop-blur-xl ${className}`}
  >
    {title ? (
      <div className="mb-4 flex items-center gap-2">
        {Icon ? <Icon className="h-5 w-5 text-indigo-200" /> : null}
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>
    ) : null}
    {children}
  </motion.section>
);

export default GlassCard;
