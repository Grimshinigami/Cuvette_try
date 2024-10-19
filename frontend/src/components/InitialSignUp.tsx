import FormButton from "./FormButton"
import personicon from '../assets/personicon.svg'
import phoneicon from '../assets/phoneicon.svg'
import emailicon from '../assets/mailicon.svg'
import groupsicon from '../assets/groupsicon.svg'
import ProcessButton from "./ProcessButton"

function InitialSignUp({setfn}:{setfn:React.Dispatch<React.SetStateAction<boolean>>}) {
  return (
    <>
        <form className="flex flex-col justify-center items-center gap-4 p-4">
            <FormButton logo={personicon} placeholder="Name"/>
            <FormButton logo={phoneicon} placeholder="Phone no."/>
            <FormButton logo={personicon} placeholder="Company Name"/>
            <FormButton logo={emailicon} placeholder="Company Email"/>
            <FormButton logo={groupsicon} placeholder="Employee Size"/>
        </form>
        <div className=" flex flex-col justify-center items-center gap-2 p-3">
            <div className=" text-xs flex text-center w-[60%]">
                <p>
                    By clicking on proceed you wil accept our
                    <a href="" className="text-[#0B66EF]"> Terms </a>
                    &
                    <a href="" className="text-[#0B66EF]"> Conditions</a>
                </p>
            </div>
            <ProcessButton text={"Proceed"} fn={setfn}/>
        </div>
    </>
  )
}

export default InitialSignUp