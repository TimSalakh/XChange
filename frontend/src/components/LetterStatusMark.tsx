const UnreadMark = () => {
  return (
    <div className='w-auto bg-amber-500 text-black text-center text-sm rounded-md px-1.5 shadow-sm'>
      Unread
    </div>
  )
}

const ReadMark = () => {
  return (
    <div className='w-auto bg-neutral-400 text-black text-center text-sm rounded-md px-1.5 shadow-sm'>
      Read
    </div>
  )
}

export { UnreadMark, ReadMark }
