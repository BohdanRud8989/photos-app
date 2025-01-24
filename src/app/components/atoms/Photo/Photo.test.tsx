import { render, screen } from "@testing-library/react";
import { expect, test, describe } from "vitest";
import { ThemeProvider } from "styled-components";
import Photo from "./Photo";
import { theme } from "../../../assets/styles/theme";

const mockedPhoto = {
  photographer: "John Doe",
  width: 200,
  height: 250,
};

const MockThemeProvider = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe("Photo component", () => {
  test("renders Photo with initials", () => {
    render(
      <MockThemeProvider>
        <Photo {...mockedPhoto} />
      </MockThemeProvider>,
    );

    const initials = screen.getByText("JD");
    const image = screen.queryByRole("img");

    expect(initials).toBeDefined();
    expect(image).toBeNull();
  });

  test("renders Photo with image", () => {
    const url = "https://example.com/avatar.jpg";

    render(
      <MockThemeProvider>
        <Photo url={url} maximized {...mockedPhoto} />
      </MockThemeProvider>,
    );

    const image = screen.getByRole("img");
    const initials = screen.queryByText("JD");

    expect(image).toBeDefined();
    expect(image.src).toContain("example.com");
    expect(image.alt).toBe(`${mockedPhoto.photographer}'s photo`);
    expect(image.width).toBe(mockedPhoto.width);
    expect(image.height).toBe(mockedPhoto.height);
    expect(initials).toBeNull();
  });
});
