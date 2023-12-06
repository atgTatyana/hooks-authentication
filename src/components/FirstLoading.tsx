import { useState } from "react";

export interface IForm {
  login: string,
  password: string,
}

interface FirstLoadingProps {
  authentication: (form: IForm) => void,
}

export const FirstLoading = ({ authentication }: FirstLoadingProps) => {
  const [form, setForm] = useState<IForm>({
    login: "",
    password: "",
  });
  const { login, password } = form;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("form data:", form);
    authentication(form);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value} = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="authentication">
        <h3>Neto Social</h3>
        <form onSubmit={handleSubmit}>
          <input className="input" name="login" type="text" value={login}
            placeholder="Username" onChange={handleChange} required />
          <input className="input" name="password" type="password" value={password}
            placeholder="Password" onChange={handleChange} required />
          <button className="login" type="submit">Login</button>
        </form>
      </div>
      <div className="news">
        <h1>Neto Social</h1>
        <p>Facebook and VK killer</p>
      </div>
    </>
  )
}
