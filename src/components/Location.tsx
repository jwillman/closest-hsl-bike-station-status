import { useQuery, gql } from "@apollo/client";
import { useEffect, useState } from "react";
import useCurrentLocation from "../hooks/useCurrentLocation";
import * as utils from "../utils/utils";

type LocationProps = {
    setStationIds: (stations: Array<string>) => void;
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

const Location: React.FC<LocationProps> = ({
    setStationIds,
    stationCount = 5,
}) => {
    const [locationRequested, setLocationRequested] = useState(false);
    const { loading, error, data } =
        useQuery<BikeRentalStationsQuery>(ALL_STATIONS);
    const { location } = useCurrentLocation(locationRequested);

    useEffect(() => {
        if (location && data?.bikeRentalStations && locationRequested) {
            const stationIdsWithDistance = data.bikeRentalStations
                .filter(
                    (station: BikeRentalStationItem) =>
                        station.state === "Station on"
                )
                .map((station: BikeRentalStationItem) => ({
                    distance: utils.getDistanceFromLatLonInKm(
                        location.latitude,
                        location.longitude,
                        station.lat,
                        station.lon
                    ),
                    stationId: station.stationId,
                }));

            stationIdsWithDistance.sort((a, b) => a.distance - b.distance);

            const closestStationIds = stationIdsWithDistance
                .slice(0, stationCount)
                .map((item: Station) => item.stationId);

            setStationIds(closestStationIds);
            setLocationRequested(false);
        }
    }, [
        data?.bikeRentalStations,
        location,
        locationRequested,
        setStationIds,
        stationCount,
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
