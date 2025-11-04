import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { db } from '../firebase';
import { collection, addDoc } from "firebase/firestore";

export default function RSVPForm() {
  const [form, setForm] = useState({ name: '', guests: 1, message: '' });
  const [done, setDone] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "rsvp"), form);
    setDone(true);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      style={{
        margin: '2rem auto', maxWidth: '470px', boxShadow: '0 4px 32px #f7e6fa', borderRadius: '1rem', background: '#ffffffcf', padding: '2rem', textAlign: 'center'
      }}
      onSubmit={handleSubmit}>
      <h2 style={{ color: '#b94c96', margin: '0 0 1rem' }}>RSVP</h2>
      <input required placeholder="Your Name" value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })} style={{ width: '100%', marginBottom: '1rem' }} /><br />
      <input required type="number" min="1" placeholder="Guests" value={form.guests}
        onChange={e => setForm({ ...form, guests: parseInt(e.target.value) })} style={{ width: '100%', marginBottom: '1rem' }} /><br />
      <textarea placeholder="Message" value={form.message}
        onChange={e => setForm({ ...form, message: e.target.value })} style={{ width: '100%', marginBottom: '1rem' }} /><br />
      <motion.button whileTap={{ scale: 0.92 }} type="submit" style={{ padding: '0.6rem 2.4rem', background: '#b94c96', color: '#fff', border: 'none', borderRadius: '2rem', fontSize: '1rem' }}>RSVP</motion.button>
      {done && <motion.h3 initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ marginTop: '1.5rem', color: '#40c66e' }}>Thank you for your RSVP!</motion.h3>}
    </motion.form>
  );
}
