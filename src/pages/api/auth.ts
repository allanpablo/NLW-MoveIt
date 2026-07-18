import { sql } from '@vercel/postgres';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { action, name, email, password, company, sector, avatar } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    if (action === 'signup') {
      const existingUser = await sql`
        SELECT * FROM users WHERE email = ${email};
      `;

      if (existingUser.rows.length > 0) {
        return res.status(400).json({ error: 'Usuário já cadastrado' });
      }

      await sql`
        INSERT INTO users (email, password, name, company, sector, level, current_experience, challenges_completed, current_streak, unlocked_badges, avatar)
        VALUES (${email}, ${password}, ${name}, ${company}, ${sector}, 1, 0, 0, 0, '{}', ${avatar});
      `;

      const newUser = await sql`
        SELECT * FROM users WHERE email = ${email};
      `;

      return res.status(201).json({ user: newUser.rows[0] });
    } else if (action === 'signin') {
      const result = await sql`
        SELECT * FROM users WHERE email = ${email} AND password = ${password};
      `;

      if (result.rows.length === 0) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
      }

      return res.status(200).json({ user: result.rows[0] });
    } else {
      return res.status(400).json({ error: 'Invalid action' });
    }
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
