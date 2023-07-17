import { useState } from 'react';
import { useRouter } from 'next/router';

export default function B2CForm() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [accountReference, setAccountReference] = useState('');
  const [transactionDescription, setTransactionDescription] = useState('');
  const [message, setMessage] = useState('');

  const router =useRouter();

  const Goback =() =>{
    router.push("./")
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/b2c', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber,
          amount,
          accountReference,
          transactionDescription,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
      } else {
        setMessage('Failed to send B2C payment request');
      }
    } catch (error) {
      setMessage('Failed to send B2C payment request');
      console.error(error);
    }
  };

  return (
    <div>
    <form
      onSubmit={handleSubmit}
      className="bg-dark p-4 rounded-lg"
      style={{ width: "300px" }}
    >
      <div className="form-group mb-3">
        <label className="text-white">Phone Number:</label>
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="form-group mb-3">
        <label className="text-white">Amount:</label>
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="form-group mb-3">
        <label className="text-white">Account Reference:</label>
        <input
          type="text"
          value={accountReference}
          onChange={(e) => setAccountReference(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="form-group mb-3">
        <label className="text-white">Transaction Description:</label>
        <input
          type="text"
          value={transactionDescription}
          onChange={(e) => setTransactionDescription(e.target.value)}
          className="form-control"
        />
      </div>
      <button type="submit" className="btn btn-primary mt-2">
        Send B2C Payment
      </button>
    </form>
    <p>{message}</p>
    <button
      onClick={Goback}
      className="btn btn-primary"
      style={{
        fontSize: "24px",
        borderRadius: "20px",
        padding: "8px",
        color: "#fff",
        width: "200px",
        backgroundColor: "#1589FF",
        border: "none",
      }}
    >
      home
    </button>
  </div>
  );
}