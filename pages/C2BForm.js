import { useState } from 'react';
import { useRouter } from 'next/router';

export default function C2BPayment() {
  const [amount, setAmount] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');

  const router = useRouter();

  const Goback =() =>{
    router.push("./")
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/c2b', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount, phoneNumber }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
      } else {
        setMessage('Failed to send C2B payment');
      }
    } catch (error) {
      setMessage('Failed to send C2B payment');
      console.error(error);
    }
  };

 
    return (
      <div
      
      >
        <form
          onSubmit={handleSubmit}

        >
            <label>
            Amount:
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            
            />
          </label>
          <label style={{ marginBottom: '10px' }}>
            Phone Number:
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
          
            />
          </label>
        
          <button
            type="submit"
          
          >
            Send C2B Payment
          </button>
        </form>
  
        <p>{message}</p>
        <button
          onClick={Goback}
        
        >
          GO BACK
        </button>
      </div>
    );
  
}