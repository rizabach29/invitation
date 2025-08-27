import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "@/components/ui/button";

describe("Button Component", () => {
  it("should render correctly", () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeDefined();
  });

  it("should apply default variant and size classes", () => {
    render(<Button>Default Button</Button>);
    const button = screen.getByRole("button");
    expect(button.className).toContain("bg-primary");
    expect(button.className).toContain("text-primary-foreground");
    expect(button.className).toContain("h-9");
    expect(button.className).toContain("px-4");
    expect(button.className).toContain("py-2");
  });

  it("should apply destructive variant classes", () => {
    render(<Button variant="destructive">Delete</Button>);
    const button = screen.getByRole("button");
    expect(button.className).toContain("bg-destructive");
    expect(button.className).toContain("text-destructive-foreground");
  });

  it("should apply outline variant classes", () => {
    render(<Button variant="outline">Outline</Button>);
    const button = screen.getByRole("button");
    expect(button.className).toContain("border");
    expect(button.className).toContain("border-input");
    expect(button.className).toContain("bg-background");
  });

  it("should apply secondary variant classes", () => {
    render(<Button variant="secondary">Secondary</Button>);
    const button = screen.getByRole("button");
    expect(button.className).toContain("bg-secondary");
    expect(button.className).toContain("text-secondary-foreground");
  });

  it("should apply ghost variant classes", () => {
    render(<Button variant="ghost">Ghost</Button>);
    const button = screen.getByRole("button");
    expect(button.className).toContain("hover:bg-accent");
    expect(button.className).toContain("hover:text-accent-foreground");
  });

  it("should apply link variant classes", () => {
    render(<Button variant="link">Link</Button>);
    const button = screen.getByRole("button");
    expect(button.className).toContain("text-primary");
    expect(button.className).toContain("underline-offset-4");
    expect(button.className).toContain("hover:underline");
  });

  it("should apply small size classes", () => {
    render(<Button size="sm">Small</Button>);
    const button = screen.getByRole("button");
    expect(button.className).toContain("h-8");
    expect(button.className).toContain("rounded-md");
    expect(button.className).toContain("px-3");
    expect(button.className).toContain("text-xs");
  });

  it("should apply large size classes", () => {
    render(<Button size="lg">Large</Button>);
    const button = screen.getByRole("button");
    expect(button.className).toContain("h-10");
    expect(button.className).toContain("rounded-md");
    expect(button.className).toContain("px-8");
  });

  it("should apply icon size classes", () => {
    render(<Button size="icon">Icon</Button>);
    const button = screen.getByRole("button");
    expect(button.className).toContain("h-9");
    expect(button.className).toContain("w-9");
  });

  it("should handle custom className", () => {
    render(<Button className="custom-class">Custom</Button>);
    const button = screen.getByRole("button");
    expect(button.className).toContain("custom-class");
  });

  it("should handle disabled state", () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole("button") as HTMLButtonElement;
    expect(button.disabled).toBe(true);
    expect(button.className).toContain("disabled:pointer-events-none");
    expect(button.className).toContain("disabled:opacity-50");
  });

  it("should handle click events", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("should render as child when asChild is true", () => {
    render(
      <Button asChild>
        <a href="/test">Link Button</a>
      </Button>
    );
    const link = screen.getByRole("link");
    expect(link).toBeDefined();
    expect(link.getAttribute("href")).toBe("/test");
  });

  it("should apply all button variant classes", () => {
    render(<Button>Button</Button>);
    const button = screen.getByRole("button");
    expect(button.className).toContain("inline-flex");
    expect(button.className).toContain("items-center");
    expect(button.className).toContain("justify-center");
    expect(button.className).toContain("gap-2");
    expect(button.className).toContain("whitespace-nowrap");
    expect(button.className).toContain("rounded-md");
    expect(button.className).toContain("text-sm");
    expect(button.className).toContain("font-medium");
    expect(button.className).toContain("transition-colors");
  });
});
