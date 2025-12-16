
type PrimaryButtonProps = {
  className?: string
  text: string
  onclick?: () => void
}   

export const PrimaryButton = ({ text,className, onclick }: PrimaryButtonProps) => {
  return (
    <button onClick={onclick} className={`h-11 cursor-pointer text-base font-semibold font-inter transition duration-300 hover:from-primary-color hover:via-primary-color hover:to-primary-color px-6 py-2.5 bg-linear-to-r from-black-1000 via-neutral-500 to-black-1000 rounded-full text-white inline-flex justify-center items-center gap-2.5 ${className}`}>{text}</button>
  )
}
