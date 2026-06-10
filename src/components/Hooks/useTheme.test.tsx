import {  renderHook, act } from "@testing-library/react"
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

    it("toggleTheme changes from ligth to dark", () => {
        vi.spyOn(Storage.prototype, "getItem").mockReturnValue("light")
        const {result } = renderHook(() => useTheme())

        act(() => {
            result.current.toggleTheme()
        }) 
        expect(result.current.theme).toBe("dark")
    })

    it("toggleTheme changes from dark to light", () => {
        vi.spyOn(Storage.prototype, "getItem").mockReturnValue("dark")
        const { result } = renderHook(() => useTheme())

        act(() => {
            result.current.toggleTheme()
        })
        expect(result.current.theme).toBe("light")
    })

})


