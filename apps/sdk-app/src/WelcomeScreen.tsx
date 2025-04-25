import {useCurrentUser, type CurrentUser} from '@sanity/sdk-react'
import './ExampleComponent.css'

export function WelcomeScreen() {
  const user: CurrentUser | null = useCurrentUser()

  return (
    <div className="example-container">
      {user?.profileImage ? (
        <div className="example-avatar-container">
          <img src={user.profileImage} alt="" className="example-avatar" />
        </div>
      ) : (
        ''
      )}
      <h1 className="example-heading">
        Welcome Screen!
      </h1>
      <p className="example-text">
        Some copy to explain the thing
      </p>
    </div>
  )
}
