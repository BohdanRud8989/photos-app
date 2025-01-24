import { render, screen, fireEvent } from "@testing-library/react";
import { expect, test, describe, vi } from "vitest";
import type { Photo as PexelsPhoto } from "pexels";
import { ThemeProvider } from "styled-components";
import PhotoCard from "./PhotoCard";
import { theme } from "../../../assets/styles/theme";

type PartializedPexelsPhoto = Partial<
  Omit<PexelsPhoto, "src"> & { url?: string }
>;

const mockedPhoto: PartializedPexelsPhoto = {
  id: 123456,
  photographer: "John Doe",
  alt: "Simple photo for testing purpose",
  width: 3000,
  height: 1800,
  url: "https://example.com/avatar.jpg?w=250&h=200",
};

const pushMocked = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(() => ({
    push: pushMocked,
  })),
}));

const MockThemeProvider = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe("PhotoCard component", () => {
  test("renders PhotoCard with just image(Extended view mode is false)", () => {
    render(
      <MockThemeProvider>
        <PhotoCard {...mockedPhoto} />
      </MockThemeProvider>,
    );

    const imageElement = screen.getByRole("img");
    const photographerElement = screen.queryByText(mockedPhoto.photographer);
    const descriptionElement = screen.queryByText(mockedPhoto.alt);

    expect(imageElement).toBeDefined();
    expect(imageElement.src).toContain("example.com");
    expect(photographerElement).toBeNull();
    expect(descriptionElement).toBeNull();
  });

  test("renders PhotoCard in extended mode(with additional info)", () => {
    render(
      <MockThemeProvider>
        <PhotoCard {...mockedPhoto} extended />
      </MockThemeProvider>,
    );

    const imageElement = screen.getByRole("img");
    const photographerElement = screen.getByText(mockedPhoto.photographer);
    const descriptionElement = screen.getByText(mockedPhoto.alt);

    expect(imageElement).toBeDefined();
    expect(photographerElement).toBeDefined();
    expect(descriptionElement).toBeDefined();
  });

  test("clicking on PhotoCard should lead to Photo details page", async () => {
    render(
      <MockThemeProvider>
        <PhotoCard {...mockedPhoto} />
      </MockThemeProvider>,
    );

    const photoCard = screen.getAllByTestId("photo-card-test-id");

    await fireEvent.click(photoCard[0]);

    expect(pushMocked).toHaveBeenCalledWith(`/photos/${mockedPhoto.id}`);
  });
});
