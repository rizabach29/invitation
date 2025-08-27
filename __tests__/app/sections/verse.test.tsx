import { render, screen } from "@testing-library/react";
import Verse from "@/app/(sections)/verse";

// Mock the GradientScrollText component
jest.mock("@/app/(components)/gradient-scroll-text", () => {
  function MockGradientScrollText({ paragraph }: { paragraph: string }) {
    return <div data-testid="gradient-scroll-text">{paragraph}</div>;
  }
  MockGradientScrollText.displayName = "MockGradientScrollText";
  return MockGradientScrollText;
});

// Mock the font import
jest.mock("@/app/font", () => ({
  paragraph: { className: "mocked-paragraph-font" },
}));

describe("Verse Component", () => {
  it("should render correctly", () => {
    render(<Verse />);

    // Check if the main container is rendered
    const container = screen.getByText("Q.S. Yasin(36):36").closest("div");
    expect(container).toBeDefined();
  });

  it("should render the Quran verse", () => {
    render(<Verse />);

    const verse = screen.getByTestId("gradient-scroll-text");
    expect(verse).toBeDefined();
    expect(verse.textContent).toContain(
      "Mahasuci Allah yang telah menciptakan berpasang-pasangan"
    );
  });

  it("should render the verse reference", () => {
    render(<Verse />);

    const reference = screen.getByText("Q.S. Yasin(36):36");
    expect(reference).toBeDefined();
  });

  it("should apply correct styling classes", () => {
    render(<Verse />);

    const reference = screen.getByText("Q.S. Yasin(36):36");
    expect(reference.className).toContain("text-white");
    expect(reference.className).toContain("text-lg");
    expect(reference.className).toContain("mocked-paragraph-font");
    expect(reference.className).toContain("mt-8");
  });

  it("should have proper container structure", () => {
    render(<Verse />);

    // Find the container with the verse reference
    const verseReference = screen.getByText("Q.S. Yasin(36):36");
    const innerContainer = verseReference.closest("div");
    const outerContainer = innerContainer?.parentElement;

    // The outer container should have min-h-[100vh] class
    expect(outerContainer?.className).toContain("min-h-[100vh]");
    expect(outerContainer?.className).toContain("flex");
    expect(outerContainer?.className).toContain("flex-col");
    expect(outerContainer?.className).toContain("items-center");
    expect(outerContainer?.className).toContain("justify-center");
  });

  it("should have inner container with correct classes", () => {
    render(<Verse />);

    // The inner container is the direct parent of the verse reference
    const verseReference = screen.getByText("Q.S. Yasin(36):36");
    const innerContainer = verseReference.closest("div");

    expect(innerContainer?.className).toContain("h-auto");
    expect(innerContainer?.className).toContain("w-full");
    expect(innerContainer?.className).toContain("flex");
    expect(innerContainer?.className).toContain("flex-col");
    expect(innerContainer?.className).toContain("items-center");
    expect(innerContainer?.className).toContain("justify-center");
    expect(innerContainer?.className).toContain("pb-24");
    expect(innerContainer?.className).toContain("max-w-xl");
  });

  it("should pass the correct verse text to GradientScrollText", () => {
    render(<Verse />);

    const gradientText = screen.getByTestId("gradient-scroll-text");
    const expectedText =
      '"Mahasuci Allah yang telah menciptakan berpasang-pasangan semua makhluk, baik dari apa yang ditumbuhkan bumi, maupun dari diri mereka sendiri, dan apa yang tidak mereka ketahui."';
    expect(gradientText.textContent).toBe(expectedText);
  });
});
