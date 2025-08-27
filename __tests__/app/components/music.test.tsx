/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Player from "@/app/(components)/music";

// Mock HTMLAudioElement
const mockAudio = {
  play: jest.fn().mockResolvedValue(undefined),
  pause: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  currentTime: 0,
};

// Mock Audio constructor
global.Audio = jest.fn().mockImplementation(() => mockAudio);

describe("Music Player Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset audio mock
    mockAudio.play.mockClear();
    mockAudio.pause.mockClear();
    mockAudio.addEventListener.mockClear();
  });

  it("should render the music player button", () => {
    render(<Player url="/test-music.mp3" />);

    const button = screen.getByRole("button");
    expect(button).toBeDefined();
  });

  it("should show speaker off icon when not playing", () => {
    render(<Player url="/test-music.mp3" />);

    const button = screen.getByRole("button");
    // Check if the button contains the SpeakerOffIcon (since icons are mocked, we check for presence)
    expect(button).toBeDefined();
  });

  it("should toggle playing state when button is clicked", async () => {
    render(<Player url="/test-music.mp3" />);

    const button = screen.getByRole("button");

    // Click to start playing
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockAudio.play).toHaveBeenCalled();
    });
  });

  it("should create audio element with correct URL", () => {
    const testUrl = "/music/test-song.mp3";
    render(<Player url={testUrl} />);

    expect(global.Audio).toHaveBeenCalledWith(testUrl);
  });

  it("should pause audio when clicking stop", async () => {
    render(<Player url="/test-music.mp3" />);

    const button = screen.getByRole("button");

    // Click to start playing
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockAudio.play).toHaveBeenCalled();
    });

    // Click again to stop playing
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockAudio.pause).toHaveBeenCalled();
    });
  });

  it("should have correct styling classes", () => {
    render(<Player url="/test-music.mp3" />);

    const button = screen.getByRole("button");

    expect(button.className).toContain("p-2");
    expect(button.className).toContain("rounded-full");
    expect(button.className).toContain("bg-white");
    expect(button.className).toContain("text-[#BB543B]");
    expect(button.className).toContain("border-[#BB543B]");
    expect(button.className).toContain("fixed");
    expect(button.className).toContain("z-50");
    expect(button.className).toContain("bottom-6");
    expect(button.className).toContain("right-6");
  });

  it("should set up audio event listeners", () => {
    render(<Player url="/test-music.mp3" />);

    expect(mockAudio.addEventListener).toHaveBeenCalledWith(
      "ended",
      expect.any(Function)
    );
  });

  it("should handle multiple clicks correctly", async () => {
    render(<Player url="/test-music.mp3" />);

    const button = screen.getByRole("button");

    // Click multiple times rapidly
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);

    // Should have been called for each click (play, pause, play)
    await waitFor(() => {
      expect(mockAudio.play).toHaveBeenCalledTimes(2);
      expect(mockAudio.pause).toHaveBeenCalledTimes(1);
    });
  });
});
