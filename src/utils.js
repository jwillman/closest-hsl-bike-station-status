export const getGoogleMapsUrl = (lat, lon) => {
    const latLon = encodeURIComponent(lat + "," + lon);
    return `https://www.google.com/maps/search/?api=1&query=${latLon}`;
};
