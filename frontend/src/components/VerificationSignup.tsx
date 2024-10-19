import FormButton from "./FormButton"
import emailicon from '../assets/mailicon.svg'
import phoneicon from '../assets/phoneicon.svg'
import ProcessButton from "./ProcessButton"
import { useState } from "react"

function VerificationSignup() {

    const [emailOtp, setEmailOtp] = useState<boolean>(true)
    const [mobileOtp, setMobileOtp] = useState<boolean>(true)
    
  return (
    <div className="w-full flex flex-col gap-4 p-4 pb-10 justify-center items-center">
        {!emailOtp && <FormButton logo={emailicon} placeholder="Email OTP" checker={true}/>}
        {emailOtp && <FormButton logo={emailicon} placeholder="Email OTP"/>}
        {emailOtp && <ProcessButton text={"Verify"} fn={setEmailOtp}/>}
        {!mobileOtp && <FormButton logo={phoneicon} placeholder="Mobile OTP" checker={true}/>}
        {mobileOtp && <FormButton logo={phoneicon} placeholder="Mobile OTP"/>}
        {mobileOtp && <ProcessButton text={"Verify"} fn={setMobileOtp}/>}
    </div>
  )
}

export default VerificationSignup