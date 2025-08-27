import { cn } from "@/lib/utils";

describe("cn utility function", () => {
  it("should merge class names correctly", () => {
    const result = cn("px-4", "py-2", "bg-blue-500");
    expect(result).toBe("px-4 py-2 bg-blue-500");
  });

  it("should handle conditional class names", () => {
    const result = cn("px-4", true && "py-2", false && "hidden");
    expect(result).toBe("px-4 py-2");
  });

  it("should handle conflicting Tailwind classes", () => {
    const result = cn("px-4", "px-8");
    expect(result).toBe("px-8");
  });

  it("should handle empty inputs", () => {
    const result = cn();
    expect(result).toBe("");
  });

  it("should handle undefined and null values", () => {
    const result = cn("px-4", undefined, null, "py-2");
    expect(result).toBe("px-4 py-2");
  });

  it("should handle arrays of class names", () => {
    const result = cn(["px-4", "py-2"], "bg-blue-500");
    expect(result).toBe("px-4 py-2 bg-blue-500");
  });

  it("should handle objects with conditional classes", () => {
    const result = cn({
      "px-4": true,
      "py-2": true,
      hidden: false,
    });
    expect(result).toBe("px-4 py-2");
  });
});
