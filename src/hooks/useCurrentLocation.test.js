import { renderHook, act } from "@testing-library/react";
import useCurrentLocation from "./useCurrentLocation";

const mockGeolocation = {
    getCurrentPosition: jest.fn(),
    watchPosition: jest.fn(),
};

global.navigator.geolocation = mockGeolocation;

describe("useCurrentLocation", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should not call getCurrentPosition if locationRequested is false", () => {
        renderHook(() => useCurrentLocation(false));
        expect(mockGeolocation.getCurrentPosition).not.toHaveBeenCalled();
    });

    it("should call getCurrentPosition if locationRequested is true", () => {
        renderHook(() => useCurrentLocation(true));
        expect(mockGeolocation.getCurrentPosition).toHaveBeenCalled();
    });

    it("should update location on successful geolocation", async () => {
        const { result, waitForNextUpdate } = renderHook(() =>
            useCurrentLocation(true)
        );

        act(() => {
            const successCallback =
                mockGeolocation.getCurrentPosition.mock.calls[0][0];
            successCallback({ coords: { latitude: 51.1, longitude: 45.3 } });
        });

        await waitForNextUpdate();

        expect(result.current.location).toEqual({
            latitude: 51.1,
            longitude: 45.3,
        });
    });

    it("should set an error message on geolocation error", async () => {
        const { result, waitForNextUpdate } = renderHook(() =>
            useCurrentLocation(true)
        );

        act(() => {
            const errorCallback =
                mockGeolocation.getCurrentPosition.mock.calls[0][1];
            errorCallback({ message: "Geolocation error" });
        });

        await waitForNextUpdate();

        expect(result.current.error).toBe("Geolocation error");
    });
});
