import React, { useState } from "react";
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../src/utils/mutations';

import Auth from '../src/utils/auth';

const LoginModal = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <div className="login-modal" >
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
          <label>
            Email:
            <input
                  className="form-input"
                  placeholder="Your email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />
          </label>
          <br />
          <label>
            Password:
            <input
                  className="form-input"
                  placeholder="******"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
          </label>
          <br />
          <button type="submit">Login</button>
          <button type="button" onClick={props.onClose}>Close</button>
        </form>
      </div>
    </div>
  );
}

export default LoginModal;