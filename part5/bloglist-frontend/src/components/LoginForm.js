
const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {
  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit = {handleSubmit}>
        <div>
            username <input
            id='username'
            value={username}
            onChange={handleUsernameChange}
          />
          password <input
            id='password'
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button id="login-button" type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm