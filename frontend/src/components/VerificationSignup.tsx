import FormButton from "./FormButton"
import emailicon from '../assets/mailicon.svg'
import phoneicon from '../assets/phoneicon.svg'
import ProcessButton from "./ProcessButton"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import axios from "axios"

function VerificationSignup({fn,userSet}:
  {fn:React.Dispatch<React.SetStateAction<boolean>>,userSet:React.Dispatch<React.SetStateAction<string>>}) {

    const userinfo = useSelector((state:any)=> state.fields)
    console.log(userinfo);
    const [emailOtp, setEmailOtp] = useState<boolean>(true)
    const [mobileOtp, setMobileOtp] = useState<boolean>(true)
    const [emailOTPvalue, setEmailOtpValue] = useState<string>('')
    const [mobileOTPvalue, setMobileOtpValue] = useState<string>('')

    function emailVerifier(){
      axios.post('http://localhost:8000/api/v1/otp/verifyotp',
        {email:userinfo.companyemail,otp:emailOTPvalue}
      )
      .then((response)=>{
        console.log(response.data.message);
        setEmailOtp(false)
      })
      .catch((reason)=>{
        console.log(reason.message);
        
      })
    }

    function mobileVerifier(){
      axios.post('http://localhost:8000/api/v1/motp/verifymotp',
        {number:userinfo.phone,otp:mobileOTPvalue}
      )
      .then((response)=>{
        console.log(response.data.message);
        setMobileOtp(false)
      })
      .catch((reason)=>{
        console.log(reason.message);
        
      })
    }

    useEffect(() => {
      if(!emailOtp && !mobileOtp){
        axios.post('http://localhost:8000/api/v1/users/adduser',{
          name:userinfo.name,
          phone:userinfo.phone,
          companyName:userinfo.companyname,
          companyEmail:userinfo.companyemail,
          employeeSize:userinfo.employeesize
        },{withCredentials:true})
        .then((response)=>{
          console.log(response);
          userSet(response.data.data.name)
        })
        .catch((reason)=>{
          console.log(reason);
        })
        fn(true)
      }

    }, [emailOtp,mobileOtp])
    

  return (
    <div className="w-full flex flex-col gap-4 p-4 pb-10 justify-center items-center">
        {!emailOtp && <FormButton logo={emailicon} placeholder="Email OTP" checker={true} value={emailOTPvalue}/>}
        {emailOtp && <FormButton logo={emailicon} placeholder="Email OTP" value={emailOTPvalue}  fn={setEmailOtpValue}/>}
        {emailOtp && <ProcessButton text={"Verify"} fn={emailVerifier}/>}
        {!mobileOtp && <FormButton logo={phoneicon} placeholder="Mobile OTP" checker={true} value={mobileOTPvalue}/>}
        {mobileOtp && <FormButton logo={phoneicon} placeholder="Mobile OTP" value={mobileOTPvalue} fn={setMobileOtpValue}/>}
        {mobileOtp && <ProcessButton text={"Verify"} fn={mobileVerifier}/>}
    </div>
  )
}

export default VerificationSignup