import { connect } from 'react-redux'

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

const Notifications = (props) => {

  return(
    <>
    {props.notifications.map(notification =>
      <Notification
        key={getId()}
        content={notification} 
      />
    )}
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    notifications: state.notifications
  }
}

const ConnectedNotifications = connect(mapStateToProps)(Notifications)

export default ConnectedNotifications