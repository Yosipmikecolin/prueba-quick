import { Route, Routes } from "react-router";
import { Login, Pokemons } from "./views";
import { useAuth } from "./hooks";
import { NotFoundPage, PrivateRoute } from "./components";
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
        <h1>Cargando</h1>
      ) : (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<PrivateRoute isAuthenticated={user} />}>
            <Route path="/pokemons" element={<Pokemons />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      )}
    </main>
  );
}

export default App;
