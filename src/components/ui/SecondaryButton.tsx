
type SecondaryButtonProps = {
  className?: string
  text: string
  onclick?: () => void
}   

export const SecondaryButton = ({ text,className, onclick }: SecondaryButtonProps) => { 
  return (
       <button
        className={`inline-flex items-center gap-2 cursor-pointer transition duration-300 bg-linear-to-r from-transparent via-transparent to-transparent hover:from-black-1000 hover:via-neutral-500 hover:to-black-1000 rounded-full bg-transparent px-6 py-2 h-11 text-sm font-inter font-semibold text-black-1000 hover:text-white border border-black-1000 ${className}`}
        onClick={onclick}>
        {text}
        </button>
  )
}
