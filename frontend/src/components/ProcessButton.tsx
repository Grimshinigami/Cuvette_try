
function ProcessButton({text, fn}:
    {text:string, fn?:any}) {

    function clickHandler(){        
        if(fn!=undefined){
            fn()
        }
    } 

  return (
    <button 
    className=" bg-[#0B66EF] text-white w-[95%] rounded-lg p-1 flex justify-center text-center font-bold"
    onClick={()=>clickHandler()}
    >
        {text}
    </button>
  )
}

export default ProcessButton