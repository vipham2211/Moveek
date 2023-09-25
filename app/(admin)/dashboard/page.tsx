import { Metadata } from 'next';
import React from 'react'


export async function generateMetadata(): Promise<Metadata> {
 
  return {
    title:`Moveek dashboard`
  };
}
const page = () => {

  return (
	<div>
    Dashboard 
  </div>
  )
}

export default page