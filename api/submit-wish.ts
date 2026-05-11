import type { VercelRequest, VercelResponse } from '@vercel/node';

interface WishData {
  name: string;
  message: string;
  timestamp?: string;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, message }: WishData = req.body;

    // Validate input
    if (!name || !message) {
      return res.status(400).json({ error: 'Name and message are required' });
    }

    // Get Google Sheets credentials from environment variables
    const SHEET_ID = process.env.GOOGLE_SHEET_ID;
    const GOOGLE_API_KEY = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY;

    if (!SHEET_ID || !GOOGLE_API_KEY || !GOOGLE_PRIVATE_KEY) {
      console.error('Missing Google Sheets configuration');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // Import Google APIs dynamically
    const { google } = await import('googleapis');

    // Create auth client
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: GOOGLE_API_KEY,
        private_key: GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // Prepare data to append
    const timestamp = new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
    const values = [[timestamp, name, message]];

    // Append to sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: 'Sheet1!A:C', // Using Sheet1 as requested
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
}
