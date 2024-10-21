import cuvettelogo from '../assets/cuvettelogo.svg'
import yournamecircle from '../assets/yournamecircle.svg'
import yournamepointer from '../assets/yournamepointer.svg'

function Nav({show=false,user=""}:{show?:boolean,user?:string}) {
  return (
    <header className={` w-full flex flex-wrap pt-8 pb-6 h-24 text-xl gap-4 ${show==true?'border-b-2 border-[#C5C5C5]':''}`}>
        <div className=' h-full flex pl-8 p-1'>
          <img src={cuvettelogo} alt="Cuvette Logo" />
        </div>
        <div className='flex-1 h-full flex justify-end p-2 gap-4 items-center'>
          <div className=' flex justify-end text-[#576474] relative right-10'>
            <button>Contact</button>
          </div>
          {show && 
          <div 
          className=' border-2 border-[#83909F] rounded-lg flex text-sm text-[#6A6A6A] font-normal p-1 justify-center items-center gap-2 relative right-6'>
            <img
            src={yournamecircle}
            className=' w-4 h-4'
            alt="circleicon" />
            <p>{user}</p>
            <button>
              <img
              src={yournamepointer}
              className=' w-3 h-3'
              alt="pointericon" />
            </button>
          </div>}
        </div>
    </header>
  )
}

export default Nav