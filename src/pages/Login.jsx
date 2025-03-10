import React, { useEffect } from "react";
import { useReducer } from "react";
import { Link } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
};

function reducer(state, action) {
  return {
    ...state,
    [action.field]: action.value,
  };
}

function Login({}) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = (e) => {
    dispatch({
      field: e.target.id, // estado que quiero cambiar
      value: e.target.value, // valor que va a tomar
    });
  };

  //   useEffect(() => {
  //     console.log(state);
  //   }, [state]);

  const handleAutocompletar = (e) => {
    e.preventDefault();
    // auto completar
    dispatch({ field: "email", value: "adminprueba@devflix.com" });
    dispatch({ field: "password", value: "12345%validar" });
  };

  const enviarFormulario = (e) => {
    e.preventDefault();
    // enviar formulario
    console.log("Formulario enviado");
    console.log(state);
  };

  return (
    <div className="bg-base-100 flex justify-center items-center ">
      <span className="absolute top-0 right-0 pr-8 pt-4">
        <Link to="/">Volver a inicio</Link>
      </span>{" "}
      {/* Enlace a la ruta principal */}
      <div className="mt-16 w-full md:w-2/4 pt-12 pb-20 gap-y-6  ">
        <form
          className="flex flex-col items-center justify-center gap-y-4 [&>div>input]:mb-2 [&>div>input]:rounded-md 
          [&>div>input]:w-60  [&>div>input]:p-1.5 [&>div>label]:text-lg min-w-full [&>div]:flex 
          [&>div]:flex-col [&>div]:gap-y-1 border md:py-16"
        >
          <h1 className="text-2xl">Login</h1>
          <div>
            <label htmlFor="email">Email</label>
            <input
              onChange={handleChange}
              type="email"
              id="email"
              autoComplete="email"
              value={state.email}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              onChange={handleChange}
              type="password"
              id="password"
              autoComplete="current-password"
              value={state.password}
            />
          </div>
          <div className="!flex-row gap-x-8">
            <button
              onClick={enviarFormulario}
              className="btn btn-primary text-white w-36 mt-4"
            >
              Login
            </button>
            <button
              onClick={handleAutocompletar}
              className="btn btn-success text-white w-36 mt-4"
            >
              Autocompletar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
