let map;
let markers = [];
let markersVisible = true; // Track if markers are visible

// Define the Orokin Light and Void Night styles
const orokinLightStyle = [
  { "elementType": "geometry", "stylers": [{ "color": "#ffffff" }] },
  { "elementType": "labels.text.fill", "stylers": [{ "color": "#c4a300" }] },
  { "elementType": "labels.text.stroke", "stylers": [{ "color": "#f4f4f4" }] },
  { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#f3f3f3" }] },
  { "featureType": "poi", "elementType": "labels", "stylers": [{ "visibility": "simplified" }] },
  { "featureType": "road", "stylers": [{ "color": "#dddddd" }] },
  { "featureType": "water", "stylers": [{ "color": "#d9e4f4" }] },
  { "featureType": "transit", "stylers": [{ "visibility": "off" }] }
];

const voidNightStyle = [
  { "elementType": "geometry", "stylers": [{ "color": "#000000" }] },
  { "elementType": "labels.text.fill", "stylers": [{ "color": "#c4a300" }] },
  { "elementType": "labels.text.stroke", "stylers": [{ "color": "#3e3e3e" }] },
  { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#3c3c3c" }] },
  { "featureType": "poi", "elementType": "labels", "stylers": [{ "visibility": "simplified" }] },
  { "featureType": "road", "stylers": [{ "color": "#3e3e3e" }] },
  { "featureType": "water", "stylers": [{ "color": "#1e1e1e" }] },
  { "featureType": "transit", "stylers": [{ "visibility": "off" }] }
];

// Add a toggle function to switch between day/night modes
let currentStyle = orokinLightStyle;

document.getElementById('theme-toggle').addEventListener('click', () => {
  if (currentStyle === orokinLightStyle) {
    map.setOptions({ styles: voidNightStyle });
    currentStyle = voidNightStyle;
  } else {
    map.setOptions({ styles: orokinLightStyle });
    currentStyle = orokinLightStyle;
  }
});

// Function to initialize the map
function initMapInternal() {
  const options = {
    zoom: 13,
    center: { lat: 51.5074, lng: -0.1278 },
    styles: currentStyle
  };

  map = new google.maps.Map(document.getElementById('map'), options);

  const locations = [
    { lat: 51.5074, lng: -0.1278, title: 'Big Ben', icon: 'https://raw.githubusercontent.com/NuggetSlayz/WarframeThemedGoogleMaps/main/assets/icons/Excalibur%20Umbra.png' },
    { lat: 51.5007, lng: -0.1246, title: 'London Eye', icon: 'https://raw.githubusercontent.com/NuggetSlayz/WarframeThemedGoogleMaps/main/assets/icons/Dagath.png' },
    { lat: 51.5194, lng: -0.1270, title: 'British Museum', icon: 'https://raw.githubusercontent.com/NuggetSlayz/WarframeThemedGoogleMaps/main/assets/icons/Voruna.png' },
    { lat: 51.5033, lng: -0.1196, title: 'Tower Bridge', icon: 'https://raw.githubusercontent.com/NuggetSlayz/WarframeThemedGoogleMaps/main/assets/icons/Citrine.png' },
    { lat: 51.5014, lng: -0.1419, title: 'Buckingham Palace', icon: 'https://raw.githubusercontent.com/NuggetSlayz/WarframeThemedGoogleMaps/main/assets/icons/Styanax.png' }
  ];

  locations.forEach(location => {
    const marker = new google.maps.Marker({
      position: { lat: location.lat, lng: location.lng },
      map,
      title: location.title,
      icon: {
        url: location.icon,
        scaledSize: new google.maps.Size(50, 50),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(25, 25) // Center the icon on the marker
      }
    });
    markers.push(marker);
  });

  // Hide loader when tiles are fully loaded
  google.maps.event.addListenerOnce(map, 'tilesloaded', () => {
    const loader = document.getElementById('loader-overlay');
    if (loader) loader.style.display = 'none';
  });
}

// Toggle markers visibility
document.getElementById('toggle-markers').addEventListener('click', () => {
  markersVisible = !markersVisible;
  markers.forEach(marker => {
    marker.setMap(markersVisible ? map : null);
  });
});

// Ensure map init function is globally accessible
window.initMapInternal = initMapInternal;