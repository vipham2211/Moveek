import { cookies } from 'next/headers'

export async function GET() {
	const userCookie = cookies().get("REMEMBERME");
	if (!userCookie) return 
	const userLogin = JSON.parse(userCookie.value);
	
  return Response.json({ userLogin })
  
}