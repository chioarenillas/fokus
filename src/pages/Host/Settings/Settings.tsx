import { useEffect, useState } from "react";
import "./Settings.css"
import type { User } from "firebase/auth";
import { auth } from "../../../firebase";
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "firebase/auth";

export default function Settings(): React.JSX.Element {
  const [user, setUser] = useState<User | null>(null)
  const [bio, setBio] = useState("")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [error, setError] = useState<string | null> (null)
  const [emailNotification, setEmailNotification] = useState(true)
  const [weeklyNotification, setWeeklyNotification] = useState(false)
  const [pushNotification, setPushNotification] = useState(false)
  

  useEffect(() => {
    const currentUser = auth.currentUser
    setUser(currentUser)
  }, [])

  async function handleChangePassword(){
    const user = auth.currentUser

    if(!user || !user.email){
      setError("No user logged in")
      return
    }
    if(!currentPassword || !newPassword){
      setError("Please fill both password fields")
      return
    }
    if(newPassword.length < 6){
      setError("Password must be at least 6 characters")
    return
    }

    try{
      setError(null)

      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword
      )
      await reauthenticateWithCredential(user, credential)
      await updatePassword(user, newPassword)

      alert("Password updated successfully")
      setCurrentPassword("")
      setNewPassword("")
    }
    catch (err: any) {
      let message = "Error updating password"

    switch (err.code) {
      case "auth/wrong-password":
        message = "Current password is incorrect"
        break

      case "auth/weak-password":
        message = "New password is too weak"
        break

      case "auth/requires-recent-login":
        message = "Please log in again to change password"
        break
    }
    setError(message)
  }
}

  return (
    <div className="settingsContainer">
      <div className="settingsHeader">
        <div>
          <h1>Settings</h1>
          <p>Manage your account preferences and workspace.</p>
        </div>
      </div>

      <div className="settingsGrid">
        <div className="settingsCard">
          <div className="settingsCardHeader">
            <h2>Profile</h2>
          </div>

          <div className="settingsForm">
            <div className="formGroup">
              <label>Name</label>
              <input 
              type="text" 
              value={user?.displayName || "User"}
              disabled />
            </div>

            <div className="formGroup">
              <label>Email</label>
              <input 
              type="email" 
              value={user?.email || "user@user.com"} 
              disabled/>
            </div>

            <div className="formGroup">
              <label>Bio</label>
              <textarea 
              value={bio}
              placeholder="Tell something about yourself..."
              onChange={(e) => setBio(e.target.value)}
               />
            </div>

            <button>Save Changes</button>
          </div>
        </div>

        <div className="settingsCard">
          <div className="settingsCardHeader">
            <h2>Account</h2>
          </div>

          <form className="settingsForm"
          onSubmit={(e) => {
            e.preventDefault()
            handleChangePassword()
          }}>
            <div className="formGroup">
              <label>Current Password</label>
              <input 
              type="password" 
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••"
             />
            </div>

            <div className="formGroup">
              <label>New Password</label>
              <input 
              type="password" 
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••" />
            </div>

            {error && <p className="login-first">{error}</p>}

            <button type="submit">Update Password</button>
          </form>
        </div>

        <div className="settingsCard">
          <div className="settingsCardHeader">
            <h2>Notifications</h2>
          </div>

          <div className="toggleGroup">
            <div className="toggleItem">
              <div>
                <h3>Email Notifications</h3>
                <p>Receive updates via email.</p>
              </div>

              <input 
              type="checkbox" 
              checked={emailNotification}
              onChange={(e) => setEmailNotification(e.target.checked)} />
            </div>

            <div className="toggleItem">
              <div>
                <h3>Weekly Reports</h3>
                <p>Get productivity summaries.</p>
              </div>

              <input 
              type="checkbox" 
              checked={weeklyNotification}
              onChange={(e) => setWeeklyNotification(e.target.checked)}/>
            </div>

            <div className="toggleItem">
              <div>
                <h3>Push Notifications</h3>
                <p>Receive browser notifications.</p>
              </div>

              <input 
              type="checkbox" 
              checked={pushNotification}
              onChange={(e) => setPushNotification(e.target.checked)}/>
            </div>
          </div>
        </div>

        <div className="settingsCard dangerCard">
          <div className="settingsCardHeader">
            <h2>Danger Zone</h2>
          </div>

          <div className="dangerContent">
            <p>Permanently delete your account and all data.</p>

            <button className="dangerButton">Delete Account</button>
          </div>
        </div>
      </div>
    </div>
  );
}
