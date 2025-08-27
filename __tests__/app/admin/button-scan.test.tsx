import { render, screen, fireEvent } from "@testing-library/react";
import ButtonScan from "@/app/(admin)/guests/button-scan";

// Mock the QR scanner component
jest.mock("@yudiel/react-qr-scanner", () => ({
  Scanner: ({
    onScan,
    styles,
  }: {
    onScan?: (result: any) => void;
    styles?: any;
  }) => (
    <div
      data-testid="qr-scanner"
      style={styles?.container}
      onClick={() => onScan && onScan([{ rawValue: "test-qr-code" }])}
    >
      Mocked QR Scanner
    </div>
  ),
}));

describe("ButtonScan Component", () => {
  it("should render the scan button", () => {
    render(<ButtonScan />);

    const scanButton = screen.getByText("Scan");
    expect(scanButton).toBeDefined();
  });

  it("should open dialog when scan button is clicked", () => {
    render(<ButtonScan />);

    const scanButton = screen.getByText("Scan");
    fireEvent.click(scanButton);

    // Check if dialog content is visible
    expect(screen.getByText("Scan QR Undangan")).toBeDefined();
    expect(screen.getByText("Mocked QR Scanner")).toBeDefined();
  });

  it("should render QR scanner in dialog", () => {
    render(<ButtonScan />);

    const scanButton = screen.getByText("Scan");
    fireEvent.click(scanButton);

    const scanner = screen.getByTestId("qr-scanner");
    expect(scanner).toBeDefined();
  });

  it("should handle QR scan result", () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation();

    render(<ButtonScan />);

    const scanButton = screen.getByText("Scan");
    fireEvent.click(scanButton);

    const scanner = screen.getByTestId("qr-scanner");
    fireEvent.click(scanner);

    expect(consoleSpy).toHaveBeenCalledWith([{ rawValue: "test-qr-code" }]);

    consoleSpy.mockRestore();
  });

  it("should have proper button styling classes", () => {
    render(<ButtonScan />);

    const buttonContainer = screen.getByText("Scan").parentElement;
    expect(buttonContainer?.className).toContain("fixed");
    expect(buttonContainer?.className).toContain("bottom-0");
    expect(buttonContainer?.className).toContain("right-0");
    expect(buttonContainer?.className).toContain("bg-black");
    expect(buttonContainer?.className).toContain("rounded-full");
  });

  it("should display dialog description text", () => {
    render(<ButtonScan />);

    const scanButton = screen.getByText("Scan");
    fireEvent.click(scanButton);

    expect(screen.getByText(/This action cannot be undone/)).toBeDefined();
  });
});
