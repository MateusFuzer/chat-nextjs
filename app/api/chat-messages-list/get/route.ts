 
export async function GET() {
  const res = await fetch('http://localhost:3006/get_messages')

  if( !res.ok ){
    const errorText = await res.json()
    return new Response(
      JSON.stringify({ error: errorText }),
      {
        status: res.status,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
  const data = await res.json()
  return Response.json({ data })
}