import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, it, expect, beforeEach, vi } from "vitest"
import { ThemeToggle } from "./ThemeToggle"

vi.mock("./Hooks/useTheme", () => ({
    useTheme: vi.fn()
}))

import { useTheme } from "./Hooks/useTheme"

describe("ThemeToggle", () => {
    const toggleThemeMock = vi.fn()

    beforeEach(() => {
        vi.clearAllMocks()
    })

    it("renders correctly with light theme", () => {
        vi.mocked(useTheme).mockReturnValue({
            theme: "light",
            setTheme: toggleThemeMock
        } as any)

        render (<ThemeToggle />)
        expect(screen.getByRole("button")).toBeInTheDocument()
    })

    it("toggles them when clicked", async () => {
        const user = userEvent.setup()
        vi.mocked(useTheme).mockReturnValue({
            theme: "light",
            toggleTheme: toggleThemeMock
        } as any)

        render(<ThemeToggle />)
        const button = screen.getByRole("button")
        await user.click(button)
        expect(toggleThemeMock).toHaveBeenCalled()
    })
})
