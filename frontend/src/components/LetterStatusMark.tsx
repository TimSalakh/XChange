const UnreadMark = () => {
  return (
    <div className='w-auto bg-amber-500 text-black text-center text-sm rounded-md px-1.5 shadow-sm cursor-default'>
      Unread
    </div>
  )
}

const ReadMark = () => {
  return (
    <div className='w-auto bg-neutral-400 text-black text-center text-sm rounded-md px-1.5 shadow-sm cursor-default'>
      Read
    </div>
  )
}

export { UnreadMark, ReadMark }
