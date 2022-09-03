import "./App.css";

import { useEffect } from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import useStateWithLocalStorage from "./hooks/useStateWithLocalStorage";
import StationInfo from "./components/StationInfo";
import Location from "./components/Location";

function App() {
    const client = new ApolloClient({
        uri: "https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql",
        cache: new InMemoryCache(),
    });

    const [stationIds, setStationIds] = useStateWithLocalStorage<Array<string>>(
        {
            localStorageKey: "stationIds",
            defaultValue: [],
        }
    );

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const id = queryParams.get("id");
        if (id != null) {
            const ids = id.split(",");
            setStationIds(ids);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const stationInfos = stationIds.map((stationId: any) => (
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
