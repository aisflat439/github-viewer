import { GridItem } from "./Components/GridItem/GridItem";

function App() {
  return (
    <div className="bg-slate-50 h-screen w-screen">
      <header className="bg-white">
        <p>Hello Vite + React!</p>
      </header>
      <main className="h-full w-full p-8">
        <h1 className="text-center text-3xl mb-8">Github Repo Viewer</h1>
        <div className="grid grid-cols-12 gap-6 text-white">
          <GridItem
            title="Bundling"
            subtitle="Vite"
            text="Next Generation Frontend Tooling"
          />
          <GridItem
            title="Styling"
            subtitle="Tailwind CSS"
            text="Rapidly build modern websites without ever leaving your HTML."
            className="from-fuchsia-500 via-orange-400 to-amber-300"
          />
          <GridItem
            title="State management"
            subtitle="XState"
            text="JavaScript and TypeScript finite state machines (opens new window)and statecharts (opens new window)for the modern web."
            className="from-amber-400 via-orange-400 to-orange-700"
          />
          <GridItem
            title="the rest"
            subtitle="TanStack"
            text="Headless, type-safe, powerful utilities for complex workflows like Data Management, Data Visualization, Charts, Tables, and UI Components"
            className="from-indigo-500 via-purple-500 to-pink-500"
          />
        </div>
      </main>
    </div>
  );
}

export default App;
