import React, { useState, useEffect } from 'react';

export default function WorkshopForm({ onAdd, onUpdate, editWorkshop }) {
  // Local form state—added speakerBio and agenda
  const [name, setName] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [startDateTime, setStartDateTime] = useState('');
  const [endDateTime, setEndDateTime] = useState('');
  const [speakerBio, setSpeakerBio] = useState('');
  const [agenda, setAgenda] = useState('');

  // When editWorkshop changes, populate form
  useEffect(() => {
    if (editWorkshop) {
      setName(editWorkshop.name);
      setShortDesc(editWorkshop.shortDesc);
      setStartDateTime(editWorkshop.startDateTime);
      setEndDateTime(editWorkshop.endDateTime);
      setSpeakerBio(editWorkshop.speakerBio);
      setAgenda(editWorkshop.agenda);
    } else {
      // clear on new
      setName('');
      setShortDesc('');
      setStartDateTime('');
      setEndDateTime('');
      setSpeakerBio('');
      setAgenda('');
    }
  }, [editWorkshop]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      id: editWorkshop ? editWorkshop.id : Date.now(),
      name,
      shortDesc,
      startDateTime,
      endDateTime,
      speakerBio,
      agenda,
    };

    if (editWorkshop) onUpdate(payload);
    else onAdd(payload);

    // reset
    if (!editWorkshop) {
      setName('');
      setShortDesc('');
      setStartDateTime('');
      setEndDateTime('');
      setSpeakerBio('');
      setAgenda('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Workshop Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Workshop Name</label>
        <input
          type="text"
          required
          value={name}
          onChange={e => setName(e.target.value)}
          className="mt-1 block w-full rounded-lg border-gray-300 p-2 shadow-sm"
        />
      </div>

      {/* Short Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Short Description</label>
        <textarea
          required
          value={shortDesc}
          onChange={e => setShortDesc(e.target.value)}
          className="mt-1 block w-full rounded-lg border-gray-300 p-2 shadow-sm"
          rows={2}
        />
      </div>

      {/* Start & End Date/Time */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Start Date & Time</label>
          <input
            type="datetime-local"
            required
            value={startDateTime}
            onChange={e => setStartDateTime(e.target.value)}
            className="mt-1 block w-full rounded-lg border-gray-300 p-2 shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">End Date & Time</label>
          <input
            type="datetime-local"
            required
            value={endDateTime}
            onChange={e => setEndDateTime(e.target.value)}
            className="mt-1 block w-full rounded-lg border-gray-300 p-2 shadow-sm"
          />
        </div>
      </div>

      {/* Speaker Bio */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Speaker Bio</label>
        <textarea
          value={speakerBio}
          onChange={e => setSpeakerBio(e.target.value)}
          className="mt-1 block w-full rounded-lg border-gray-300 p-2 shadow-sm"
          rows={3}
        />
      </div>

      {/* Agenda */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Workshop Agenda</label>
        <textarea
          value={agenda}
          onChange={e => setAgenda(e.target.value)}
          className="mt-1 block w-full rounded-lg border-gray-300 p-2 shadow-sm"
          rows={4}
        />
      </div>

      <button
        type="submit"
        className="bg-gradient-to-r from-[#00F0B5] to-[#00D6A0] text-black font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all"
      >
        {editWorkshop ? 'Update Workshop' : 'Add Workshop'}
      </button>
    </form>
  );
}
