import { Route, Routes } from "react-router";
import { Login, Map } from "./views";

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/map" element={<Map />} />
      </Routes>
    </main>
  );
}

export default App;
