import { useState } from "react"
import InitialSignUp from "./InitialSignUp"
import VerificationSignup from "./VerificationSignup"


function SignUp({fn, userSet}:
    {fn:React.Dispatch<React.SetStateAction<boolean>>,userSet:React.Dispatch<React.SetStateAction<string>>}) {

    const [initial, setInitial] = useState<boolean>(true)

  return (
    <div className="  md:h-full w-full md:w-1/2 p-2">
        <div className=" h-full flex justify-center items-center">
            <div className=" bg-gradient-to-r from-[#3F71FF] to-[#AA54FF] md:w-[25rem] w-[65%] rounded-lg relative md:bottom-6 p-[1px]">
                <div className="w-full h-full bg-white rounded-lg">
                    <div className=" w-full flex flex-col items-center p-4 gap-2 rounded-t-lg">
                        <p className=" text-2xl font-semibold">Sign Up</p>
                        <p className=" text-xs font-medium">Lorem Ipsum is simply dummy text</p>
                    </div>
                    {initial && <InitialSignUp setfn={setInitial}/>}
                    {!initial && <VerificationSignup fn={fn} userSet={userSet}/>}
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default SignUp