/**
 * @jest-environment node
 */

import { login } from "@/app/(admin)/login/actions";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

// Mock Next.js functions
jest.mock("next/cache", () => ({
  revalidatePath: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

// Mock Supabase server client
jest.mock("@/utils/supabase/server", () => ({
  createClient: jest.fn(),
}));

describe("Login Actions", () => {
  const mockSupabase = {
    auth: {
      signInWithPassword: jest.fn(),
    },
  };

  const mockCreateClient = createClient as jest.MockedFunction<
    typeof createClient
  >;
  const mockRedirect = redirect as jest.MockedFunction<typeof redirect>;
  const mockRevalidatePath = revalidatePath as jest.MockedFunction<
    typeof revalidatePath
  >;

  beforeEach(() => {
    jest.clearAllMocks();
    mockCreateClient.mockResolvedValue(mockSupabase as any);
  });

  it("should successfully login with valid credentials", async () => {
    mockSupabase.auth.signInWithPassword.mockResolvedValue({ error: null });

    const formData = new FormData();
    formData.append("email", "test@example.com");
    formData.append("password", "password123");

    await login(formData);

    expect(mockSupabase.auth.signInWithPassword).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "password123",
    });
    expect(mockRevalidatePath).toHaveBeenCalledWith("/guests", "layout");
    expect(mockRedirect).toHaveBeenCalledWith("/guests");
  });

  it("should redirect to error page on login failure", async () => {
    const error = { message: "Invalid credentials" };
    mockSupabase.auth.signInWithPassword.mockResolvedValue({ error });

    const formData = new FormData();
    formData.append("email", "test@example.com");
    formData.append("password", "wrongpassword");

    await login(formData);

    expect(mockSupabase.auth.signInWithPassword).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "wrongpassword",
    });
    expect(mockRedirect).toHaveBeenCalledWith("/error");
    expect(mockRevalidatePath).not.toHaveBeenCalled();
  });

  it("should handle form data extraction correctly", async () => {
    mockSupabase.auth.signInWithPassword.mockResolvedValue({ error: null });

    const formData = new FormData();
    formData.append("email", "admin@test.com");
    formData.append("password", "admin123");
    formData.append("other-field", "should-be-ignored");

    await login(formData);

    expect(mockSupabase.auth.signInWithPassword).toHaveBeenCalledWith({
      email: "admin@test.com",
      password: "admin123",
    });
  });

  it("should handle empty form data", async () => {
    mockSupabase.auth.signInWithPassword.mockResolvedValue({ error: null });

    const formData = new FormData();

    await login(formData);

    expect(mockSupabase.auth.signInWithPassword).toHaveBeenCalledWith({
      email: null,
      password: null,
    });
  });
});
