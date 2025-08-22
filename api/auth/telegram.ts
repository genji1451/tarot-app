import type { VercelRequest, VercelResponse } from '@vercel/node'
import { sql } from '@vercel/postgres'
import crypto from 'crypto'

// Verify Telegram initData per https://core.telegram.org/bots/webapps#validating-data-received-via-the-web-app
function verifyTelegramInitData(initData: string, botToken: string): { ok: boolean; data?: URLSearchParams } {
  try {
    const urlSearch = new URLSearchParams(initData)
    const hash = urlSearch.get('hash')
    if (!hash) return { ok: false }

    const dataCheckArr: string[] = []
    urlSearch.forEach((value, key) => {
      if (key !== 'hash') dataCheckArr.push(`${key}=${value}`)
    })
    dataCheckArr.sort()
    const dataCheckString = dataCheckArr.join('\n')

    const secretKey = crypto.createHmac('sha256', 'WebAppData').update(botToken).digest()
    const calculatedHash = crypto.createHmac('sha256', secretKey).update(dataCheckString).digest('hex')

    if (calculatedHash !== hash) return { ok: false }

    return { ok: true, data: urlSearch }
  } catch (e) {
    return { ok: false }
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN
  if (!botToken) {
    return res.status(500).json({ error: 'Server misconfigured: TELEGRAM_BOT_TOKEN not set' })
  }

  const initData = (req.body && typeof req.body === 'string') ? req.body : (typeof req.body?.initData === 'string' ? req.body.initData : '')
  if (!initData) {
    return res.status(400).json({ error: 'Missing initData' })
  }

  const verification = verifyTelegramInitData(initData, botToken)
  if (!verification.ok || !verification.data) {
    return res.status(401).json({ error: 'Invalid auth data' })
  }

  // Extract user data JSON
  const userJson = verification.data.get('user')
  if (!userJson) {
    return res.status(400).json({ error: 'Missing user data' })
  }

  let tgUser: { id: number; first_name: string; last_name?: string; username?: string; is_premium?: boolean }
  try {
    tgUser = JSON.parse(userJson)
  } catch (e) {
    return res.status(400).json({ error: 'Invalid user data' })
  }

  try {
    // Ensure table exists
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        username TEXT,
        is_premium BOOLEAN DEFAULT false,
        karma INTEGER DEFAULT 100,
        referral_code TEXT,
        is_premium_app BOOLEAN DEFAULT false,
        daily_draws_used INTEGER DEFAULT 0,
        last_daily_draw TIMESTAMP NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `

    const id = String(tgUser.id)
    const name = tgUser.first_name + (tgUser.last_name ? ` ${tgUser.last_name}` : '')
    const username = tgUser.username ?? null
    const isPremium = !!tgUser.is_premium
    const referralCode = `REF${id}`

    // Upsert user
    const result = await sql`
      INSERT INTO users (id, name, username, is_premium, karma, referral_code)
      VALUES (${id}, ${name}, ${username}, ${isPremium}, 100, ${referralCode})
      ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name,
        username = EXCLUDED.username,
        is_premium = EXCLUDED.is_premium,
        updated_at = NOW()
      RETURNING id, name, username, is_premium, karma, referral_code, daily_draws_used, last_daily_draw;
    `

    const row = result.rows[0]

    // Map to frontend `User` shape minimal fields; the client will fill rest/defaults
    const user = {
      id: row.id as string,
      name: row.name as string,
      isPremium: (row.is_premium as boolean) || false,
      karma: (row.karma as number) ?? 100,
      referralCode: (row.referral_code as string) ?? referralCode,
      dailyDrawsUsed: (row.daily_draws_used as number) ?? 0,
      lastDailyDraw: row.last_daily_draw ? new Date(row.last_daily_draw as unknown as string).toISOString() : undefined
    }

    return res.status(200).json({ user })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Database error' })
  }
} 