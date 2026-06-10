import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { describe, vi, it, expect } from "vitest"
import ProtectedRoute from "./ProtectedRoute"

vi.mock("../context/AuthContext", () => ({
    useAuth: vi.fn()
}))

import { useAuth } from "../context/AuthContext"

describe("ProtectedRoute", () => {
    it("renders children when user is authenticated", () => {
        vi.mocked(useAuth).mockReturnValue({
            user: { uid: "123"}
        } as any)
        render(
            <MemoryRouter>
                <ProtectedRoute>
                    <div>Protected content</div>
                </ProtectedRoute>
            </MemoryRouter>
        )
        expect(screen.getByText("Protected content")).toBeInTheDocument()
    })

    it("redirects to login when user is not authenticated", () => {
        vi.mocked(useAuth).mockReturnValue({
            user: null
        } as any)
        render(
            <MemoryRouter>
                <ProtectedRoute>
                    <div>Protected content</div>
                </ProtectedRoute>
            </MemoryRouter>
        )
        expect(screen.queryByText("Protected content")).not.toBeInTheDocument()
    })
})