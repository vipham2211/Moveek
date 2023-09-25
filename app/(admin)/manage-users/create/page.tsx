import React, { Fragment } from 'react'
import AddNewUser from '../AddNewUser'
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
 
	return {
	  title:`Moveek create user`
	};
  } 

const page = () => {
 
  return (
    <Fragment>
    <div className="text-xl tracking-wide mb-5 font-semibold">
     Create user
    </div>
    <AddNewUser/>
  </Fragment>
  )
}

export default page