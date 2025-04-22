export default function handler(req, res) {
    // Fetch the API key from the Vercel environment variable
    const key = process.env.GOOGLE_MAPS_API_KEY;
  
    // Set the correct Content-Type for JavaScript
    res.setHeader('Content-Type', 'application/javascript');
  
    // Send the script that loads Google Maps API with the provided API key
    res.send(`
      window.initMapInternal = function() {
        // Initialize your map logic here
        const mapOptions = {
          zoom: 13,
          center: { lat: 51.5074, lng: -0.1278 },
          styles: [ /* your custom styles here */ ]
        };
        const map = new google.maps.Map(document.getElementById("map"), mapOptions);
      };
  
      // Dynamically load Google Maps API
      const script = document.createElement('script');
      script.src = "https://maps.googleapis.com/maps/api/js?key=${key}&callback=initMapInternal";
      script.async = true;
      document.head.appendChild(script);
    `);
  }
  