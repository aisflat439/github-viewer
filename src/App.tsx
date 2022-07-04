import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./Routes/Layout";
import { Main } from "./Routes/Main";
import { User } from "./Routes/User";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path=":user" element={<User />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
