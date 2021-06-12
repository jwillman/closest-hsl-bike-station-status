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

    const [stationIds, setStationIds] = useState(null);

    return (
        <>
            <ApolloProvider client={client}>
                <div className="container">
                    {/* {stationIds.map((stationId) => {
                        return (
                            <StationInfo
                                key={stationId}
                                stationId={stationId}
                            ></StationInfo>
                        );
                    })} */}
                    {stationIds != null && (
                        <StationInfo stationId={stationIds}></StationInfo>
                    )}
                    <StationInfo stationId="134"></StationInfo>
                    <StationInfo stationId="133"></StationInfo>
                    <StationInfo stationId="290"></StationInfo>
                    <Location setStationIds={setStationIds}></Location>
                </div>
            </ApolloProvider>
        </>
    );
}

export default App;
