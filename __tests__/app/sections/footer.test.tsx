import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Footer from "@/app/(sections)/footer";
import { Database } from "@/app/type";

// Mock dependencies
jest.mock("@/utils/supabase/client", () => ({
  createClient: () => ({
    from: jest.fn(() => ({
      insert: jest.fn().mockResolvedValue({ error: null }),
      update: jest.fn(() => ({
        eq: jest.fn().mockResolvedValue({ error: null }),
      })),
    })),
  }),
}));

jest.mock("sonner", () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));

jest.mock("@/app/(sections)/messages", () => {
  function MockMessages() {
    return <div data-testid="messages-component">Messages Component</div>;
  }
  MockMessages.displayName = "MockMessages";
  return MockMessages;
});

jest.mock("@/app/font", () => ({
  paragraph: { className: "mocked-paragraph-font" },
}));

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

describe("Footer Component", () => {
  const user = userEvent.setup();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly with guest", () => {
    render(<Footer guest={mockGuest} />);

    expect(screen.getByText("Konfirmasi Kehadiran")).toBeDefined();
    expect(screen.getByText("John Doe")).toBeDefined();
    expect(screen.getByText("Tidak Hadir")).toBeDefined();
    expect(screen.getByText("Hadir")).toBeDefined();
  });

  it("should render correctly without guest", () => {
    render(<Footer guest={null} />);

    // Should not show confirmation section when no guest
    expect(screen.queryByText("Konfirmasi Kehadiran")).toBeNull();
    expect(screen.queryByText("Tidak Hadir")).toBeNull();
    expect(screen.queryByText("Hadir")).toBeNull();
  });

  it("should show guest name when guest is provided", () => {
    const customGuest: GuestRow = {
      ...mockGuest,
      name: "Jane Smith",
    };

    render(<Footer guest={customGuest} />);

    expect(screen.getByText("Jane Smith")).toBeDefined();
  });

  it("should toggle presence buttons correctly", async () => {
    render(<Footer guest={mockGuest} />);

    const tidakHadirButton = screen.getByText("Tidak Hadir");
    const hadirButton = screen.getByText("Hadir");

    // Initially, Tidak Hadir is selected (based on the component behavior)
    expect(tidakHadirButton.className).toContain("border-2");
    expect(hadirButton.className).toContain("border-0");

    // Click Hadir button
    await user.click(hadirButton);

    // Should show select dropdown for number of attendees
    await waitFor(() => {
      const selectTrigger = screen.getByRole("combobox");
      expect(selectTrigger).toBeDefined();
    });
  });

  it("should show attendance number selector when presence is true", async () => {
    render(<Footer guest={mockGuest} />);

    const hadirButton = screen.getByText("Hadir");
    await user.click(hadirButton);

    // Should show the select dropdown (combobox role)
    const selectTrigger = screen.getByRole("combobox");
    expect(selectTrigger).toBeDefined();
    expect(selectTrigger.className).toContain("w-full");
    expect(selectTrigger.className).toContain("bg-white");
    expect(selectTrigger.className).toContain("mt-2");
  });

  it("should hide attendance number selector when presence is false", async () => {
    render(<Footer guest={mockGuest} />);

    const tidakHadirButton = screen.getByText("Tidak Hadir");
    await user.click(tidakHadirButton);

    // Should not show the select dropdown
    expect(screen.queryByRole("combobox")).toBeNull();
  });

  it("should have proper styling classes", () => {
    render(<Footer guest={mockGuest} />);

    const heading = screen.getByText("Konfirmasi Kehadiran");
    expect(heading.className).toContain("mocked-paragraph-font");
    expect(heading.className).toContain("text-2xl");
    expect(heading.className).toContain("text-[#BB543B]");

    const guestName = screen.getByText("John Doe");
    expect(guestName.className).toContain("mocked-paragraph-font");
    expect(guestName.className).toContain("text-[#BB543B]");
  });

  it("should have correct container structure", () => {
    render(<Footer guest={mockGuest} />);

    const container = screen.getByText("Konfirmasi Kehadiran").closest("div")
      ?.parentElement?.parentElement?.parentElement?.parentElement;
    expect(container?.className).toContain("relative");
    expect(container?.className).toContain("min-h-screen");
    expect(container?.className).toContain("w-full");
  });

  it("should have attendance buttons with correct styling", () => {
    render(<Footer guest={mockGuest} />);

    const tidakHadirButton = screen.getByText("Tidak Hadir");
    const hadirButton = screen.getByText("Hadir");

    expect(tidakHadirButton.className).toContain("w-full");
    expect(tidakHadirButton.className).toContain("text-[#BB543B]");
    expect(tidakHadirButton.className).toContain("border-[#BB543B]");

    expect(hadirButton.className).toContain("w-full");
    expect(hadirButton.className).toContain("text-[#BB543B]");
    expect(hadirButton.className).toContain("border-[#BB543B]");
  });

  it("should render messages component", () => {
    render(<Footer guest={mockGuest} />);

    const messagesComponent = screen.getByTestId("messages-component");
    expect(messagesComponent).toBeDefined();
    expect(messagesComponent.textContent).toBe("Messages Component");
  });

  it("should have send button with correct styling", () => {
    render(<Footer guest={mockGuest} />);

    // Get all Kirim buttons and check the first one (attendance send button)
    const sendButtons = screen.getAllByText("Kirim");
    const attendanceSendButton = sendButtons[0]; // First Kirim button is for attendance

    expect(attendanceSendButton.className).toContain("bg-[#BB543B]");
    expect(attendanceSendButton.className).toContain("text-white");
    expect(attendanceSendButton.className).toContain("w-full");
    expect(attendanceSendButton.className).toContain("mt-4");
  });
});
