import { IProfile } from "../App"

interface ProfileProps {
    profile: IProfile,
    logout: () => void,
}

export const Profile = ({ profile, logout }: ProfileProps) => {
  const { name, avatar } = profile;
  return (
    <div className="authentication">
      <h3>Neto Social</h3>
      <div className="out">
        <div>Hello, {name}</div>
        <img className="avatar" src={avatar} alt={`${name} avatar`} />
        <button className="logout" onClick={() => logout()}>Logout</button>
      </div> 
    </div>
  )
}
