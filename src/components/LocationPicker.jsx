import { useState, useCallback, useRef } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "450px",
};

const defaultCenter = {
  lat: 28.6139,
  lng: 77.2090,
};

const libraries = ["places"];

export default function LocationPicker({ onLocationSelect }) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCZM9D2U6X887BgFghbaOcGr_8WZFEZs_Q",
    libraries,
  });

  const [marker, setMarker] = useState(null);
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [address, setAddress] = useState("");
  const autocompleteRef = useRef(null);
  const mapRef = useRef(null);
  const inputRef = useRef(null);

  const handleMapClick = useCallback(
    (e) => {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      setMarker({ lat, lng });

      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location: { lat, lng } }, (results, status) => {
        if (status === "OK" && results[0]) {
          setAddress(results[0].formatted_address);
        }
      });

      onLocationSelect?.({ lat, lng });
    },
    [onLocationSelect]
  );

  const handlePlaceChanged = () => {
    const place = autocompleteRef.current.getPlace();
    if (!place.geometry) return;

    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();

    setMarker({ lat, lng });
    setMapCenter({ lat, lng });
    setAddress(place.formatted_address || place.name);
    mapRef.current?.panTo({ lat, lng });
    mapRef.current?.setZoom(15);

    onLocationSelect?.({ lat, lng, address: place.formatted_address });
  };

  // This runs once the map is ready — pushes the input onto the map as a control
  const handleMapLoad = (map) => {
    mapRef.current = map;
    if (inputRef.current) {
      map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(
        inputRef.current
      );
    }
  };

  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={mapCenter}
      zoom={12}
      onClick={handleMapClick}
      onLoad={handleMapLoad}
    >
      {/* Hidden until map.onLoad pushes it into map controls */}
      <Autocomplete
        onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
        onPlaceChanged={handlePlaceChanged}
      >
        <input
          ref={inputRef}
          type="text"
          placeholder="Search a location..."
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={{
            boxSizing: "border-box",
            border: "1px solid transparent",
            width: "280px",
            height: "40px",
            padding: "0 12px",
            borderRadius: "4px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
            fontSize: "14px",
            outline: "none",
            textOverflow: "ellipsis",
            margin: "10px",
          }}
        />
      </Autocomplete>

      {marker && <Marker position={marker} />}
    </GoogleMap>
  );
}

// import { useState, useRef } from "react";
// import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import "./leafletIconFix";

// // Handles click-to-select
// function LocationMarker({ position, onSelect }) {
//   useMapEvents({
//     click(e) {
//       const { lat, lng } = e.latlng;
//       onSelect({ lat, lng });
//     },
//   });

//   if (!position) return null;

//   return (
//     <Marker position={[position.lat, position.lng]}>
//       <Popup>
//         Lat: {position.lat.toFixed(6)} <br />
//         Lng: {position.lng.toFixed(6)}
//       </Popup>
//     </Marker>
//   );
// }

// // Helper to programmatically move the map when a search result is picked
// function FlyToLocation({ position }) {
//   const map = useMap();
//   if (position) {
//     map.flyTo([position.lat, position.lng], 15, { duration: 1.2 });
//   }
//   return null;
// }

// export default function LocationPicker({ onLocationSelect }) {
//   const [selectedLocation, setSelectedLocation] = useState(null);
//   const [query, setQuery] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const debounceRef = useRef(null);
//   const defaultCenter = { lat: 28.6139, lng: 77.209 }; // Delhi, adjust as needed

//   const handleSelect = ({ lat, lng, address }) => {
//     const loc = { lat, lng, address };
//     setSelectedLocation(loc);
//     setQuery(address || "");
//     setSuggestions([]);
//     onLocationSelect?.(loc);
//   };

//   // Debounced search-as-you-type against Nominatim
//   const handleInputChange = (e) => {
//     const value = e.target.value;
//     setQuery(value);

//     if (debounceRef.current) clearTimeout(debounceRef.current);

//     if (value.trim().length < 3) {
//       setSuggestions([]);
//       return;
//     }

//     debounceRef.current = setTimeout(async () => {
//       setLoading(true);
//       try {
//         const res = await fetch(
//           `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=5&q=${encodeURIComponent(
//             value
//           )}`,
//           {
//             headers: {
//               "Accept-Language": "en",
//             },
//           }
//         );
//         const data = await res.json();
//         setSuggestions(data);
//       } catch (err) {
//         console.error("Search failed:", err);
//         setSuggestions([]);
//       } finally {
//         setLoading(false);
//       }
//     }, 500); // wait 500ms after typing stops
//   };

//   const handleSuggestionClick = (place) => {
//     handleSelect({
//       lat: parseFloat(place.lat),
//       lng: parseFloat(place.lon),
//       address: place.display_name,
//     });
//   };

//   return (
//     <div style={{ position: "relative" }}>
//       {/* Search input */}
//       <div style={{ position: "relative", marginBottom: "10px" }}>
//         <input
//           type="text"
//           value={query}
//           onChange={handleInputChange}
//           placeholder="Search a location..."
//           style={{
//             width: "100%",
//             padding: "10px 12px",
//             borderRadius: "6px",
//             border: "1px solid #ccc",
//             fontSize: "14px",
//             boxSizing: "border-box",
//           }}
//         />

//         {loading && (
//           <div style={{ position: "absolute", right: "12px", top: "10px", fontSize: "12px", color: "#888" }}>
//             Searching...
//           </div>
//         )}

//         {suggestions.length > 0 && (
//           <ul
//             style={{
//               listStyle: "none",
//               margin: 0,
//               padding: 0,
//               position: "absolute",
//               top: "100%",
//               left: 0,
//               right: 0,
//               background: "#fff",
//               border: "1px solid #ddd",
//               borderTop: "none",
//               borderRadius: "0 0 6px 6px",
//               maxHeight: "220px",
//               overflowY: "auto",
//               zIndex: 1000,
//               boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
//             }}
//           >
//             {suggestions.map((place) => (
//               <li
//                 key={place.place_id}
//                 onClick={() => handleSuggestionClick(place)}
//                 style={{
//                   padding: "8px 12px",
//                   cursor: "pointer",
//                   fontSize: "13px",
//                   borderBottom: "1px solid #f0f0f0",
//                 }}
//                 onMouseEnter={(e) => (e.currentTarget.style.background = "#f7f7f7")}
//                 onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}
//               >
//                 {place.display_name}
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>

//       {/* Map */}
//       <MapContainer
//         center={[defaultCenter.lat, defaultCenter.lng]}
//         zoom={12}
//         style={{ height: "400px", width: "100%", borderRadius: "8px" }}
//       >
//         <TileLayer
//           url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
//         />
//         <LocationMarker position={selectedLocation} onSelect={handleSelect} />
//         {selectedLocation && <FlyToLocation position={selectedLocation} />}
//       </MapContainer>

//       {selectedLocation && (
//         <div style={{ marginTop: "10px", fontSize: "14px" }}>
//           <strong>Selected Location:</strong> Lat {selectedLocation.lat.toFixed(6)}, Lng{" "}
//           {selectedLocation.lng.toFixed(6)}
//           {selectedLocation.address && <div>{selectedLocation.address}</div>}
//         </div>
//       )}
//     </div>
//   );
// }