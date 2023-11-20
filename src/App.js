import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import useSWR from 'swr'; // React hook to fetch the data
import lookup from 'country-code-lookup'; // npm module to get ISO Code for countries

import './App.scss';

// Mapbox css - needed to make tooltips work later in this article
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'your-access-token';

function App() {
  const mapboxElRef = useRef(null); // DOM element to render map

  // Initialize our map
  useEffect(() => {
    // You can store the map instance with useRef too
    const map = new mapboxgl.Map({
      container: mapboxElRef.current,
      style: 'mapbox://styles/notalemesa/ck8dqwdum09ju1ioj65e3ql3k',
      center: [-98, 37], // initial geo location
      zoom: 3 // initial zoom
    });

    // Add navigation controls to the top right of the canvas
    map.addControl(new mapboxgl.NavigationControl());

    // Add navigation control to center your map on your location
    map.addControl(
      new mapboxgl.GeolocateControl({
        fitBoundsOptions: { maxZoom: 6 }
      })
    );
  }, []);

  return (
    <div className="App">
      <div className="mapContainer">
        {/* Assigned Mapbox container */}
        <div className="mapBox" ref={mapboxElRef} />
      </div>
    </div>
  );
}

export default App;