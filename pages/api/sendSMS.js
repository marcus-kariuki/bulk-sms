const Africastalking = require("africastalking");
import pool from "@/models/database";

const apiKey =
  "119150d2a769db18879f04790d9e1669ce29c23d937df2a5167af7f31df0a402";
const username = "sandbox";

const atsclient = Africastalking({
  apiKey: apiKey,
  username: username,
});

module.exports = async function sendSMS(req, res) {
  const { recipient, message } = req.body;

  try {
    // Sending the SMS message
    const sms = atsclient.SMS;
    const response = await sms.send({
      to: recipient,
      message: message,
    });
    const client = await pool.connect();
    const query = `insert into sentsms (recipient, message)
                    values ($1, $2)`;
    const result = await client.query(query, [recipient, message]);
    console.log("result:", result);
    let SentMessages = "";
    if (result && result.rows && result.rows.length > 0) {
      SentMessages = result.rows[0];
    }
    client.release();
    console.log(response);
    console.log(SentMessages);
    res.status(200).json({ success: true, response: "SMS sent successfully" });
  } catch (error) {
    console.error(error);
    // Send an error response
    res.status(500).json({ success: false, response: "Failed to send SMS" });
  }
};
