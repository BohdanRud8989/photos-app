import { render, screen } from "@testing-library/react";
import { expect, test, describe } from "vitest";
import Photo from "./Photo";

describe("Photo component", () => {
  test("renders Photo with initials", () => {
    const photographer = "John Doe";
    const width = 200;
    const height = 250;

    const { container } = render(
      <Photo photographer={photographer} width={width} height={height} />,
    );

    const initials = screen.getByText("JD");
    const image = screen.queryByRole("img");
    const photoContainer = container.querySelector("photo--maximized");

    expect(photoContainer).toBeNull();
    expect(initials).toBeDefined();
    expect(image).toBeNull();
  });

  test("renders Photo with image", () => {
    const url = "https://example.com/avatar.jpg";
    const photographer = "John Doe";
    const width = 200;
    const height = 250;

    const { container } = render(
      <Photo
        url={url}
        photographer={photographer}
        width={width}
        height={height}
        maximized
      />,
    );

    const image = screen.getByRole("img");
    const initials = screen.queryByText("JD");
    const photoContainer = container.querySelector("photo--maximized");

    expect(photoContainer).toBeDefined();
    expect(image).toBeDefined();
    expect(image.src).toContain("example.com");
    expect(image.alt).toBe(`${photographer}'s photo`);
    expect(image.width).toBe(width);
    expect(image.height).toBe(height);
    expect(initials).toBeNull();
  });
});
