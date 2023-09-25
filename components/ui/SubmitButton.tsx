'use client'
import { experimental_useFormStatus as useFormStatus } from 'react-dom'
 
interface SubmitButtonProps {
	text: string;
  classname:string
}

export function SubmitButton({text,classname}:SubmitButtonProps) {
  const { pending } = useFormStatus()
 
  return (
    <button type='submit'  disabled={pending}  className={` ${classname}`}>
                  {pending ? `${text}...` : `${text}`}  
    </button>
  )
}