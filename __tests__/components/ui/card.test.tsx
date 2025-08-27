import { render, screen } from "@testing-library/react";
import React from "react";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

describe("Card Components", () => {
  describe("Card", () => {
    it("should render correctly", () => {
      render(<Card data-testid="card">Card content</Card>);
      const card = screen.getByTestId("card");
      expect(card).toBeDefined();
      expect(card.textContent).toBe("Card content");
    });

    it("should apply default classes", () => {
      render(<Card data-testid="card" />);
      const card = screen.getByTestId("card");
      expect(card.className).toContain("rounded-xl");
      expect(card.className).toContain("border");
      expect(card.className).toContain("bg-card");
      expect(card.className).toContain("text-card-foreground");
      expect(card.className).toContain("shadow");
    });

    it("should handle custom className", () => {
      render(<Card className="custom-class" data-testid="card" />);
      const card = screen.getByTestId("card");
      expect(card.className).toContain("custom-class");
    });

    it("should forward ref correctly", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Card ref={ref} data-testid="card" />);

      expect(ref.current).not.toBeNull();
      expect(ref.current?.tagName).toBe("DIV");
    });
  });

  describe("CardHeader", () => {
    it("should render correctly", () => {
      render(<CardHeader data-testid="card-header">Header content</CardHeader>);
      const header = screen.getByTestId("card-header");
      expect(header).toBeDefined();
      expect(header.textContent).toBe("Header content");
    });

    it("should apply default classes", () => {
      render(<CardHeader data-testid="card-header" />);
      const header = screen.getByTestId("card-header");
      expect(header.className).toContain("flex");
      expect(header.className).toContain("flex-col");
      expect(header.className).toContain("space-y-1.5");
      expect(header.className).toContain("p-6");
    });

    it("should handle custom className", () => {
      render(
        <CardHeader className="custom-header" data-testid="card-header" />
      );
      const header = screen.getByTestId("card-header");
      expect(header.className).toContain("custom-header");
    });
  });

  describe("CardTitle", () => {
    it("should render correctly", () => {
      render(<CardTitle data-testid="card-title">Title content</CardTitle>);
      const title = screen.getByTestId("card-title");
      expect(title).toBeDefined();
      expect(title.textContent).toBe("Title content");
    });

    it("should apply default classes", () => {
      render(<CardTitle data-testid="card-title" />);
      const title = screen.getByTestId("card-title");
      expect(title.className).toContain("font-semibold");
      expect(title.className).toContain("leading-none");
      expect(title.className).toContain("tracking-tight");
    });
  });

  describe("CardDescription", () => {
    it("should render correctly", () => {
      render(
        <CardDescription data-testid="card-description">
          Description content
        </CardDescription>
      );
      const description = screen.getByTestId("card-description");
      expect(description).toBeDefined();
      expect(description.textContent).toBe("Description content");
    });

    it("should apply default classes", () => {
      render(<CardDescription data-testid="card-description" />);
      const description = screen.getByTestId("card-description");
      expect(description.className).toContain("text-sm");
      expect(description.className).toContain("text-muted-foreground");
    });
  });

  describe("CardContent", () => {
    it("should render correctly", () => {
      render(<CardContent data-testid="card-content">Content</CardContent>);
      const content = screen.getByTestId("card-content");
      expect(content).toBeDefined();
      expect(content.textContent).toBe("Content");
    });

    it("should apply default classes", () => {
      render(<CardContent data-testid="card-content" />);
      const content = screen.getByTestId("card-content");
      expect(content.className).toContain("p-6");
      expect(content.className).toContain("pt-0");
    });
  });

  describe("CardFooter", () => {
    it("should render correctly", () => {
      render(<CardFooter data-testid="card-footer">Footer content</CardFooter>);
      const footer = screen.getByTestId("card-footer");
      expect(footer).toBeDefined();
      expect(footer.textContent).toBe("Footer content");
    });

    it("should apply default classes", () => {
      render(<CardFooter data-testid="card-footer" />);
      const footer = screen.getByTestId("card-footer");
      expect(footer.className).toContain("flex");
      expect(footer.className).toContain("items-center");
      expect(footer.className).toContain("p-6");
      expect(footer.className).toContain("pt-0");
    });
  });

  describe("Card composition", () => {
    it("should render complete card with all components", () => {
      render(
        <Card data-testid="complete-card">
          <CardHeader data-testid="header">
            <CardTitle data-testid="title">Card Title</CardTitle>
            <CardDescription data-testid="description">
              Card Description
            </CardDescription>
          </CardHeader>
          <CardContent data-testid="content">Card Content</CardContent>
          <CardFooter data-testid="footer">Card Footer</CardFooter>
        </Card>
      );

      expect(screen.getByTestId("complete-card")).toBeDefined();
      expect(screen.getByTestId("header")).toBeDefined();
      expect(screen.getByTestId("title")).toBeDefined();
      expect(screen.getByTestId("description")).toBeDefined();
      expect(screen.getByTestId("content")).toBeDefined();
      expect(screen.getByTestId("footer")).toBeDefined();

      expect(screen.getByText("Card Title")).toBeDefined();
      expect(screen.getByText("Card Description")).toBeDefined();
      expect(screen.getByText("Card Content")).toBeDefined();
      expect(screen.getByText("Card Footer")).toBeDefined();
    });
  });
});
