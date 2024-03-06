import React, { useState } from 'react'
import { Link } from "react-router-dom";
let user;
const sendUser = () => {
    user = document.getElementById('joinInput').value;
    document.getElementById('joinInput').value = "";
}
const Join = () => {
    const [name, setname] = useState("");
    return (
        <div className='bg-black w-full h-[43.4rem] flex items-center justify-center'>
            <div className='border-2 h-120 w-1/4 border-red-500 items-center justify-center'>
                {/* <img src={logo} alt="logo" /> */}
                <h1>C CHAT</h1>
                <input onChange={(e) => setname(e.target.value)} placeholder="Enter Your Name" type="text" id="joinInput" />
                <Link onClick={(event) => !name ? event.preventDefault() : null} to="/chat">  <button onClick={sendUser}  className="text-white font-serif border-emerald-400 text-center border-2 opacity-50 ">Login In</button></Link>
            </div>
        </div>
    )
}
export default Join
export { user }
