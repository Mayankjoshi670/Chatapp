import React from 'react'
const Message = ({ user, message}) => {
  // console.log(`fuck user ${user} ${message}`);
    if (user) {
        return (
            <div className={`messageBox  bg-green-400 w-full p-2 border-2 inline-block rightside `}  >
                {`${user}: ${message}`}
            </div>
        )
    }
    else {
      return (
            <div className={`messageBox bg-red-400 w-full mx-auto border-2 inline-block float-right`}>
            <p className="text-right">{`You: ${message}`}</p>
        </div>     )
    }
}
export default Message
