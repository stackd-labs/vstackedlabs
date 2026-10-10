import { createClient } from '@supabase/supabase-js'

export function createServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !key) return null

  // On the Stackd collective project the site's tables live in the `dash` schema
  // (NEXT_PUBLIC_DB_SCHEMA, written by _tools/collective-env). Unset = `public`, as before.
  const schema = process.env.NEXT_PUBLIC_DB_SCHEMA

  return createClient(url, key, {
    auth: { persistSession: false },
    ...(schema ? { db: { schema } } : {}),
  })
}
