import { render, screen } from "@testing-library/react";
import ShiftingCountdown from "@/app/(sections)/counter";

// Mock the font import
jest.mock("@/app/font", () => ({
  paragraph: { className: "mocked-font-class" },
}));

// Mock useSearchParams to return different values
const mockUseSearchParams = jest.fn();
jest.mock("next/navigation", () => ({
  useSearchParams: () => mockUseSearchParams(),
}));

describe("ShiftingCountdown Component", () => {
  beforeEach(() => {
    // Reset the mock before each test
    mockUseSearchParams.mockReturnValue({
      get: jest.fn().mockReturnValue(null),
    });

    // Mock Date to a fixed date for consistent testing
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2025-08-27T10:00:00"));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should render the main countdown component", () => {
    render(<ShiftingCountdown />);

    // Check if the date is displayed
    expect(screen.getByText("21")).toBeDefined();
    expect(screen.getByText("Sept")).toBeDefined();
    expect(screen.getByText("2025")).toBeDefined();

    // Check if the venue information is displayed
    expect(screen.getByText("Trimurti Resto")).toBeDefined();
    expect(screen.getByText("Mercure Surabaya Grand Mirama")).toBeDefined();
  });

  it("should show different reception times based on type parameter", () => {
    // Test for regular guests (non-family)
    mockUseSearchParams.mockReturnValue({
      get: jest.fn().mockReturnValue(null),
    });

    const { rerender } = render(<ShiftingCountdown />);
    expect(screen.getByText("12.00")).toBeDefined();
    expect(screen.getByText("- 13.30")).toBeDefined();

    // Test for family guests
    mockUseSearchParams.mockReturnValue({
      get: jest.fn().mockReturnValue("family"),
    });

    rerender(<ShiftingCountdown />);
    expect(screen.getByText("11.00")).toBeDefined();
    expect(screen.getByText("- 12.30")).toBeDefined();
  });

  it("should render countdown units", () => {
    render(<ShiftingCountdown />);

    // Check if countdown labels are present
    expect(screen.getByText("Hari")).toBeDefined();
    expect(screen.getByText("Jam")).toBeDefined();
    expect(screen.getByText("Menit")).toBeDefined();
    expect(screen.getByText("Detik")).toBeDefined();
  });

  it("should render Google Maps link", () => {
    render(<ShiftingCountdown />);

    const mapLink = screen.getByText("Buka di Google Maps");
    expect(mapLink).toBeDefined();
    expect(mapLink.closest("a")).toHaveAttribute("target", "_blank");
    expect(mapLink.closest("a")).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("should display venue address", () => {
    render(<ShiftingCountdown />);

    expect(screen.getByText(/Jl\. Raya Darmo No\.68 - 78/)).toBeDefined();
    expect(screen.getByText(/Kec\. Tegalsari, Surabaya/)).toBeDefined();
  });

  it("should display akad time", () => {
    render(<ShiftingCountdown />);

    expect(screen.getByText("08.00")).toBeDefined();
    expect(screen.getByText("Akad")).toBeDefined();
  });

  it("should display resepsi label", () => {
    render(<ShiftingCountdown />);

    expect(screen.getByText("Resepsi")).toBeDefined();
  });
});
