import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Papa from 'papaparse';

export default function SendSMSForm() {
  const [recipients, setRecipients] = useState([]);
  const [message, setMessage] = useState('');
  // const [from, setFrom] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    Papa.parse(recipients, {
      step: function(results) {
        const csv = results.data
        console.log('csv:', csv);
        csv.forEach(async (element) => {
          const recipient = element
          const response = await fetch('/api/sendSMS', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ recipient, message }),
          });
          if (response.ok) {
            // SMS sent successfully
            console.log('SMS sent successfully');
          } else {
            // Failed to send SMS
            console.log('Failed to send SMS');
          }
        })
      }
    })
    // Reset the form fields
    setRecipients([ ]);
    setMessage('');
    // setFrom('');
  };
  return (
    <form className="bg-primary p-4 rounded-lg" onSubmit={handleSubmit}>
    <div className="form-group mb-3">
      <label htmlFor="file" className="text-white">
        Upload File:
      </label>
      <br />
      <input
        type="file"
        id="file"
        name="file"
        accept=".csv"
        onChange={(e) => setRecipients(e.target.files[0])}
        required
        className="form-control"
        style={{ fontSize: "18px" }}
      />
    </div>
    <div className="form-group mb-3">
      <label htmlFor="message" className="text-white">
        Message:
      </label>
      <br />
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
        className="form-control"
      />
    </div>
    {/* <div className="form-group mb-3">
      <label htmlFor="from" className="text-white">
        From:
      </label>
      <br />
      <input
        type="text"
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        required
        className="form-control"
      />
    </div> */}
    <button type="submit" className="btn btn-primary">
      Send SMS
    </button>
  </form>
  );
}