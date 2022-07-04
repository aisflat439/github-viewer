import { GridItem } from "../Components/GridItem/GridItem";

export const Main = () => {
  return (
    <>
      <h1 className="text-center text-3xl mb-8">Github Repo Viewer</h1>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <label>
            <input type="text" placeholder="Search for a github user" />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
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
    </>
  );
};
