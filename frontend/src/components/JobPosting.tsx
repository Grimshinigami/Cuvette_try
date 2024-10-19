import { useEffect, useState } from "react"
import { v4 as uuid } from 'uuid';
import lightgreydoticon from '../assets/lightgreydoticon.svg'
import crossicon from '../assets/crossicon.svg'
import calendaricon from '../assets/calendaricon.svg'
import Calendar from "react-calendar";
import ProcessButton from "./ProcessButton";

function JobPosting() {

    // const temp:React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>>
    const [candidate, setCandidates] = useState<Map<string,string>>(new Map())
    const [curr, setCurr] = useState<string>('' )
    const [endDate, setEndDate] = useState<string>('Select a Date')
    const [showCal, setShowCal] = useState<boolean> (false);
    const [candFocus, setCanFocus] = useState<boolean> (false)
    const [descFocus, setDescFocus] = useState<boolean> (false)
    const [calFocus, setCalFocus] = useState<boolean> (false)
    
    function handlekeydown(e:React.KeyboardEvent<HTMLInputElement>){
        if(e.key == "Enter"){
            setCandidates(cand => cand.set(uuid(),curr))
            setCurr('')
        }
    }

    function remover(key:string){
        setCandidates((cand)=> {
            const newmap = new Map(cand)
            newmap.delete(key)
            return newmap
        })
    }

    function handledateclick(value:Date){
        setEndDate(value.toLocaleDateString())
        setShowCal(false)
    }

    function handlecal(){
        setShowCal((sh)=>!sh)
        setCalFocus(true)
    }    


  return (
    <div className=" md:w-1/2 w-full md:h-full relative left-18 flex justify-center items-start pt-20">
        <div className="w-[80%] flex flex-col gap-2 ">
            <div className="w-full h-12 flex gap-2  items-center p-4">
                <p className="flex-1 flex text-lg text-right justify-end items-end ">
                    Job Title
                </p>
                <input 
                type="text" 
                className=" w-2/3 border-2 border-[#D0D0D0] opacity-70 rounded-md p-2 outline-none font-normal text-[#535353] opacity-70 focus:border-[#0B66EF]"
                placeholder="Enter Job Title"/>
            </div>
            <div className="w-full h-12 flex gap-2 h-48 p-4">
                <p className="flex-1 text-lg text-right">Job Description</p>
                <div className={` w-2/3 h-full border-2 border-[#${descFocus==true?'0B66EF':'D0D0D0'}] opacity-70 rounded-md p-2 `}>
                    <textarea
                    onFocus={()=>setDescFocus(true)}
                    onBlur={()=>setDescFocus(false)}
                    className=" w-full h-full outline-none font-normal resize-none text-[#535353] opacity-70 "
                    placeholder="Enter Job Description"
                    />
                </div>
            </div>
            <div className="w-full h-12 flex gap-2 items-center p-4">
                <p className="flex-1 flex text-lg text-right justify-end items-end ">
                    Experience Level
                </p>
                {/* <input 
                type="text" 
                className=" w-2/3 border-2 border-[#D0D0D0] opacity-70 rounded-md p-2 outline-none font-normal"
                placeholder="Enter Job Title"/> */}
                <select className="w-2/3 border-2 border-[#D0D0D0] opacity-70 rounded-md p-2 outline-none font-normal text-[#535353] opacity-70 focus:border-[#0B66EF]">
                    <option value="Select Experience">Select Experience</option>
                    <option value="0-1">0-1</option>
                    <option value="1-5">1-5</option>
                    <option value="5-8">5-8</option>
                    <option value="8-10">8-10</option>
                    <option value="10+">10+</option>
                </select>
            </div>
            <div className="w-full flex gap-2 items-start p-4">
                <p className="flex-1 flex text-lg text-right justify-end items-end ">
                    Add Candidate
                </p>

                <div className={` w-2/3 border-2 border-[#${candFocus==true?'0B66EF':'D0D0D0'}] opacity-70 rounded-md flex flex-row flex-wrap p-1`}>
                    <div className=" w-full flex flex-wrap gap-2 flex-row ">
                        {Array.from(candidate.entries()).map(([key, value]) => (
                            <div key={key} className=" h-6 p-2 items-center border-2 border-[#D0D0D0] rounded-2xl gap-2 flex flex-row justify-center items-center ">
                                <div className="h-full flex items-center h-4 w-4 ">
                                    <img src={lightgreydoticon} 
                                    className=" "
                                    alt="lightgreydoticon" />
                                </div>
                                <p className="text-[#535353] opacity-70">{value}</p>
                                <button className="h-2 w-2" onClick={()=>remover(key)}>
                                    <img src={crossicon} alt="crossicon" />
                                </button>
                            </div>
                        ))}
                    </div>
                    <input
                    type="text"
                    className=" w-full p-1 outline-none font-normal text-[#535353] opacity-70"
                    value={curr}
                    placeholder="Add a Candidate"
                    onFocus={()=>setCanFocus((true))}
                    onBlur={()=> setCanFocus(false)}
                    onChange={(e)=> (setCurr(e.target.value))}
                    onKeyDown={(e) => handlekeydown(e)}
                    />
                </div>
            </div>
            <div className="w-full h-12 flex gap-2  items-center p-4 inline">
            
                <p className="flex-1 flex text-lg text-right justify-end items-end">
                    End Date
                </p>
                
                <div
                className={`w-2/3 border-2 border-[#${calFocus==true?'0B66EF':'D0D0D0'}] opacity-70 rounded-md p-2 outline-none font-normal text-[#535353] opacity-70 flex`}
                >
                    {endDate}
                    
                    <div className="flex-1 flex justify-end">
                        <button onClick={()=>handlecal()} onBlur={()=>setCalFocus(false)}>
                            <img src={calendaricon} alt="calendaricon" />
                        </button>
                    </div>
                </div>
                {showCal && 
                <Calendar 
                tileClassName={" hover:bg-blue-600 w-10 h-10 "}
                className={"bg-white flex flex-col justify-center items-center w-[53%] gap-2 space-x-2 border-2 border-black absolute top-48 left-[35%]"}
                onClickDay={(value)=> handledateclick(value)}
                />
                }
                
            </div>
            
            <div className=" w-full flex justify-end">
                <div className=" w-32">
                    <ProcessButton text={"Send"}/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default JobPosting