import Checkericon from "./Checkericon"
import React from "react"

function FormButton({logo, placeholder, checker=false, addclass='', value,fn}:
  {logo:string,placeholder:string,checker?:boolean,addclass?:string,value:string,fn?:React.Dispatch<React.SetStateAction<string>>}) {
  
    function handleChange(event:React.ChangeEvent<HTMLInputElement>){
      if(fn!=undefined){
        fn(event.target.value)
      }
    }

    return (
    <div className={` flex bg-[#F4F4F4] gap-2 border-2 border-[#CCCCCC] w-[95%] rounded-md pl-2 p-1 items-center ${addclass}`}>
        <div className=" flex items-center h-2 w-4">
            <img src={logo} alt="Icon" />
        </div>
        <div className=" flex-1">
            <input 
            type="text"
            value={value}
            onChange={handleChange}
            className="bg-[#F4F4F4] text-[#535353] font-normal text-sm w-full outline-none"
            placeholder={placeholder}
            />
        </div>
        {checker && <Checkericon/>}
    </div>
  )
}

export default FormButton