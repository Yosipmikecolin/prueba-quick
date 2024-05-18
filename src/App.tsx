import { Route, Routes } from "react-router";
import { Login, Pokemons } from "./views";
import { useAuth } from "./hooks";
import { Alerts, NotFoundPage, PrivateRoute, Spiner } from "./components";
import { useEffect, useState } from "react";

function App() {
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const local = localStorage.getItem("user");
    if (local) {
      const validarUser: boolean = JSON.parse(local);
      setUser(validarUser);
    }

    setLoading(false);
  }, []);

  return (
    <main>
      {loading ? (
        <Spiner />
      ) : (
        <Routes>
          <Route element={ <PrivateRoute isAuthenticated={user} isLoginComponent={true} />}>
            <Route path="/" element={<Login />} />
          </Route>

          <Route element={ <PrivateRoute isAuthenticated={user} isLoginComponent={false} />}>
            <Route path="/pokemons" element={<Pokemons />} />
          </Route>
          
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      )}
      <Alerts/>
    </main>
  );
}

export default App;
