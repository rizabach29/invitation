import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { Input } from "@/components/ui/input";

describe("Input Component", () => {
  it("should render correctly", () => {
    render(<Input placeholder="Enter text" />);
    const input = screen.getByPlaceholderText("Enter text");
    expect(input).toBeDefined();
  });

  it("should apply default classes", () => {
    render(<Input data-testid="input" />);
    const input = screen.getByTestId("input");
    expect(input.className).toContain("flex");
    expect(input.className).toContain("h-9");
    expect(input.className).toContain("w-full");
    expect(input.className).toContain("rounded-md");
    expect(input.className).toContain("border");
  });

  it("should handle custom className", () => {
    render(<Input className="custom-class" data-testid="input" />);
    const input = screen.getByTestId("input");
    expect(input.className).toContain("custom-class");
  });

  it("should handle different input types", () => {
    render(<Input type="email" data-testid="email-input" />);
    const input = screen.getByTestId("email-input") as HTMLInputElement;
    expect(input.type).toBe("email");
  });

  it("should handle disabled state", () => {
    render(<Input disabled data-testid="input" />);
    const input = screen.getByTestId("input") as HTMLInputElement;
    expect(input.disabled).toBe(true);
    expect(input.className).toContain("disabled:cursor-not-allowed");
    expect(input.className).toContain("disabled:opacity-50");
  });

  it("should handle value changes", () => {
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} data-testid="input" />);
    const input = screen.getByTestId("input");

    fireEvent.change(input, { target: { value: "test value" } });
    expect(handleChange).toHaveBeenCalled();
  });

  it("should handle focus and blur events", () => {
    const handleFocus = jest.fn();
    const handleBlur = jest.fn();
    render(
      <Input onFocus={handleFocus} onBlur={handleBlur} data-testid="input" />
    );
    const input = screen.getByTestId("input");

    fireEvent.focus(input);
    expect(handleFocus).toHaveBeenCalled();

    fireEvent.blur(input);
    expect(handleBlur).toHaveBeenCalled();
  });

  it("should forward ref correctly", () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input ref={ref} data-testid="input" />);

    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe("INPUT");
  });

  it("should handle placeholder text", () => {
    render(<Input placeholder="Test placeholder" />);
    const input = screen.getByPlaceholderText("Test placeholder");
    expect(input).toBeDefined();
  });

  it("should apply focus-visible classes", () => {
    render(<Input data-testid="input" />);
    const input = screen.getByTestId("input");
    expect(input.className).toContain("focus-visible:outline-none");
    expect(input.className).toContain("focus-visible:ring-1");
    expect(input.className).toContain("focus-visible:ring-ring");
  });
});
