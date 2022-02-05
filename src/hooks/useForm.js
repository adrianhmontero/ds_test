import { useState } from "react";

export const useForm = (initialState = {}) => {
  const [form, setForm] = useState(initialState);
  const handleForm = ({ target: { name, value } }) =>
    setForm((prev) => ({ ...prev, [name]: value }));
    
  return [form, handleForm];
};
