import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import UserDialog from "./children/UserDialog";
import { Button, TextField } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

const cols = [
  { title: "Username", field: "Username" },
  { title: "Name", field: "Name" },
  { title: "FatherLastName", field: "FatherLastName" },
  { title: "MotherLastName", field: "MotherLastName" },
  { title: "CreationDate", field: "CreationDate" },
  { title: "Email", field: "Email" },
  { title: "PhoneNumber", field: "PhoneNumber" },
];

const UserList = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]),
    [query, setQuery] = useState("");
  const token = sessionStorage.getItem("ds_tkn");
  const [open, setOpen] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const searchUrl =
      "https://techhub.docsolutions.com/OnBoardingPre/WebApi/api/user/GetUsers";
    const data = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ Body: { SearchText: query } }),
    };

    fetch(searchUrl, data)
      .then((res) => res.json())
      .then((r) => {
        setUsers(r?.IsOK ? r?.Body || [] : []);
      })
      .catch((error) => {
        console.log(error?.response);
        setUsers([]);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (!sessionStorage.getItem("ds_tkn")) navigate("/");
  }, [navigate]);

  return (
    <div className="w-full h-screen px-48 flex flex-col justify-center gap-20 bg-gradient-to-r from-gray-100 to-gray-800">
      <UserDialog open={open} handleClose={handleClose} />
      <p className="text-gray-800 text-4xl">
        Bienvenido a{" "}
        <strong className="text-red-600 text-4xl">DocSolutions</strong>
      </p>
      <form className="w-full flex gap-6" onSubmit={handleSubmit}>
        <div className="w-1/3 flex items-center gap-6">
          <TextField
            name="query"
            value={query}
            variant="outlined"
            size="small"
            placeholder="Buscar"
            fullWidth
            onChange={({ target: { value } }) => setQuery(value)}
          />
          <Button
            sx={{ backgrounColor: "green" }}
            variant="contained"
            type="submit"
            size="small"
          >
            Buscar
          </Button>
        </div>

        <div className="w-2/3 flex justify-end">
          <Button variant="contained" onClick={() => setOpen(true)}>
            Nuevo
          </Button>
        </div>
      </form>
      <MaterialTable
        columns={cols}
        data={users}
        title="Lista de usuarios"
        options={{
          search: false,
        }}
      />
    </div>
  );
};

export default UserList;
