import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";
import { useForm } from "../../hooks/useForm";

const initFormValues = {
  Name: "",
  FatherLastName: "",
  MotherLastName: "",
  Email: "",
  PhoneNumber: "",
  UserName: "",
  Password: "",
  ConfirmPassword: "",
};

const UserDialog = ({ open, handleClose }) => {
  const [form, handleForm] = useForm(initFormValues),
    [message, setMessage] = useState({
      code: 100,
      message: "Por favor, llena todos los campos",
    });
  const inputs = [
    {
      id: "Name",
      name: "Name",
      placeholder: "Nombre",
      value: form?.Name,
      type: "text",
    },
    {
      id: "FatherLastName",
      name: "FatherLastName",
      placeholder: "Apellido paterno",
      value: form?.FatherLastName,
      type: "text",
    },
    {
      id: "MotherLastName",
      name: "MotherLastName",
      placeholder: "Apellido materno",
      value: form?.MotherLastName,
      type: "text",
    },
    {
      id: "Email",
      name: "Email",
      placeholder: "Email",
      value: form?.Email,
      type: "email",
    },
    {
      id: "PhoneNumber",
      name: "PhoneNumber",
      placeholder: "Número de celular",
      value: form?.PhoneNumber,
      type: "number",
    },
    {
      id: "UserName",
      name: "UserName",
      placeholder: "Nombre de usuario",
      value: form?.UserName,
      type: "text",
    },
    {
      id: "Password",
      name: "Password",
      placeholder: "Contraseña",
      value: form?.Password,
      type: "password",
    },
    {
      id: "ConfirmPassword",
      name: "ConfirmPassword",
      placeholder: "Confirmar contraseña",
      value: form?.ConfirmPassword,
      type: "password",
    },
  ];

  const saveUser = () => {
    const saveUrl =
      "https://techhub.docsolutions.com/OnBoardingPre/WebApi/api/user/RegisterUserRole";
    const token = sessionStorage.getItem("ds_tkn");
    const {
      Name,
      FatherLastName,
      MotherLastName,
      Email,
      PhoneNumber,
      UserName,
      Password,
      ConfirmPassword,
    } = form;
    if (Password !== ConfirmPassword) {
      setMessage({ code: 400, message: "Las contraseñas no coinciden" });
    } else {
      const newUser = {
        Body: {
          Tenant: null,
          UserName,
          Password,
          Name,
          FatherLastName,
          MotherLastName,
          Email,
          PhoneNumber,
          Metadata: null,
          Roles: [
            {
              Id: 2,
              Name: "Usuario Tradicional",
            },
          ],
        },
      };
      const data = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newUser),
      };
      fetch(saveUrl, data)
        .then((res) => res.json())
        .then((r) => {
          setMessage({
            code: r?.IsOK ? 200 : 400,
            message: r?.IsOK
              ? "¡Usuario registrado satisfactoriamente!"
              : r?.Messages,
          });
        })
        .catch(() => {
          setMessage({ error: 400, message: "Ocurrió un error" });
        });
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Nuevo usuario</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Por favor, llena el siguiente formulario para completar el registro
        </DialogContentText>
        {inputs.map(({ id, name, placeholder, value, type }) => (
          <TextField
            key={id}
            margin="dense"
            title={name}
            name={name}
            id={id}
            label={placeholder}
            type={type}
            value={value}
            fullWidth
            variant="outlined"
            size="small"
            onChange={handleForm}
          />
        ))}
      </DialogContent>
      <DialogActions>
        {message.code === 400 && (
          <span className="text-red-500">{message.message}</span>
        )}
        {message.code === 200 && (
          <span className="text-green-500">
            ¡Usuario registrado satisfactoriamente!
          </span>
        )}
        {message.message !== 200 && (
          <Button
            disabled={Object.entries(form).some((inp) => !inp[1])}
            onClick={saveUser}
          >
            Guardar
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default UserDialog;
