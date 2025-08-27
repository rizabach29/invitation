import { render, screen } from "@testing-library/react";
import React from "react";
import { Separator } from "@/components/ui/separator";

// Mock Radix UI Separator
jest.mock("@radix-ui/react-separator", () => {
  const MockRoot = React.forwardRef<HTMLDivElement, any>(
    ({ children, ...props }, ref) => (
      <div ref={ref} {...props} data-testid="separator-root">
        {children}
      </div>
    )
  );
  MockRoot.displayName = "MockSeparatorRoot";

  return {
    Root: MockRoot,
  };
});

describe("Separator Component", () => {
  it("should render correctly", () => {
    render(<Separator data-testid="separator" />);
    const separator = screen.getByTestId("separator-root");
    expect(separator).toBeDefined();
  });

  it("should apply default horizontal orientation classes", () => {
    render(<Separator data-testid="separator" />);
    const separator = screen.getByTestId("separator-root");
    expect(separator.className).toContain("shrink-0");
    expect(separator.className).toContain("bg-border");
    expect(separator.className).toContain("h-[1px]");
    expect(separator.className).toContain("w-full");
  });

  it("should apply vertical orientation classes", () => {
    render(<Separator orientation="vertical" data-testid="separator" />);
    const separator = screen.getByTestId("separator-root");
    expect(separator.className).toContain("shrink-0");
    expect(separator.className).toContain("bg-border");
    expect(separator.className).toContain("h-full");
    expect(separator.className).toContain("w-[1px]");
  });

  it("should handle custom className", () => {
    render(<Separator className="custom-class" data-testid="separator" />);
    const separator = screen.getByTestId("separator-root");
    expect(separator.className).toContain("custom-class");
  });

  it("should apply decorative prop by default", () => {
    render(<Separator data-testid="separator" />);
    const separator = screen.getByTestId("separator-root");

    // The decorative prop is handled internally by Radix UI
    // We just verify the component renders correctly with default props
    expect(separator).toBeDefined();
    expect(separator.className).toContain("shrink-0");
    expect(separator.className).toContain("bg-border");
  });

  it("should handle non-decorative separator", () => {
    render(<Separator decorative={false} data-testid="separator" />);
    const separator = screen.getByTestId("separator-root");

    // Verify the component renders correctly with decorative=false
    expect(separator).toBeDefined();
    expect(separator.className).toContain("shrink-0");
    expect(separator.className).toContain("bg-border");
  });

  it("should apply horizontal orientation by default", () => {
    render(<Separator data-testid="separator" />);
    const separator = screen.getByTestId("separator-root");
    expect(separator.getAttribute("orientation")).toBe("horizontal");
  });

  it("should handle vertical orientation prop", () => {
    render(<Separator orientation="vertical" data-testid="separator" />);
    const separator = screen.getByTestId("separator-root");
    expect(separator.getAttribute("orientation")).toBe("vertical");
  });

  it("should forward ref correctly", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Separator ref={ref} data-testid="separator" />);

    expect(ref.current).not.toBeNull();
  });

  it("should handle additional props", () => {
    render(
      <Separator
        id="test-separator"
        data-custom="value"
        data-testid="separator"
      />
    );
    const separator = screen.getByTestId("separator-root");
    expect(separator.id).toBe("test-separator");
    expect(separator.getAttribute("data-custom")).toBe("value");
  });

  describe("orientation variations", () => {
    it("should render horizontal separator with correct classes", () => {
      render(<Separator orientation="horizontal" data-testid="separator" />);
      const separator = screen.getByTestId("separator-root");
      expect(separator.className).toContain("h-[1px]");
      expect(separator.className).toContain("w-full");
      expect(separator.className).not.toContain("h-full");
      expect(separator.className).not.toContain("w-[1px]");
    });

    it("should render vertical separator with correct classes", () => {
      render(<Separator orientation="vertical" data-testid="separator" />);
      const separator = screen.getByTestId("separator-root");
      expect(separator.className).toContain("h-full");
      expect(separator.className).toContain("w-[1px]");
      expect(separator.className).not.toContain("h-[1px]");
      expect(separator.className).not.toContain("w-full");
    });
  });
});
