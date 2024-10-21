import FormButton from "./FormButton"
import personicon from '../assets/personicon.svg'
import phoneicon from '../assets/phoneicon.svg'
import emailicon from '../assets/mailicon.svg'
import groupsicon from '../assets/groupsicon.svg'
import ProcessButton from "./ProcessButton"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { addFields } from "../features/userSlice"
import axios from "axios"

function InitialSignUp({setfn}:{setfn:React.Dispatch<React.SetStateAction<boolean>>}) {

    const dispatch = useDispatch();
    const [name, setName] = useState<string> ('')
    const [phone, setPhone] = useState<string> ('')
    const [companyname, setCompanyName] = useState<string> ('')
    const [companyemail, setCompanyEmail] = useState<string> ('')
    const [employeesize, setEmployeeSize] = useState<string> ('')

    function handleSubmit(){
        console.log(name,phone,companyname,companyemail,employeesize);
        if(!(name && phone && companyname && companyemail && employeesize)){
            console.log("All fields are required");
        }
        else {
            dispatch(addFields({name,phone,companyname,companyemail,employeesize}))
            axios.post('http://localhost:8000/api/v1/otp/sendotp',{
                email:companyemail,
                subject:"Verification OTP",
                message:"Here is your verification OTP"
            })
            .then((response)=>{
                console.log(response);
            })
            .catch((reason)=>{
                console.log(reason);
            })
            axios.post('http://localhost:8000/api/v1/motp/sendmotp',{
                number:phone,
                message:"Here is your verification OTP"
            })
            .then((response)=>{
                console.log(response);
            })
            .catch((reason)=>{
                console.log(reason);
            })
            setfn(false)
        }
        
    }

  return (
    <>
        <form className="flex flex-col justify-center items-center gap-4 p-4">
            <FormButton logo={personicon} value={name} placeholder="Name" fn={setName}/>
            <FormButton logo={phoneicon} value={phone} placeholder="Phone no." fn={setPhone}/>
            <FormButton logo={personicon} value={companyname} placeholder="Company Name" fn={setCompanyName}/>
            <FormButton logo={emailicon} value={companyemail} placeholder="Company Email" fn={setCompanyEmail}/>
            <FormButton logo={groupsicon} value={employeesize} placeholder="Employee Size" fn={setEmployeeSize}/>
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
            <ProcessButton text={"Proceed"} fn={handleSubmit}/>
        </div>
    </>
  )
}

export default InitialSignUp