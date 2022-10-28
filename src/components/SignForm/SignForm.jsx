import { useState } from "react";

export const SignForm = ({ onSubmit, error, loading }) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePass = (e) => {
    setPass(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(email, pass);
    setEmail("");
    setPass("");
  };

  return (
    <>
      <form className="signForm" onSubmit={handleSubmit}>
        <input
          className="signInput"
          type="text"
          value={email}
          onChange={handleChangeEmail}
        />
        <input
          className="signInput"
          type="password"
          value={pass}
          onChange={handleChangePass}
        />
        <input className="signBtn" type="submit" disabled={loading} />
      </form>
      {error && <h4>{error}</h4>}
    </>
  );
};
