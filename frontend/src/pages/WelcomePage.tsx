import { Link } from 'react-router-dom'

const WelcomePage = () => {
  return (
    <div className='h-screen w-screen flex flex-col'>
      <div className='h-5/6 w-full flex flex-col bg-slate-50 p-5'>
        <div className='mb-20'>
          <p className='text-black font-medium text-4xl tracking-tighter px-3 py-1'>
            {' '}
            <span className='text-purple-900 font-black italic mr-1'>X</span>
            Change Mail System
          </p>
        </div>
        <div className='h-3/6 flex flex-row justify-start items-center bg-slate-200 rounded-xl px-20 py-10 shadow-sm'>
          <div className='flex flex-col justify-between items-start'>
            <div>
              <p className='text-6xl tracking-tight mb-7 mr-32'>
                Communicate <br /> directly
              </p>
            </div>
            <div>
              <Link
                to='/register'
                className='text-6xl tracking-tight text-purple-900 underline py-2 rounded-lg hover:text-black transition duration-200 ease-in-out'
              >
                Start Now
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className='h-1/6 w-full bg-slate-900 p-5 flex flex-col justify-between items-start'>
        <div>
          <a
            href='https://github.com/TimSalakh/XChange'
            className='text-gray-300 tracking-tight text-base'
          >
            Source code
          </a>
        </div>
        <div>
          <p className='text-gray-300 tracking-tight text-base'>
            Made by{' '}
            <a
              href='https://github.com/TimSalakh'
              className='text-gray-300 underline tracking-tight text-base'
            >
              Tim
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default WelcomePage
