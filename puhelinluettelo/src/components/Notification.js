const Notification = ({ message, isError }) => {
  if (!message) {
    return null
  }

  return (
    isError ? 
    <div className="error">
      {message}
    </div>
    :
    <div className="notif">
      {message}
    </div>
  )
}

export default Notification