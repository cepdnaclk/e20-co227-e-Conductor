import React from 'react';
import { motion } from 'framer-motion';

export function ViewFadeIn({ children, duration = 1000, delay = 0, sx }){
  return (
    <motion.div
      initial={{ opacity: 0 }}
      transition={{ duration:duration/1000, delay:delay/1000 }}
      whileInView={{ opacity: 1 }}
      style={sx}
    >
      {children}
    </motion.div>
  );
};

export function ViewFlyInX({ direction = 'left', duration = 1000, delay = 0, children, sx}){
  return (
    <motion.div
      initial={{ x: direction === 'left' ? -100 : 100, opacity: 0 }}
      whileInView={{ x:0, opacity:1 }} 
      transition={{ duration:duration/1000, delay:delay/1000 }}
      style={sx}
    >
      {children}
    </motion.div>
  );
};

export function ViewFlyInY({ direction = 'top', duration = 1000, delay = 0, children, sx}){
  return (
    <motion.div
      initial={{ y: direction === 'top' ? -100 : 100, opacity: 0 }}
      whileInView={{y:0, opacity:1}}
      transition={{ duration:duration/1000, delay:delay/1000 }}
      style={sx}
    >
      {children}
    </motion.div>
  );
};

export function ViewZoomIn({ children, duration = 1000, delay = 0, sx }){
  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ duration:duration/1000, delay:delay/1000 }}
      style={sx}
    >
      {children}
    </motion.div>
  );
};