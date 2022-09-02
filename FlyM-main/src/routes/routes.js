import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy } from "react";
import { Suspense } from "react";
import Spinner from "./../Layout/Spinner";
import { Navigate } from "react-router-dom";
const Home = lazy(() => import("../pages/Home"));
const BrowsePage = lazy(() => import("../pages/BrowsePage"));

const RoutePaths = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/" element={<Navigate to="/FlyM/" />}></Route>
          <Route path="/FlyM/" element={<Home />}></Route>
          <Route path="/FlyM/browse-page" element={<BrowsePage />}></Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default RoutePaths;
