import { useQuery, gql } from "@apollo/client";
import { useEffect, useState } from "react";
import useCurrentLocation from "../hooks/useCurrentLocation";
import * as utils from "../utils/utils";

type LocationProps = {
    setStationIds: (a: Array<string>) => void;
    stationCount?: number;
};

type BikeRentalStationsQuery = {
    bikeRentalStations: Array<BikeRentalStationItem>;
};

type BikeRentalStationItem = {
    name: string;
    stationId: string;
    lat: number;
    lon: number;
    state: string;
};

type Station = {
    distance: number;
    stationId: string;
};

const Location: React.FC<LocationProps> = ({
    setStationIds,
    stationCount = 5,
}) => {
    const ALL_STATIONS = gql`
        query AllStations {
            bikeRentalStations {
                name
                stationId
                lat
                lon
                state
            }
        }
    `;

    const [locationRequested, setLocationRequested] = useState(false);
    const { loading, error, data } =
        useQuery<BikeRentalStationsQuery>(ALL_STATIONS);
    const { location } = useCurrentLocation(locationRequested);

    useEffect(() => {
        if (
            location?.latitude !== undefined &&
            location?.longitude !== undefined &&
            data?.bikeRentalStations !== undefined &&
            locationRequested === true
        ) {
            let stationIdsWithDistance = data.bikeRentalStations
                .filter(function (station: BikeRentalStationItem) {
                    return station.state === "Station on";
                })
                .map((x: BikeRentalStationItem) => {
                    return {
                        distance: utils.getDistanceFromLatLonInKm(
                            location.latitude,
                            location.longitude,
                            x.lat,
                            x.lon
                        ),
                        stationId: x.stationId,
                    } as Station;
                });

            stationIdsWithDistance.sort(
                (a: Station, b: Station) => a.distance - b.distance
            );
            const closestStationIds = stationIdsWithDistance
                .slice(0, stationCount)
                .map((item: Station) => item.stationId);

            setStationIds(closestStationIds);
            setLocationRequested(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        data?.bikeRentalStations,
        location?.latitude,
        location?.longitude,
        locationRequested,
    ]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    const getLocation = () => {
        setLocationRequested(true);
    };

    // TODO localize texts
    return (
        <div className="location">
            <button onClick={getLocation}>
                <span className="material-icons">my_location</span> Hae lähimmät
                asemat
            </button>
        </div>
    );
};

export default Location;
