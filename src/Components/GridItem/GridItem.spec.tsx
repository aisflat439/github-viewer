import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";

import { GridItem, GridItemProps } from "./GridItem";

type Overrides = Partial<GridItemProps>;

const setup = (overrides: Overrides) => {
  const props = {
    className: "some class names",
    title: "some title",
    subtitle: "a subtitle",
    text: "any text",
    ...overrides,
  };

  const R = render(<GridItem {...props} />);

  return {
    ...R,
    props,
  };
};

describe("<GridItem />", () => {
  it("renders a card with default styling", () => {
    const { getByTestId } = setup({ className: undefined });

    expect(getByTestId("grid-item")).toHaveClass("from-indigo-500");
  });

  it("overrides with custom styles", () => {
    const { getByTestId } = setup({ className: "custom styles" });

    expect(getByTestId("grid-item")).not.toHaveClass("from-indigo-500");
    expect(getByTestId("grid-item")).toHaveClass("custom styles");
  });

  it("renders the title", () => {
    const { getByText } = setup({ title: "example" });

    expect(getByText("example")).toBeInTheDocument();
  });

  it("renders the subtitle", () => {
    const { getByText } = setup({ subtitle: "example" });

    expect(getByText("example")).toBeInTheDocument();
  });

  it("renders the text", () => {
    const { getByText } = setup({ text: "example" });

    expect(getByText("example")).toBeInTheDocument();
  });
});
