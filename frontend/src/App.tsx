import { useState } from 'react';
import './App.css'
import Nav from './components/Nav'
import SignUp from './components/SignUp'
import homeicon from './assets/homeicon.svg'
import ProcessButton from './components/ProcessButton';
import JobPosting from './components/JobPosting';


function App() {

  console.log(window.innerWidth);
  console.log(window.innerHeight)
  
  const [login, setLogin] = useState<boolean>(false)
  const [userName, setUserName] = useState<string> ('')
  const [createnew, setCreateNew] = useState<boolean> (true)
  
  function checkCookie(cookieName:string) {

    const cookieString = document.cookie;
  
    return cookieString.split(';').some(cookie => cookie.trim().startsWith(cookieName + '='));
  
  }

  if (checkCookie('accessToken')) {

    console.log("Server-side cookie is set!");
  
  } else {
  
    console.log("Server-side cookie is not set");
  
  }

  return (
    <div className=' w-screen h-screen font-dsans flex flex-col'>
      <Nav show={login} user={userName}/>
      {!login &&
        <div className=' w-full flex-1 flex md:flex-row flex-col gap-2'>
          <div className=' md:w-1/2 w-full h-1/2 md:h-full flex justify-center items-center'>
            <p className=' w-[30rem] font-medium text-[#292929] opacity-70 text-base'>
              Lorem Ipsum is simply dummy text of the printing and  typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
            </p>
          </div>
        <SignUp fn={setLogin} userSet={setUserName}/>
      </div>}
      {login && <div className='w-full flex-1 flex md:flex-row flex-col'>
        <div className=' md:h-full md:w-20 w-full border-r-2 border-[#C5C5C5] flex flex-col items-center p-4'>
          <div className=' h-8 relative md:top-10'>
            <button>
              <img
              src={homeicon}
              className=' w-6 h-6'
              alt="homeicon" />
            </button>
          </div>
        </div>
        <div className='flex-1 flex'>
          <div className=' w-full flex flex-col'>
            {createnew && 
            <div className=' w-[13%] font-semibold text-xl relative top-9 left-8'>
              <ProcessButton text={"Create Interview"} fn={setCreateNew}/>
            </div>}
            {!createnew && <JobPosting fn={setCreateNew}/>}
          </div>
        </div>
      </div>}
    </div>
  )
}

export default App
