import {  renderHook } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import { useTheme } from "./useTheme"


describe("useTheme", () => {

    it("renders theme", () => {
        vi.spyOn(Storage.prototype, "getItem").mockReturnValue("light")
       const { result } =  renderHook(() => useTheme())

        expect(result.current.theme).toBe("light")
    }) 

    it("uses system theme when no localStorage", () => {
        vi.spyOn(Storage.prototype, "getItem").mockReturnValue(null)
        window.matchMedia = vi.fn().mockImplementation(() => ({
            matches: true
        }))
        const { result } = renderHook(() => useTheme())
        expect(result.current.theme).toBe("dark")
    })

})


