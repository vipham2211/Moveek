import { Metadata } from 'next';
import React, { Fragment } from 'react'
import AddNewMovie from '../AddNewMovie';


export async function generateMetadata(): Promise<Metadata> {
 
	return {
	  title:`Moveek create movie`
	};
  } 

const page =async () => {
  return (
    <Fragment>
    <div className="text-xl tracking-wide mb-5 font-semibold">
      Create movie
    </div>
   <AddNewMovie/>
  </Fragment>
  )
}

export default page