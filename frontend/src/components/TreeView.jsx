import { AnimatePresence, motion } from "framer-motion";

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.09
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 }
};

const TreeNode = ({ name, node }) => {
  const children = Object.entries(node || {});

  return (
    <motion.li variants={itemVariants} className="relative pl-5">
      <span className="absolute left-0 top-3 h-px w-3 bg-white/50" />
      <div className="inline-flex rounded-lg bg-white/20 px-3 py-1 text-sm font-medium text-white">
        {name}
      </div>
      {children.length > 0 && (
        <motion.ul
          variants={listVariants}
          initial="hidden"
          animate="visible"
          className="ml-3 mt-2 space-y-2 border-l border-white/40 pl-4"
        >
          {children.map(([childName, childNode]) => (
            <TreeNode key={`${name}-${childName}`} name={childName} node={childNode} />
          ))}
        </motion.ul>
      )}
    </motion.li>
  );
};

const TreeView = ({ tree }) => {
  const roots = Object.entries(tree || {});

  return (
    <AnimatePresence>
      <motion.ul
        variants={listVariants}
        initial="hidden"
        animate="visible"
        className="space-y-2"
      >
        {roots.map(([rootName, rootNode]) => (
          <TreeNode key={rootName} name={rootName} node={rootNode} />
        ))}
      </motion.ul>
    </AnimatePresence>
  );
};

export default TreeView;
