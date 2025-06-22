import { Route, Routes, BrowserRouter, Navigate } from "react-router";
import { View } from "./pages/View";
import { AddItem } from "./pages/AddItem";
export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/add-item" />}></Route>

        <Route path="/view-items" element={<View />}></Route>
        <Route path="/add-item" element={<AddItem />}></Route>
        <Route path="*" element={<div>Not Found</div>}></Route>
      </Routes>
    </BrowserRouter>
  );
};
