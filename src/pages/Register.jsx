import React from "react";
import { useReducer, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const initialState = {
  name: "",
  email: "",
  password: "",
  password2: "",
  age: "", // parsear a number
};

function reducer(state, action) {
  return {
    ...state,
    [action.field]: action.value,
  };
}

function Register({}) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [msgRespuesta, setMsgRespuesta] = useState("");

  const [errores, setErrores] = useState({
    name: [],
    email: [],
    password: [],
    password2: [],
    age: [],
  });

  const handleChange = (e) => {
    if (e.target.id === "age") {
      dispatch({ field: e.target.id, value: parseInt(e.target.value) });
    } else {
      dispatch({
        field: e.target.id, // estado que quiero cambiar
        value: e.target.value, // valor que va a tomar
      });
    }
  };

  const handleAutocompletar = (e) => {
    e.preventDefault();
    dispatch({ field: "name", value: "User Default" });
    dispatch({ field: "email", value: "userdefault@devflix.com" }); // generar nuevo email para no repetir
    dispatch({ field: "password", value: "12345%validar2" });
    dispatch({ field: "password2", value: "12345%validar2" });
    dispatch({ field: "age", value: 20 });
  };

  // * Funciones validación: *
  const comprobarVacio = (campo, valor) => {
    if (valor.trim() === "") {
      setErrores((prev_errores) => ({
        ...prev_errores,
        [campo]: [
          ...(prev_errores[campo] || []),
          `Field ${campo} can´t be empty`,
        ],
      }));
    }
  };

  // 📋 Validar campos en cliente
  const validarCampos = () => {
    // Trabajo con una copia de los errores para retornarla después
    const errores = {
      name: [],
      email: [],
      password: [],
      password2: [],
      age: [],
    };

    const { name, email, password, password2, age } = state;

    // Validación de campos vacíos
    const campos = Object.keys(state).map((key) => ({
      campo: key,
      valor: state[key],
    }));

    campos.forEach(({ campo, valor }) => {
      // valido age a parte
      if (campo === "age") {
        if (valor === "") {
          errores[campo] = [...errores[campo], `Field ${campo} can't be empty`];
        }
      } else if (campo !== "password2") {
        // *** Modificación validar age sin trim ***
        // no compruebo password2 ni age vacíos
        if (valor.trim() === "") {
          errores[campo] = [...errores[campo], `Field ${campo} can't be empty`];
        }
      }
    });

    // Validación de contraseñas coincidentes
    if (password !== password2) {
      errores.password2 = [...errores.password2, "Passwords don't match"];
    }

    // Devolver los errores para ser usados en el componente
    return errores;
  };

  // 🔷 Enviar formulario
  const enviarFormulario = async (e) => {
    e.preventDefault();

    // Limpiar errores antes de cada validación
    setErrores({
      name: [],
      email: [],
      password: [],
      password2: [],
      age: [],
    });

    // Llamar a la función de validación para obtener los errores
    const errores = validarCampos();

    // ❌ Verificar si había errores y manejarlos
    if (
      errores.name.length > 0 ||
      errores.email.length > 0 ||
      errores.password.length > 0 ||
      errores.password2.length > 0 ||
      errores.age.length > 0
    ) {
      setErrores(errores); // actualizar estado errores
      return;
    }

    // ✅ Si no hay errores, enviar el formulario
    const stateSinPassword2 = { ...state };
    delete stateSinPassword2.password2; // Eliminar el campo password2

    // 🚀 Envío de datos al backend
    try {
      const response = await axios.post(
        `${VITE_BACKEND_URL}/register`,
        stateSinPassword2
      );
      // Mostrar en Front respuesta servidor
      if (response.status === 201) {
        setMsgRespuesta(response.data.message); // ✅
      } else {
        setMsgRespuesta("Incorrect register. Internal server error"); // ❌
      }
    } catch (error) {
      setMsgRespuesta("Incorrect register: " + error.response.data.err); // ❌
    }
  };

  return (
    <div className="bg-base-100 flex justify-center items-center ">
      <span className="flex gap-x-4 absolute top-0 right-0 pr-8 lg:pr-26 pt-6">
        <Link to="/">Home</Link>
        <Link to="/login">Log in</Link>
      </span>{" "}
      {/* Enlace a la ruta principal */}
      <div className="mt-6 w-5/6 md:w-2/4 pt-12 md:pt-8 gap-y-6">
        <form
          className="flex flex-col items-center justify-center gap-y-6 min-w-full md:py-16 shadow-lg bg-base-200  
          [&>div>input]:mb-1 [&>div>input]:rounded-md [&>div>input]:w-full [&>div>input]:p-1.5 py-8 md:p-0
          [&>div>label]:text-lg [&>div]:flex [&>div]:flex-col [&>div]:gap-y-1 [&>div]:w-3/4 sm:[&>div]:w-4/6 xl:[&>div]:w-2/6 "
        >
          <h1 className="text-2xl">Sign up</h1>
          <div>
            <label htmlFor="email">Name</label>
            <input
              onChange={handleChange}
              type="text"
              id="name"
              autoComplete="name"
              value={state.name}
            />
            {errores.name.length > 0 &&
              errores.name.map((error, index) => (
                <p key={index} className="text-red-500">
                  {error}
                </p>
              ))}
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              onChange={handleChange}
              type="email"
              id="email"
              autoComplete="email"
              value={state.email}
            />
            {errores.email.length > 0 &&
              errores.email.map((error, index) => (
                <p key={index} className="text-red-500">
                  {error}
                </p>
              ))}
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
            {errores.password.length > 0 &&
              errores.password.map((error, index) => (
                <p key={index} className="text-red-500">
                  {error}
                </p>
              ))}
          </div>{" "}
          <div>
            <label htmlFor="email">Confirm password</label>
            <input
              onChange={handleChange}
              type="password"
              id="password2"
              autoComplete="password2"
              value={state.password2}
            />
            {errores.password2.length > 0 &&
              errores.password2.map((error, index) => (
                <p key={index} className="text-red-500">
                  {error}
                </p>
              ))}
          </div>
          <div>
            <label htmlFor="password">Age</label>
            <input
              onChange={handleChange}
              type="number"
              id="age"
              autoComplete="age"
              value={state.age}
            />
            {errores.age.length > 0 &&
              errores.age.map((error, index) => (
                <p key={index} className="text-red-500">
                  {error}
                </p>
              ))}
          </div>
          <div className="text-center">
            <p>{msgRespuesta}</p>
          </div>
          <div className="!flex-row justify-center items-center gap-x-8 flex-wrap">
            <button
              onClick={enviarFormulario}
              className="btn btn-primary text-white w-36 mt-4"
            >
              Sign up
            </button>
            <button
              onClick={handleAutocompletar}
              className="btn btn-success text-white w-36 mt-4"
            >
              Autocomplete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
