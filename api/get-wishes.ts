import type { VercelRequest, VercelResponse } from '@vercel/node';

export interface Wish {
  timestamp: string;
  name: string;
  message: string;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
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
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // Read data from sheet
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: 'Sheet1!A:C', // Same range as submit-wish.ts
    });

    const rows = response.data.values;

    if (!rows || rows.length === 0) {
      return res.status(200).json({
        success: true,
        wishes: [],
      });
    }

    // Transform rows to wishes array (skip header if exists)
    // Format: [timestamp, name, message]
    const wishes: Wish[] = rows
      .filter(row => row.length >= 3) // Only include rows with all 3 columns
      .map(row => ({
        timestamp: row[0] || '',
        name: row[1] || '',
        message: row[2] || '',
      }))
      .reverse(); // Show newest first

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
}
