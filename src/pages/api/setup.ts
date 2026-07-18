import { sql } from '@vercel/postgres';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        email VARCHAR(255) PRIMARY KEY,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        company VARCHAR(255) NOT NULL,
        sector VARCHAR(255) NOT NULL,
        level INTEGER DEFAULT 1,
        current_experience INTEGER DEFAULT 0,
        challenges_completed INTEGER DEFAULT 0,
        current_streak INTEGER DEFAULT 0,
        unlocked_badges TEXT[] DEFAULT '{}',
        avatar TEXT,
        weekly_history INTEGER[] DEFAULT '{0,0,0,0,0,0,0}'
      );
      ALTER TABLE users ADD COLUMN IF NOT EXISTS weekly_history INTEGER[] DEFAULT '{0,0,0,0,0,0,0}';
    `;
    return res.status(200).json({ message: "Table users verified/created successfully! 🚀" });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
