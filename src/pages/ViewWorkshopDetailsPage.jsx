import { motion } from 'framer-motion';
import WorkshopDetailsCard from '../components/WorkshopDetailsCard';

export default function ViewWorkshopDetailsPage() {
  const workshop = {
    name: "CV Masterclass",
    speaker: "Dr. Smith",
    date: "2025-05-20",
    description: "Learn how to craft an outstanding CV to stand out in job applications.",
    agenda: "Intro, CV Tips, Examples, Q&A",
    speakerBio: "Dr. Smith is a career coach with 15 years of experience helping students."
  };

  const handleRegister = () => {
    alert("You registered for the workshop!");
  };

  return (
    <motion.div
      className="workshops-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <WorkshopDetailsCard workshop={workshop} onRegister={handleRegister} />
    </motion.div>
  );
}