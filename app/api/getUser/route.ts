import { cookies } from 'next/headers'
import { NextResponse } from 'next/server';

export async function GET() {
	const userCookie = cookies().get("REMEMBERME");
	if (!userCookie) return 
	const userLogin = JSON.parse(userCookie.value);
	
  return NextResponse.json({ userLogin });
  
}