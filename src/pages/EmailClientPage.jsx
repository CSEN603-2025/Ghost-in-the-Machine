import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmailFilter from '../components/EmailFilter';
import EmailItem from '../components/EmailItem';
import EmailContent from '../components/EmailContent';

const EmailClientPage = () => {
  const navigate = useNavigate();
  const folders = ['Inbox', 'Sent', 'Drafts', 'Spam'];
  const dummyEmails = [
    { id: 1, folder: 'Inbox', sender: 'John Doe', subject: 'Meeting Reminder', snippet: "Don't forget our meeting at 3 PM.", time: '9:00 AM', body: 'Hi there,\nJust a reminder about our meeting scheduled at 3 PM today in conference room A.\nBest, John' },
    { id: 2, folder: 'Inbox', sender: 'Jane Smith', subject: 'Project Update', snippet: 'The project is on track...', time: '8:30 AM', body: 'Hello team,\nThe project is on track and we completed the first milestone.\nRegards, Jane' },
    { id: 3, folder: 'Sent', sender: 'You', subject: 'Re: Meeting Reminder', snippet: 'Thanks for the heads up...', time: '9:05 AM', body: 'Thanks for the heads up, John. I will be there.\nCheers,' },
    { id: 4, folder: 'Drafts', sender: 'You', subject: 'Draft: Weekly Report', snippet: 'Summary of this week...', time: 'Yesterday', body: 'Draft content goes here...' },
    { id: 5, folder: 'Spam', sender: 'Spam Bot', subject: 'You won a prize!', snippet: 'Click this link...', time: 'Today', body: 'Congratulations! Click here to claim your prize.' },
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

  const handleHome = () => navigate('/');
  const handleLogout = () => navigate('/login');

  return (
    <div className="min-h-screen bg-[#EAEAEA]">
      <div className="w-full bg-[#00106A] py-6 px-6 flex items-center justify-between">
        <div className="w-1/3" />
        <div className="w-1/3 text-center">
          <h1 className="text-3xl font-bold text-white">Email Client</h1>
        </div>
        <div className="w-1/3 flex justify-end space-x-4">
          <button
            onClick={handleHome}
            className="bg-gradient-to-r from-[#00F0B5] to-[#00D6A0] hover:from-[#00D6A0] hover:to-[#00F0B5] text-black font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300"
          >
            Home
          </button>
          <button
            onClick={handleLogout}
            className="bg-gradient-to-r from-red-500 to-red-400 hover:from-red-600 hover:to-red-500 text-white py-2 px-4 rounded-lg shadow-md transition-all duration-300"
          >
            Logout
          </button>
        </div>
      </div>

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