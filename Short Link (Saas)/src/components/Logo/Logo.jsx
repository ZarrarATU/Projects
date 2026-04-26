import { useNavigate } from "react-router"

export function Logo({size='30px'}) {
  return (
    <div>
       <h3 style={{fontSize: size}} className='font-black cursor-pointer font-["Manrope"] hover:scale-90 transition-all'>.tinyurl</h3>
    </div>
  )
}

