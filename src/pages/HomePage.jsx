import { useAuth } from "../context/AuthContext"

const HomePage = () => {

 const {user}= useAuth();
  console.log(user)
  return (
    <div>HomePage</div>
  )
}

export default HomePage