import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { phoneNumber, amount, accountReference, transactionDescription } = req.body;
      const consumerKey = '9iNfXNwrIRczSw0t9GqR3BH66Zv955Rg';
      const consumerSecret = '5qWzpO2S41vonBPh';
      const shortcode ='174379'
      const initiatorName = 'testapi';
      const securityCredential = 'DguE7dkRTk1E2RYn0BaPUkctvAOqBa2U2sCSt0BuJ/mfoxZUH0iCNgVKDoGh8/4fEyMOzpCJz4DTqaDn1nFdzhFCqfJ6mnGHVTsmodF2ZrnW/7NomMkFpvQf9E0u8098pEMVuRnvgiGqquVJihlZT/f0CDKtsTr6QuDSl9fPGyw7aLNTUY90JY0knOhwbCCZyG46yzXMSikOkH4IpgaDJwKEW9d+mtrAicNWb/wSkjPCmCWhw9Ih++TeexgYAfXu3hi2Z/ZVT/OJAhedD59q7L03jy48821zP3IZ1giIyhUP0e0Q7VdRS2RcxxxMtWoT8j/htZ9jfm+ZEOld+A+5bQ==';
      const queueTimeOutURL = 'https://mydomain.com/b2c/queue';
      const resultURL = 'https://mydomain.com/b2c/result';

      // Generate the access token
      const { data: { access_token } } = await axios.get('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
        headers: {
          Authorization: `Basic ${Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64')}`,
        },
      });

      // request payload
      const payload = {
        InitiatorName: initiatorName,
        SecurityCredential: securityCredential,
        CommandID: 'BusinessPayment',
        Amount: amount,
        PartyA: shortcode,
        PartyB: phoneNumber,
        Remarks: transactionDescription,
        QueueTimeOutURL: queueTimeOutURL,
        ResultURL: resultURL,
        Occasion: accountReference,
        
      };

      // B2C request
      const { data } = await axios.post(
        'https://sandbox.safaricom.co.ke/mpesa/b2c/v1/paymentrequest',
        payload,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('B2C payment request sent successfully', data)
      res.status(200).json({ success: true, message: 'B2C payment request sent successfully' });
    } catch (error) {
      console.error('Failed to send B2C payment request:', error);
      res.status(500).json({ success: false, message: 'Failed to send B2C payment request' });
    }
  } else {
    res.status(404).end();
  }
}