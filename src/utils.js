export const getGoogleMapsUrl = (lat, lon) => {
    const latLon = encodeURIComponent(lat + "," + lon);
    return `https://www.google.com/maps/search/?api=1&query=${latLon}`;
};

export const getGoogleMapsUrlDebugString = (lat, lon) => {
    return `User lat: ${lat} lon: ${lon} url: ${getGoogleMapsUrl(lat, lon)}`;
};

export function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    return haversine(lat1, lon1, lat2, lon2);
}

// Radius of the earth in km
const R = 6371;

// Returns distance in km, haversine formula
function haversine(lat1, lon1, lat2, lon2) {
    let dLat = degToRad(lat2 - lat1);
    let dLon = degToRad(lon2 - lon1);
    let a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(degToRad(lat1)) *
            Math.cos(degToRad(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c;
    return d;
}

function degToRad(deg) {
    return deg * (Math.PI / 180);
}
