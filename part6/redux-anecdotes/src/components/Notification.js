import { useSelector } from 'react-redux'

const Notification = (notification) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {notification.content}
    </div>
  )
}

const getId = () => (100000 * Math.random()).toFixed(0)

const Notifications = () => {
  const notifications = useSelector(state => state.notifications)

  return(
    <>
    {notifications.map(notification =>
      <Notification
        key={getId()}
        content={notification} 
      />
    )}
    </>
  )
}

export default Notifications