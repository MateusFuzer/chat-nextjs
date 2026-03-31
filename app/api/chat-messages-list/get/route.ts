 
export async function GET() {
  const res = await fetch('http://localhost:3006/get_messages')

  if( !res.ok ){
    return Response.json( res.status)
  }
  const data = await res.json()
  return Response.json({ data })
}