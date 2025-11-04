import React from 'react';
import { motion } from 'framer-motion';

export default function Gallery({ images }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.5rem', margin: '2rem 0' }}>
      {images.map((img, i) => (
        <motion.div
          key={i}
          whileHover={{ scale: 1.06, boxShadow: '0 2px 24px #d7b6ef' }}
          transition={{ duration: 0.4 }}>
          <img src={img} alt={`Couple ${i + 1}`} style={{ width: '100%', borderRadius: '1rem', height: '210px', objectFit: 'cover' }} />
        </motion.div>
      ))}
    </div>
  );
}
