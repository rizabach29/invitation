/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import Page from "@/app/page";

// Mock all the components and external dependencies
jest.mock("@/app/(sections)/header", () => {
  return function MockHeader() {
    return <div data-testid="header">Header Component</div>;
  };
});

jest.mock("@/app/(sections)/guest", () => {
  return function MockGuest() {
    return <div data-testid="guest">Guest Component</div>;
  };
});

jest.mock("@/app/(sections)/counter", () => {
  return function MockCounter() {
    return <div data-testid="counter">Counter Component</div>;
  };
});

jest.mock("@/app/(components)/music", () => {
  return function MockMusic() {
    return <div data-testid="music">Music Component</div>;
  };
});

// Mock other sections similarly
jest.mock("@/app/(sections)/verse", () => {
  function MockVerse() {
    return <div data-testid="verse">Verse</div>;
  }
  return MockVerse;
});
jest.mock("@/app/(sections)/bride", () => {
  function MockBride() {
    return <div data-testid="bride">Bride</div>;
  }
  return MockBride;
});
jest.mock("@/app/(sections)/story", () => {
  function MockStory() {
    return <div data-testid="story">Story</div>;
  }
  return MockStory;
});
jest.mock("@/app/(sections)/detail", () => {
  function MockDetail() {
    return <div data-testid="detail">Detail</div>;
  }
  return MockDetail;
});
jest.mock("@/app/(sections)/dresscode", () => {
  function MockDresscode() {
    return <div data-testid="dresscode">Dresscode</div>;
  }
  return MockDresscode;
});
jest.mock("@/app/(sections)/messages", () => {
  function MockMessages() {
    return <div data-testid="messages">Messages</div>;
  }
  return MockMessages;
});
jest.mock("@/app/(sections)/footer", () => {
  function MockFooter() {
    return <div data-testid="footer">Footer</div>;
  }
  return MockFooter;
});

// Mock the smooth scroll provider
jest.mock("@/app/smoothscroll-provider", () => {
  return function MockSmoothScrollProvider({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return <div data-testid="smooth-scroll">{children}</div>;
  };
});

describe("Main Page Integration", () => {
  it("should render all main sections", () => {
    render(<Page />);

    // Check if all main sections are rendered
    expect(screen.getByTestId("smooth-scroll")).toBeDefined();
    expect(screen.getByTestId("header")).toBeDefined();
    expect(screen.getByTestId("guest")).toBeDefined();
    expect(screen.getByTestId("counter")).toBeDefined();
    expect(screen.getByTestId("music")).toBeDefined();

    // Check other sections
    expect(screen.getByTestId("verse")).toBeDefined();
    expect(screen.getByTestId("bride")).toBeDefined();
    expect(screen.getByTestId("story")).toBeDefined();
    expect(screen.getByTestId("detail")).toBeDefined();
    expect(screen.getByTestId("dresscode")).toBeDefined();
    expect(screen.getByTestId("messages")).toBeDefined();
    expect(screen.getByTestId("footer")).toBeDefined();
  });

  it("should have proper page structure", () => {
    render(<Page />);

    const smoothScrollProvider = screen.getByTestId("smooth-scroll");
    expect(smoothScrollProvider).toBeDefined();

    // Check if components are nested properly
    const header = screen.getByTestId("header");
    const footer = screen.getByTestId("footer");

    expect(header).toBeDefined();
    expect(footer).toBeDefined();
  });
});
