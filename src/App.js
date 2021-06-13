import "./App.css";
import { useEffect, useState } from "react";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import StationInfo from "./components/StationInfo.js";
import Location from "./components/Location.js";

function App() {
    const client = new ApolloClient({
        uri: "https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql",
        cache: new InMemoryCache(),
    });

    const [stationIds, setStationIds] = useState([]);

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
