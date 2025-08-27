/**
 * @jest-environment jsdom
 */

import { createClient } from "@/utils/supabase/client";
import { createBrowserClient } from "@supabase/ssr";

// Mock the Supabase SSR module
jest.mock("@supabase/ssr", () => ({
  createBrowserClient: jest.fn(() => ({
    auth: {
      getUser: jest.fn(),
      signInWithPassword: jest.fn(),
      signOut: jest.fn(),
    },
    from: jest.fn(() => ({
      select: jest.fn(),
      insert: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    })),
  })),
}));

describe("Supabase Client", () => {
  beforeEach(() => {
    // Set up environment variables for testing
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://test.supabase.co";
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "test-anon-key";
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a Supabase client", () => {
    const client = createClient();

    expect(client).toBeDefined();
    expect(client.auth).toBeDefined();
    expect(client.from).toBeDefined();
  });

  it("should use environment variables for configuration", () => {
    createClient();

    expect(createBrowserClient).toHaveBeenCalledWith(
      "https://test.supabase.co",
      "test-anon-key"
    );
  });

  it("should return client with auth methods", () => {
    const client = createClient();

    expect(typeof client.auth.getUser).toBe("function");
    expect(typeof client.auth.signInWithPassword).toBe("function");
    expect(typeof client.auth.signOut).toBe("function");
  });

  it("should return client with database query methods", () => {
    const client = createClient();
    const table = client.from("test-table");

    expect(typeof table.select).toBe("function");
    expect(typeof table.insert).toBe("function");
    expect(typeof table.update).toBe("function");
    expect(typeof table.delete).toBe("function");
  });
});
