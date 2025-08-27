import { render, screen } from "@testing-library/react";
import Header from "@/app/(sections)/header";
import { MotionValue } from "framer-motion";

// Mock the Couple illustration component
jest.mock("@/app/sources/illustration/Couple", () => {
  function MockCouple() {
    return <div data-testid="couple-illustration">Couple Illustration</div>;
  }
  MockCouple.displayName = "MockCouple";
  return MockCouple;
});

// Mock the font imports
jest.mock("@/app/font", () => ({
  paragraph: { className: "mocked-paragraph-font" },
  script: { className: "mocked-script-font" },
}));

// Mock the utils
jest.mock("@/app/utils", () => ({
  PRIMARY_COLOR: "#BB543B",
}));

// Create a proper MotionValue mock
const createMockMotionValue = (): MotionValue<number> => {
  return {
    get: () => 0,
    set: jest.fn(),
    subscribe: jest.fn(() => jest.fn()),
  } as any;
};

// Mock useScroll and useTransform since they need actual DOM elements
jest.mock("framer-motion", () => ({
  ...jest.requireActual("framer-motion"),
  useScroll: () => ({
    scrollYProgress: createMockMotionValue(),
  }),
  useTransform: () => createMockMotionValue(),
  useInView: () => true,
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    h3: ({ children, ...props }: any) => <h3 {...props}>{children}</h3>,
  },
}));

describe("Header Component", () => {
  const mockScrollParentYProgress = createMockMotionValue();

  it("should render correctly", () => {
    render(<Header scrollParentYProgress={mockScrollParentYProgress} />);

    expect(screen.getByText("Pernikahan")).toBeDefined();
    expect(screen.getByText("Dinnar")).toBeDefined();
    expect(screen.getByText("&")).toBeDefined();
    expect(screen.getByText("Riza")).toBeDefined();
  });

  it("should render the Couple illustration", () => {
    render(<Header scrollParentYProgress={mockScrollParentYProgress} />);

    const coupleIllustration = screen.getByTestId("couple-illustration");
    expect(coupleIllustration).toBeDefined();
    expect(coupleIllustration.textContent).toBe("Couple Illustration");
  });

  it("should apply correct styling to wedding text", () => {
    render(<Header scrollParentYProgress={mockScrollParentYProgress} />);

    const pernikahanText = screen.getByText("Pernikahan");
    expect(pernikahanText.className).toContain("text-6xl");
    expect(pernikahanText.className).toContain("tracking-tight");
    expect(pernikahanText.className).toContain("text-[#BB543B]");
    expect(pernikahanText.className).toContain("font-medium");
    expect(pernikahanText.className).toContain("text-center");
    expect(pernikahanText.className).toContain("mocked-paragraph-font");
  });

  it("should apply script font to names", () => {
    render(<Header scrollParentYProgress={mockScrollParentYProgress} />);

    const dinnarText = screen.getByText("Dinnar");
    const rizaText = screen.getByText("Riza");

    expect(dinnarText.className).toContain("mocked-script-font");
    expect(rizaText.className).toContain("mocked-script-font");
  });

  it("should apply paragraph font to ampersand", () => {
    render(<Header scrollParentYProgress={mockScrollParentYProgress} />);

    const ampersandText = screen.getByText("&");
    expect(ampersandText.className).toContain("mocked-paragraph-font");
  });

  it("should have correct container structure", () => {
    render(<Header scrollParentYProgress={mockScrollParentYProgress} />);

    // Find the outermost container by traversing up from the text
    const pernikahanText = screen.getByText("Pernikahan");
    const parentContainers = [];
    let current = pernikahanText.parentElement;

    while (current) {
      if (current.className) {
        parentContainers.push(current.className);
      }
      current = current.parentElement;
    }

    // Check if we have the expected classes somewhere in the hierarchy
    const hasOverflowClip = parentContainers.some((className) =>
      className.includes("overflow-clip")
    );
    const hasFullWidth = parentContainers.some((className) =>
      className.includes("w-full")
    );
    const hasFullHeight = parentContainers.some((className) =>
      className.includes("h-[100vh]")
    );
    const hasSticky = parentContainers.some((className) =>
      className.includes("sticky")
    );

    expect(hasOverflowClip).toBe(true);
    expect(hasFullWidth).toBe(true);
    expect(hasFullHeight).toBe(true);
    expect(hasSticky).toBe(true);
  });

  it("should have names container with proper gap", () => {
    render(<Header scrollParentYProgress={mockScrollParentYProgress} />);

    const namesContainer = screen.getByText("Dinnar").closest("div");
    expect(namesContainer?.className).toContain("flex");
    expect(namesContainer?.className).toContain("gap-3");
  });

  it("should render all text elements with consistent styling", () => {
    render(<Header scrollParentYProgress={mockScrollParentYProgress} />);

    const textElements = [
      screen.getByText("Pernikahan"),
      screen.getByText("Dinnar"),
      screen.getByText("&"),
      screen.getByText("Riza"),
    ];

    textElements.forEach((element) => {
      expect(element.className).toContain("text-6xl");
      expect(element.className).toContain("tracking-tight");
      expect(element.className).toContain("text-[#BB543B]");
      expect(element.className).toContain("font-medium");
      expect(element.className).toContain("text-center");
    });
  });

  it("should have content centered and styled correctly", () => {
    render(<Header scrollParentYProgress={mockScrollParentYProgress} />);

    // Find the content container that has the flex and centering classes
    const pernikahanText = screen.getByText("Pernikahan");
    let contentContainer = pernikahanText.parentElement;

    // Walk up the tree to find the container with flex classes
    while (
      contentContainer &&
      !contentContainer.className.includes("flex flex-col")
    ) {
      contentContainer = contentContainer.parentElement;
    }

    expect(contentContainer?.className).toContain("flex");
    expect(contentContainer?.className).toContain("flex-col");
    expect(contentContainer?.className).toContain("w-full");
    expect(contentContainer?.className).toContain("h-screen");
    expect(contentContainer?.className).toContain("sticky");
    expect(contentContainer?.className).toContain("top-0");
    expect(contentContainer?.className).toContain("items-center");
    expect(contentContainer?.className).toContain("justify-center");
    expect(contentContainer?.className).toContain("pb-24");
  });
});
