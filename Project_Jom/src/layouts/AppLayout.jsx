import { Outlet } from "react-router";
import AppNavbar from "../components/AppNavbar";

function AppLayout() {
  return (
    <>
      <AppNavbar />
      <Outlet />
    </>
  );
}

export default AppLayout;