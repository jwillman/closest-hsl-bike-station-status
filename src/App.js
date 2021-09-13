import "./App.css";

import { useEffect, useState } from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import useStateWithLocalStorage from "./useStateWithLocalStorage";
import StationInfo from "./components/StationInfo";
import Location from "./components/Location";

function App() {
    const client = new ApolloClient({
        uri: "https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql",
        cache: new InMemoryCache(),
    });

    const [stationIds, setStationIds] = useStateWithLocalStorage(
        "stationIds",
        []
    );

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const id = queryParams.get("id");
        if (id != null) {
            const ids = id.split(",");
            setStationIds(ids);
        }
    }, []);

    const stationInfos = stationIds.map((stationId) => (
        <StationInfo key={stationId} stationId={stationId}></StationInfo>
    ));

    return (
        <>
            <ApolloProvider client={client}>
                <div className="container">
                    {stationInfos}
                    <Location setStationIds={setStationIds}></Location>
                </div>
            </ApolloProvider>
        </>
    );
}

export default App;
