import { sql } from '@vercel/postgres';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { action, email, name, company, sector, avatar, level, current_experience, challenges_completed, current_streak, unlocked_badges, new_password, weekly_history, featured_badge_id } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'User email is required' });
  }

  try {
    if (action === 'update') {
      const dbBadgesFormat = `{${(unlocked_badges || []).map((b: string) => `"${b}"`).join(',')}}`;
      const dbHistoryFormat = `{${(weekly_history || [0,0,0,0,0,0,0]).join(',')}}`;
      await sql`
        UPDATE users 
        SET level = ${level},
            current_experience = ${current_experience},
            challenges_completed = ${challenges_completed},
            current_streak = ${current_streak},
            unlocked_badges = ${dbBadgesFormat},
            weekly_history = ${dbHistoryFormat},
            featured_badge_id = ${featured_badge_id || null}
        WHERE email = ${email};
      `;
      return res.status(200).json({ success: true });
    } else if (action === 'update_profile') {
      await sql`
        UPDATE users 
        SET name = ${name},
            company = ${company},
            sector = ${sector},
            avatar = ${avatar}
        WHERE email = ${email};
      `;
      return res.status(200).json({ success: true });
    } else if (action === 'change_password') {
      await sql`
        UPDATE users 
        SET password = ${new_password}
        WHERE email = ${email};
      `;
      return res.status(200).json({ success: true });
    } else {
      return res.status(400).json({ error: 'Invalid action' });
    }
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
