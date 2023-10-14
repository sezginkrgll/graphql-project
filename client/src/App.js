// React Router
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Layouts>DashboardLayout
import DashboardLayout from "./layouts/DashboardLayout";
// Pages>Home
import Home from "./pages/Home";
import Event from "./pages/Event";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Home />} />
          <Route path="event/:id" element={<Event />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
