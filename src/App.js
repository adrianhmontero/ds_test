import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const initStateForm = {
  username: "",
  password: "",
};

const App = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(initStateForm),
    [errorFetch, setErrorFetch] = useState("");
  const inputs = [
    {
      id: "userLogin",
      name: "username",
      placeholder: "Usuario",
      value: form?.user,
      type: "text",
    },
    {
      id: "passwordLogin",
      name: "password",
      placeholder: "Contraseña",
      value: form?.password,
      type: "password",
    },
  ];

  const handleForm = ({ target: { name, value } }) =>
    setForm((prev) => ({ ...prev, [name]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorFetch("");
    const authUrl =
      "https://techhub.docsolutions.com/OnBoardingPre/WebApi/api/authentication/authentication";
    const credentials = {
      Body: {
        Username: form?.username,
        Password: form?.password,
      },
    };
    const data = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(credentials),
    };
    fetch(authUrl, data)
      .then((res) => res.json())
      .then((r) => {
        console.log("r", r);
        if (r?.IsOK) {
          sessionStorage.setItem("ds_tkn", r?.Body?.Token);
          navigate("/user-list");
        } else setErrorFetch(r?.Messages);
      })
      .catch((error) => {
        console.log(error?.response);
      });
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-10 px-96 bg-gradient-to-r from-gray-100 to-gray-400">
      <div className="flex flex-col justify-center items-center">
        <p className="text-3xl font-bold">Inicio de sesión</p>
        <strong className="text-red-600 text-3xl">DocSolutions</strong>
      </div>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
        {inputs.map(({ id, name, placeholder, value, type }) => (
          <TextField
            key={id}
            name={name}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={handleForm}
            variant="outlined"
            fullWidth
          />
        ))}
        {errorFetch && <p className="text-red-500">{errorFetch}</p>}
        <Button
          variant="contained"
          type="submit"
          disabled={!form?.username || !form?.password}
        >
          Ok
        </Button>
      </form>
    </div>
  );
};

export default App;
