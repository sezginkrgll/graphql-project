// React Router
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Layouts>DashboardLayout
import DashboardLayout from "./layouts/DashboardLayout";
// Pages>Home
import Home from "./pages/Home";
import Event from "./pages/Event";
import Error404 from "./pages/Error404";
import NewEvent from "./pages/NewEvent";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Home />} />
          <Route path="event/:id" element={<Event />} />
          <Route path="new" element={<NewEvent />} />
        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
