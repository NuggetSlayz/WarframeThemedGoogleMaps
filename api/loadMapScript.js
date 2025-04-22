export default function handler(req, res) {
    const key = process.env.GOOGLE_MAPS_API_KEY;
    res.setHeader('Content-Type', 'application/javascript');
    res.send(`window.initMap = function() {
      const script = document.createElement('script');
      script.src = "https://maps.googleapis.com/maps/api/js?key=${key}&callback=initMapInternal";
      script.async = true;
      document.head.appendChild(script);
    }`);
  }