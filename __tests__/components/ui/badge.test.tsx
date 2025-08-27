import { render, screen } from "@testing-library/react";
import { Badge } from "@/components/ui/badge";

describe("Badge Component", () => {
  it("should render correctly", () => {
    render(<Badge>Badge content</Badge>);
    const badge = screen.getByText("Badge content");
    expect(badge).toBeDefined();
  });

  it("should apply default variant classes", () => {
    render(<Badge data-testid="badge">Default</Badge>);
    const badge = screen.getByTestId("badge");
    expect(badge.className).toContain("border-transparent");
    expect(badge.className).toContain("bg-primary");
    expect(badge.className).toContain("text-primary-foreground");
    expect(badge.className).toContain("shadow");
  });

  it("should apply secondary variant classes", () => {
    render(
      <Badge variant="secondary" data-testid="badge">
        Secondary
      </Badge>
    );
    const badge = screen.getByTestId("badge");
    expect(badge.className).toContain("bg-secondary");
    expect(badge.className).toContain("text-secondary-foreground");
    expect(badge.className).toContain("hover:bg-secondary/80");
  });

  it("should apply destructive variant classes", () => {
    render(
      <Badge variant="destructive" data-testid="badge">
        Destructive
      </Badge>
    );
    const badge = screen.getByTestId("badge");
    expect(badge.className).toContain("bg-destructive");
    expect(badge.className).toContain("text-destructive-foreground");
    expect(badge.className).toContain("hover:bg-destructive/80");
  });

  it("should apply outline variant classes", () => {
    render(
      <Badge variant="outline" data-testid="badge">
        Outline
      </Badge>
    );
    const badge = screen.getByTestId("badge");
    expect(badge.className).toContain("text-foreground");
  });

  it("should apply base classes to all variants", () => {
    render(<Badge data-testid="badge">Test</Badge>);
    const badge = screen.getByTestId("badge");
    expect(badge.className).toContain("inline-flex");
    expect(badge.className).toContain("items-center");
    expect(badge.className).toContain("rounded-md");
    expect(badge.className).toContain("border");
    expect(badge.className).toContain("px-2.5");
    expect(badge.className).toContain("py-0.5");
    expect(badge.className).toContain("text-xs");
    expect(badge.className).toContain("font-semibold");
    expect(badge.className).toContain("transition-colors");
  });

  it("should handle custom className", () => {
    render(
      <Badge className="custom-class" data-testid="badge">
        Custom
      </Badge>
    );
    const badge = screen.getByTestId("badge");
    expect(badge.className).toContain("custom-class");
  });

  it("should handle additional props", () => {
    render(
      <Badge id="test-badge" data-custom="value" data-testid="badge">
        Props
      </Badge>
    );
    const badge = screen.getByTestId("badge");
    expect(badge.id).toBe("test-badge");
    expect(badge.getAttribute("data-custom")).toBe("value");
  });

  it("should apply focus classes", () => {
    render(<Badge data-testid="badge">Focus</Badge>);
    const badge = screen.getByTestId("badge");
    expect(badge.className).toContain("focus:outline-none");
    expect(badge.className).toContain("focus:ring-2");
    expect(badge.className).toContain("focus:ring-ring");
    expect(badge.className).toContain("focus:ring-offset-2");
  });

  it("should render as div element", () => {
    render(<Badge data-testid="badge">Test</Badge>);
    const badge = screen.getByTestId("badge");
    expect(badge.tagName).toBe("DIV");
  });

  describe("all variants", () => {
    const variants = [
      "default",
      "secondary",
      "destructive",
      "outline",
    ] as const;

    variants.forEach((variant) => {
      it(`should render ${variant} variant correctly`, () => {
        render(
          <Badge variant={variant} data-testid={`badge-${variant}`}>
            {variant}
          </Badge>
        );
        const badge = screen.getByTestId(`badge-${variant}`);
        expect(badge).toBeDefined();
        expect(badge.textContent).toBe(variant);
      });
    });
  });
});
