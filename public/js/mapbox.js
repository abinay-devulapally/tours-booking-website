/* eslint-disable */
export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiYWJpbmF5IiwiYSI6ImNsdzJ4Y3U3cjBzeDYyaW9jdnF1dTJvN2QifQ.x3K48dLyzVgBj-4vN6ip9g';

  var map = new mapboxgl.Map({
    container: 'map',
    // navigation
    //style: 'mapbox://styles/abinay/clw3v3m8h01bp01qu7vc3drn9',
    // satellite
    style: 'mapbox://styles/abinay/clw3yyjgk02ml01oc6kb7gl8d',

    // style: 'mapbox://styles/mapbox/streets-v11',
    scrollZoom: true,
    // center: [-118.113491, 34.111745],
    // zoom: 10,
    // interactive: false
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    // Create marker
    const el = document.createElement('div');
    el.className = 'marker';

    // Add marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Add popup
    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    // Extend map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
};
