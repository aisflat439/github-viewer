import { Outlet } from "react-router-dom";
import { GlobalNav } from "../Components/GlobalNav/GlobalNav";

export const Layout = () => {
  return (
    <div className="bg-slate-50 h-screen w-screen">
      <GlobalNav />
      <main className="h-full w-full p-8 m-auto max-w-6xl">
        <Outlet />
      </main>
    </div>
  );
};
