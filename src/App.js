import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import useSWR from 'swr'; // React hook to fetch the data
import lookup from 'country-code-lookup'; // npm module to get ISO Code for countries

import './App.scss';

// Mapbox css - needed to make tooltips work later in this article
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'your-access-token';

function App() {
  const fetcher = (url) =>
    fetch(url)
      .then((r) => r.json())
      .then((data) =>
        data.map((point, index) => ({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [point.coordinates.longitude, point.coordinates.latitude]
          },
          properties: {
            id: index, // unique identifier in this case the index
            country: point.country,
            province: point.province,
            cases: point.stats.confirmed,
            deaths: point.stats.deaths
          }
        }))
      );

  // Fetching our data with swr package
  const { data } = useSWR('https://disease.sh/v3/covid-19/jhucsse', fetcher);

  useEffect(() => {
    if (data) {
      const map = new mapboxgl.Map({
        /* ... previous code */
      });

      // Call this method when the map is loaded
      map.once('load', function () {
        // Add our SOURCE
        // with id "points"
        map.addSource('points', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: data
          }
        });

        // Add our layer
        map.addLayer({
          id: 'circles',
          source: 'points', // this should be the id of the source
          type: 'circle',
          // paint properties
          paint: {
            'circle-opacity': 0.75,
            'circle-stroke-width': 1,
            'circle-radius': 4,
            'circle-color': '#FFEB3B'
          }
        });
      });
    }
  }, [data]);
}

export default App;