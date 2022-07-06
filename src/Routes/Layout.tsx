import { Outlet } from "react-router-dom";
import { GlobalNav } from "../Components/GlobalNav/GlobalNav";
import { Search } from "../Components/Search/Search";

export const Layout = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      <GlobalNav />
      <Search />
      <main className="h-full w-full p-8 m-auto max-w-6xl">
        <Outlet />
      </main>
    </div>
  );
};
