import { motion } from 'framer-motion';

export default function WorkshopDetailsCard({ workshop, onRegister }) {
  return (
    <motion.div
      className="workshop-details-card"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2>{workshop.name}</h2>
      <p><strong>Speaker:</strong> {workshop.speaker}</p>
      <p><strong>Date:</strong> {workshop.date}</p>
      <p><strong>Description:</strong> {workshop.description}</p>
      <p><strong>Agenda:</strong> {workshop.agenda}</p>
      <p><strong>Speaker Bio:</strong> {workshop.speakerBio}</p>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="btn"
        onClick={onRegister}
      >
        Register for this Workshop
      </motion.button>
    </motion.div>
  );
}
