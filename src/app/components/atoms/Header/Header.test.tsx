import { render, screen } from "@testing-library/react";
import { expect, test, describe } from "vitest";
import Header from "./Header";

describe("Header component", () => {
  test("should render Header component correctly", () => {
    render(<Header />);

    const headerElement = screen.getByRole("banner");
    expect(headerElement).toBeDefined();

    const logoImage = screen.getByRole("img", { name: "Masonry Grid logo" });
    expect(logoImage).toBeDefined();

    const userSettingLink = screen.getByRole("link", { name: "User setting" });
    expect(userSettingLink).toBeDefined();
  });
});
