import React from 'react';
import { motion } from 'framer-motion';

export default function HeroSection({ mainImage }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      style={{
        background: 'linear-gradient(135deg,#e093ff 0%, #fdf6f0 100%)',
        padding: '4rem 1rem',
        textAlign: 'center',
        borderRadius: '2rem'
      }}>
      <img src={mainImage} style={{ borderRadius: '1rem', maxWidth: '350px', boxShadow:'0 2px 24px #d7b6ef'}} alt="Couple" />
      <h1 style={{
        fontFamily: 'Cursive', fontSize: '2.6rem', color: '#b94c96',
        marginTop: '1.5rem'
      }}>
        Manoj & Geetika <br /> Wedding Invitation
      </h1>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
        Save the Date: 15 December 2025<br/>
        Grand Palace, City Center
      </motion.p>
    </motion.div>
  );
}
