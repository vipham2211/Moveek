'use client'

import Link from "next/link"

 
export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {

  return (
    <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="font-semibold text-emerald-700 ">There was a proplem</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-zinc-900 ">
            { error.message  || 'Something went wrong '}
          </h1>
          <p className="mt-6 leading-7 text-zinc-600 ">Please try again later or contact support if the problem persists </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <button onClick={reset} className=" px-3 py-2 rounded-md bg-emerald-100 border border-emerald-300 text-emerald-500" >Try again</button>
            <Link href={'/'} className="text-zinc-400">Go back home</Link>
          </div>
        </div>
    </main>
  )
}