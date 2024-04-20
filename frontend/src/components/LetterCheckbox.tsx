import { VscCheck } from 'react-icons/vsc'

const DefaultCheckbox = () => {
  return (
    <div className='w-5 h-5 bg-white border-2 border-slate-300 rounded-md hover:border-slate-400 cursor-pointer'></div>
  )
}

const SelectedCheckbox = () => {
  return (
    <div className='w-5 h-5 bg-white border-2 border-slate-400 rounded-md flex flex-row justify-center items-center cursor-pointer'>
      <VscCheck size={15} color='black' />
    </div>
  )
}

export { DefaultCheckbox, SelectedCheckbox }
