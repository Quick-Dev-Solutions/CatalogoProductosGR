import { createContext, useState } from "react";
// import axios from "axios";
// import Cookies from "js-cookie";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);


/*  const getUserData = async (authToken) => {
    try {
      setLoading(true);
      const response = await axios.get(`https://${host}/getUserData`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'ngrok-skip-browser-warning': 'true',
        },
      });
      setUser(response.data);
      setLoading(false)
    } catch (error) {
      setUser(null);
      Cookies.remove("token");
      console.error(error);
      setLoading(false)
    } finally {
      setLoading(false);
    }
  };

  const login = async (mail, password) => {
    setLoading(true); // Solo aquí
    try {
      const response = await axios.post(`https://${host}/login`, { mail, password });
      console.log(response);
      if (response.data) {
        const { token } = response.data;
        Cookies.set('token', token, { expires: 7 });
        setAuth(token);
        await getUserData(token); // Asegúrate de que esto se ejecute antes de terminar el loading
      }
      return response;
    } catch (error) {
      console.error(error);
      const msg = error.message === "Network Error" ? 'Hay problemas con el servidor' : 'Ocurrió un error';
      return msg;
    } finally {
      setLoading(false); // Aquí se cierra el loading
    }
  };

  const logOut = () => {
    Cookies.remove('token');
    setAuth(null);
    setUser(null);
  };

  const updateUser = async (nombre, apellido, dni, mail, telefono) => {
    setLoading(true); // Solo aquí
    try {
      const response = await axios.post(`https://${host}/perfil/actualizar`, {
        nombre, apellido, dni, mail, telefono
      }, {
        headers: {
          Authorization: `Bearer ${auth}`,
          'ngrok-skip-browser-warning': 'true',
        },
      });
      setUser(response.data.user);
      return response.data;
    } catch (error) {
      console.error(error);
      return { success: false, message: 'Error al actualizar' }; // Return an error response
    } finally {
      setLoading(false); // Aquí se cierra el loading
    }
  };
*/
  return (
    <AuthContext.Provider value={{
      loading, setLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
};
