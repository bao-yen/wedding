import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

interface WishData {
  name: string;
  message: string;
  timestamp?: string;
}

interface Wish {
  timestamp: string;
  name: string;
  message: string;
}

// POST /api/submit-wish
app.post('/api/submit-wish', async (req, res) => {
  try {
    const { name, message }: WishData = req.body;

    if (!name || !message) {
      return res.status(400).json({ error: 'Name and message are required' });
    }

    const SHEET_ID = process.env.GOOGLE_SHEET_ID;
    const GOOGLE_API_KEY = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY;

    if (!SHEET_ID || !GOOGLE_API_KEY || !GOOGLE_PRIVATE_KEY) {
      console.error('Missing Google Sheets configuration');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    const { google } = await import('googleapis');

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: GOOGLE_API_KEY,
        private_key: GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    const timestamp = new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
    const values = [[timestamp, name, message]];

    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: 'Sheet1!A:C',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values,
      },
    });

    return res.status(200).json({
      success: true,
      message: 'Lời chúc đã được gửi thành công!'
    });

  } catch (error) {
    console.error('Error submitting wish:', error);
    return res.status(500).json({
      error: 'Failed to submit wish',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// GET /api/get-wishes
app.get('/api/get-wishes', async (req, res) => {
  try {
    const SHEET_ID = process.env.GOOGLE_SHEET_ID;
    const GOOGLE_API_KEY = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY;

    if (!SHEET_ID || !GOOGLE_API_KEY || !GOOGLE_PRIVATE_KEY) {
      console.error('Missing Google Sheets configuration');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    const { google } = await import('googleapis');

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: GOOGLE_API_KEY,
        private_key: GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: 'Sheet1!A:C',
    });

    const rows = response.data.values;

    if (!rows || rows.length === 0) {
      return res.status(200).json({
        success: true,
        wishes: [],
      });
    }

    const wishes: Wish[] = rows
      .filter(row => row.length >= 3)
      .map(row => ({
        timestamp: row[0] || '',
        name: row[1] || '',
        message: row[2] || '',
      }))
      .reverse();

    return res.status(200).json({
      success: true,
      wishes,
      total: wishes.length,
    });

  } catch (error) {
    console.error('Error fetching wishes:', error);
    return res.status(500).json({
      error: 'Failed to fetch wishes',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Dev API server running on http://localhost:${PORT}`);
  console.log(`📝 Submit wishes: POST http://localhost:${PORT}/api/submit-wish`);
  console.log(`📖 Get wishes: GET http://localhost:${PORT}/api/get-wishes`);
});
