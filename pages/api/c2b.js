import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { amount, phoneNumber } = req.body;
      const consumerKey = '9iNfXNwrIRczSw0t9GqR3BH66Zv955Rg';
      const consumerSecret = '5qWzpO2S41vonBPh';
      const shortcode = '174379';
      const confirmationURL = 'https://mydomain.com/confirmation';
      const validationURL = 'https://mydomain.com/validation';

      const { data: { access_token } } = await axios.get(
        'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
        {
          headers: {
            Authorization: `Basic ${Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64')}`,
          },
        }
      );

      const payloadRequest = {
        ShortCode: shortcode,
        ResponseType: 'Completed',
        ConfirmationURL: confirmationURL,
        ValidationURL: validationURL,
      };

      
      await axios.post('https://sandbox.safaricom.co.ke/mpesa/c2b/v1/registerurl', payloadRequest, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
      });

      //  c2b request payload
      const payload = {
        ShortCode: shortcode,
        CommandID: 'CustomerBuyGoodsOnline',
        Amount: amount,
        Msisdn: phoneNumber,
        BillRefNumber: 'C2B Payment',
      };

      //C2B request
      const { data: responseData } = await axios.post(
        'https://sandbox.safaricom.co.ke/mpesa/c2b/v1/simulate',
        payload,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('C2B payment sent successfully', responseData);
      res.status(200).json({ success: true, message: 'C2B payment sent successfully' });
    } catch (error) {
      console.error('Failed to send C2B payment:', error);
      res.status(500).json({ success: false, message: 'Failed to send C2B payment' });
    }
  } else {
    res.status(404).json({ success: false, message: 'Invalid request method' });
  }
}