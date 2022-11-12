type Props = {
  message: string
  success?: boolean
}

const CustomToast = ({ message }: Props) => {
  return (
    <div
      className="
        px-3 py-2 flex 
        items-center gap-2 bg-black text-white
        rounded-md
        border-2 border-white
      "
    >
      <p>{message}</p>
    </div>
  )
}

export default CustomToast
