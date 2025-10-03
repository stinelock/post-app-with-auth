import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase-config";

export default function SignInPage() {
  const [errorMessage, setErrorMessage] = useState("");

  function handleSignIn(event) {
    event.preventDefault();
    const mail = event.target.mail.value; // mail value from inout field in sign in form
    const password = event.target.password.value; // password value from inout field in sign in form

    signInWithEmailAndPassword(auth, mail, password)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user;
        console.log(user); // for test purposes: logging the authenticated user
      })
      .catch(error => {
        let code = error.code; // saving error code in variable
        code = code.replaceAll("-", " "); // some JS string magic to display error message. See the log above in the console
        code = code.replaceAll("auth/", "");
        setErrorMessage(code);
      });
  }
  return (
    <section id="sign-in-page" className="page">
      <h1>Sign In</h1>
      <form id="sign-in-form" onSubmit={handleSignIn}>
        <label htmlFor="mail">Mail</label>
        <input
          id="mail"
          type="email"
          name="mail"
          aria-label="mail"
          placeholder="Type your mail..."
          required
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          aria-label="password"
          placeholder="Type your password..."
          autoComplete="current-password"
        />
        <div className="error-message">
          <p>{errorMessage}</p>
        </div>
        <div className="btns">
          <button>Sign In</button>
        </div>
      </form>
      <p className="text-center">
        Don&apos;t have an account? <Link to="/sign-up">Sign Up</Link>
      </p>
    </section>
  );
}
