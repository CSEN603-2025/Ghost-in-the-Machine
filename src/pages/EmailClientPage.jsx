import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import EmailFilter from '../components/EmailFilter';
import EmailItem from '../components/EmailItem';
import EmailContent from '../components/EmailContent';
import { motion } from 'framer-motion';

const EmailClientPage = () => {
  const navigate = useNavigate();
  const folders = ['Inbox', 'Sent', 'Drafts', 'Spam'];

  const dummyEmails = [
    { id: 1, folder: 'Inbox', sender: 'John Doe', subject: 'Meeting Reminder', snippet: "Don't forget our meeting at 3 PM.", time: '9:00 AM', body: 'Hi there,\nJust a reminder about our meeting scheduled at 3 PM today in conference room A.\nBest, John' },
    { id: 2, folder: 'Inbox', sender: 'Jane Smith', subject: 'Project Update', snippet: 'The project is on track...', time: '8:30 AM', body: 'Hello team,\nThe project is on track and we completed the first milestone.\nRegards, Jane' },
    { id: 3, folder: 'Sent', sender: 'You', subject: 'Re: Meeting Reminder', snippet: 'Thanks for the heads up...', time: '9:05 AM', body: 'Thanks for the heads up, John. I will be there.\nCheers,' },
    { id: 4, folder: 'Drafts', sender: 'You', subject: 'Draft: Weekly Report', snippet: 'Summary of this week...', time: 'Yesterday', body: 'Draft content goes here...' },
    { id: 5, folder: 'Spam', sender: 'Spam Bot', subject: 'You won a prize!', snippet: 'Click this link...', time: 'Today', body: 'Congratulations! Click here to claim your prize.' },
    { id: 6, folder: 'Inbox', sender: 'Internship Notification System', subject: 'New Applicant Notification!', snippet: 'A new applicant has applied for the DevOps internship position.', time: '10:00 AM', body: 'Dear Team,\nA new applicant "Ahmed Mohamed" has applied for the internship position. Please review their application.\nBest, Internship Notification System' },
  ];

  const [selectedFolder, setSelectedFolder] = useState('Inbox');
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEmails = dummyEmails.filter(email =>
    email.folder === selectedFolder &&
    (email.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
     email.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
     email.snippet.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-[#EAEAEA]">
      {/* Header */}
      <div className="relative w-full bg-gradient-to-r from-[#00106A] to-[#0038A0] py-6 px-6 flex items-center justify-center">
      <motion.button
  onClick={() => navigate(-1)}
  initial={{ opacity: 0, x: -10 }}
  animate={{ opacity: 1, x: 0 }}
  whileHover={{ scale: 1.05, x: -4 }}
  transition={{ duration: 0.3 }}
  className="absolute left-6 top-1/2 transform -translate-y-1/2 flex items-center text-white hover:underline"
>
  <ArrowLeft className="mr-1 w-5 h-5" /> Back
</motion.button>

        {/* Centered title */}
        <h1 className="text-3xl font-bold text-white">Email Client</h1>
      </div>

      {/* Main Layout */}
      <div className="flex px-6 py-6 h-[calc(100vh-5rem)]">
        {/* Left half: filter + email list */}
        <div className="w-1/2 flex flex-col">
          <EmailFilter
            folders={folders}
            selectedFolder={selectedFolder}
            onSelectFolder={folder => { setSelectedFolder(folder); setSelectedEmail(null); }}
            searchTerm={searchTerm}
            onSearchTermChange={setSearchTerm}
          />
          <div className="flex-1 bg-white shadow-lg overflow-auto">
            {filteredEmails.map(email => (
              <EmailItem key={email.id} email={email} onClick={setSelectedEmail} />
            ))}
          </div>
        </div>

        {/* Right half: email content */}
        <div className="w-1/2 flex flex-col">
          <EmailContent email={selectedEmail} />
        </div>
      </div>
    </div>
  );
};

export default EmailClientPage;
