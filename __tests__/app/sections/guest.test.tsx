import { render, screen } from "@testing-library/react";
import Guest from "@/app/(sections)/guest";
import { Database } from "@/app/type";

type GuestRow = Database["public"]["Tables"]["guests"]["Row"];

const mockGuest: GuestRow = {
  id: "1",
  name: "John Doe",
  guest_num: 1,
  guest_num_attd: null,
  is_present: null,
  type: "Teman",
  created_at: "2024-01-01T00:00:00Z",
};

describe("Guest Component", () => {
  it("should render guest information when guest is provided", () => {
    render(<Guest guest={mockGuest} />);

    expect(screen.getByText("Mengundang Saudara/i")).toBeDefined();
    expect(screen.getByText("John Doe")).toBeDefined();
  });

  it("should render null when guest is null", () => {
    const { container } = render(<Guest guest={null} />);

    expect(container.firstChild).toBeNull();
  });

  it("should display the correct guest name", () => {
    const customGuest: GuestRow = {
      ...mockGuest,
      name: "Jane Smith",
    };

    render(<Guest guest={customGuest} />);

    expect(screen.getByText("Jane Smith")).toBeDefined();
  });

  it("should apply correct styling classes", () => {
    render(<Guest guest={mockGuest} />);

    const container = screen.getByText("John Doe").closest("div");
    expect(container?.className).toContain("text-center");
    expect(container?.className).toContain("text-[#BC533B]");
    expect(container?.className).toContain("bg-amber-50");
    expect(container?.className).toContain("rounded-full");
  });

  it("should render invitation text with correct styling", () => {
    render(<Guest guest={mockGuest} />);

    const invitationText = screen.getByText("Mengundang Saudara/i");
    expect(invitationText.className).toContain("text-xs");
  });

  it("should render guest name with correct styling", () => {
    render(<Guest guest={mockGuest} />);

    const guestName = screen.getByText("John Doe");
    expect(guestName.className).toContain("mt-2");
    expect(guestName.className).toContain("font-bold");
    expect(guestName.className).toContain("text-sm");
  });

  it("should have proper container structure", () => {
    render(<Guest guest={mockGuest} />);

    const outerContainer = screen
      .getByText("John Doe")
      .closest("div")?.parentElement;
    expect(outerContainer?.className).toContain("w-full");
    expect(outerContainer?.className).toContain("max-w-xl");
    expect(outerContainer?.className).toContain("flex");
    expect(outerContainer?.className).toContain("justify-center");
  });

  it("should handle empty guest name gracefully", () => {
    const emptyNameGuest: GuestRow = {
      ...mockGuest,
      name: "",
    };

    render(<Guest guest={emptyNameGuest} />);

    expect(screen.getByText("Mengundang Saudara/i")).toBeDefined();
    // The h3 element should still be rendered but with empty content
    const nameElement = screen
      .getByText("Mengundang Saudara/i")
      .parentElement?.querySelector("h3");
    expect(nameElement).toBeDefined();
    expect(nameElement?.textContent).toBe("");
  });
});
