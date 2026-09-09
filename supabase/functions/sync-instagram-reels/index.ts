import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'
import { createClient } from 'npm:@supabase/supabase-js@2'

const MAX_ITEMS = 24

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  const token = Deno.env.get('INSTAGRAM_ACCESS_TOKEN')
  if (!token) {
    return new Response(
      JSON.stringify({ error: 'Instagram access token is not configured' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  )

  try {
    const fields = 'id,caption,media_type,media_url,permalink,thumbnail_url,timestamp'
    const url = `https://graph.instagram.com/me/media?fields=${fields}&limit=${MAX_ITEMS}&access_token=${token}`
    const res = await fetch(url)
    const text = await res.text()
    if (!res.ok) {
      console.error(`Instagram request failed [${res.status}]: ${text}`)
      return new Response(
        JSON.stringify({ error: 'Instagram request failed', status: res.status, details: text }),
        { status: res.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      )
    }

    const payload = JSON.parse(text) as {
      data?: Array<{
        id: string
        caption?: string
        media_type?: string
        media_url?: string
        permalink: string
        thumbnail_url?: string
        timestamp?: string
      }>
    }

    const rows = (payload.data ?? []).slice(0, MAX_ITEMS).map((m) => ({
      ig_id: m.id,
      permalink: m.permalink,
      media_type: m.media_type ?? null,
      media_url: m.media_url ?? null,
      thumbnail_url: m.thumbnail_url ?? m.media_url ?? null,
      caption: m.caption ?? null,
      posted_at: m.timestamp ?? null,
      updated_at: new Date().toISOString(),
    }))

    if (rows.length) {
      const { error } = await supabase
        .from('instagram_reels')
        .upsert(rows, { onConflict: 'permalink' })
      if (error) throw new Error(error.message)
    }

    return new Response(JSON.stringify({ synced: rows.length }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (e) {
    console.error('sync-instagram-reels failed:', e)
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
