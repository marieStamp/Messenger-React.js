import { useState } from "react";
import { Link } from "react-router-dom";
import { signUp } from "../../services/firebase";
import { SignForm } from "../SignForm/SignForm";

export const SignUp = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (email, pass) => {
    setLoading(true);
    try {
      await signUp(email, pass);
    } catch (err) {
      console.log(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SignForm onSubmit={handleSignUp} error={error} loading={loading} />
      <Link to="/">
        <button className="dlt_button signout">Sign In</button>
      </Link>
    </>
  );
};
