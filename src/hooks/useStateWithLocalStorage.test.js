import { renderHook, act } from "@testing-library/react";
import useStateWithLocalStorage from "./useStateWithLocalStorage";

const localStorageMock = (() => {
    let store = {};
    return {
        getItem: (key) => store[key] || null,
        setItem: (key, value) => {
            store[key] = value.toString();
        },
        clear: () => {
            store = {};
        },
    };
})();

Object.defineProperty(window, "localStorage", {
    value: localStorageMock,
});

describe("useStateWithLocalStorage", () => {
    it("should use a default value if localStorage is empty", () => {
        const { result } = renderHook(() =>
            useStateWithLocalStorage({
                localStorageKey: "testKey",
                defaultValue: "defaultValue",
            })
        );

        expect(result.current[0]).toBe("defaultValue");
    });

    it("should set and retrieve values from localStorage", () => {
        const { result } = renderHook(() =>
            useStateWithLocalStorage({
                localStorageKey: "testKey",
                defaultValue: "defaultValue",
            })
        );

        act(() => {
            result.current[1]("newValue");
        });

        expect(result.current[0]).toBe("newValue");
        expect(localStorage.getItem("testKey")).toBe(
            JSON.stringify("newValue")
        );
    });
});
