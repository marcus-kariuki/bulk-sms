import { Pool } from 'pg';

const pool = new Pool({
  user: 'marcus',
  host: 'localhost',
  database:'sms', 
  password: 'newpass',

});

export default pool;