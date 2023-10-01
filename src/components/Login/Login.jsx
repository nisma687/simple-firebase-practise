import { getAuth, signInWithPopup, signOut } from "firebase/auth";
import app from "../../firebase/firebase.init";
import { GoogleAuthProvider } from "firebase/auth";
import { useState } from "react";
import { GithubAuthProvider } from "firebase/auth";

const Login = () => {
    const [user,setUser]=useState(null);
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    const gitProvider = new GithubAuthProvider();
    const handleGoogleSignIn=()=>{
        signInWithPopup(auth, provider)
        .then(result=>{
            const LoggedInUser = result.user;
            console.log(LoggedInUser);
            setUser(LoggedInUser);
        })
        .catch(error=>{
            console.log(error.message);
        })
     
    }

    const handleGoogleSignOut=()=>{
        signOut(auth)
        .then(result=>{
            console.log(result);
            setUser(null);
        })
        .catch(error=>{
            console.log(error.message);
        })

    }
    const handleGithubSignIn=()=>{
        signInWithPopup(auth, gitProvider)
        .then(result=>{
            const LoggedInUser = result.user;

            console.log(LoggedInUser);
            setUser(LoggedInUser);
        })
        .catch(error=>{
            console.log(error.message);
        })
    }



    return (
        <div>
            {
                // user?logOut:signIn
            }
          { user?
          <button onClick={handleGoogleSignOut}>SignOut</button>:
          <div>
             <button onClick={handleGoogleSignIn}>Login</button>
                <button onClick={handleGithubSignIn}>Login with Github</button>
            </div>


           }
            
           {
             user && <div>
             <h3>User:{user.displayName}
             </h3>
                <p>Email:{user.email}</p>
            <img src={user.photoURL} alt="" />
         </div>
           }

        </div>
    );
};

export default Login;