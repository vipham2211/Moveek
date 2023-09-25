import { cookies } from 'next/headers'
import { NextResponse } from 'next/server';


export async function GET() {
	
	cookies().delete('REMEMBERME')
	
	return NextResponse.json({ message: "This Worked", success: true });
}