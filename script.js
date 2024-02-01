require([
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/ImageryLayer",
  "esri/layers/support/RasterFunction"
], (Map, MapView, ImageryLayer, RasterFunction) => {
  // Setting up a detailed popup template for Landsat 8 NDVI data
  const imagePopupTemplate = {
    title: "Vegetation Health (NDVI)",
    content: `
      NDVI information derived from Landsat 8's OLI sensor.
      <ul>
          <li>NIR Band (Band 5)</li>
          <li>Red Band (Band 4)</li>
      </ul>
      NDVI formula: <b>(NIR - Red) / (NIR + Red)</b>. <br>
      NDVI values range from -1 to 1, where higher values indicate healthier vegetation.
    `
  };

  // Creating an image layer using NDVI raster function
  const serviceRFT = new RasterFunction({
    functionName: "NDVI Colorized",
    variableName: "Raster"
  });

  const layer = new ImageryLayer({
    url: "https://landsat2.arcgis.com/arcgis/rest/services/Landsat8_Views/ImageServer",
    rasterFunction: serviceRFT,
    popupTemplate: imagePopupTemplate
  });

  // Creating and configuring the map
  const map = new Map({
    basemap: "hybrid", // Using a hybrid basemap for better visual context
    layers: [layer]
  });

  // Configuring the map view with a focus on the Midwest region
  const view = new MapView({
    container: "viewDiv",
    map: map,
    center: [-94.5786, 39.0997], // Centering over Kansas City, Missouri
    zoom: 8, // Optimal zoom level 
    popup: {
      actions: [] // Customizing popup actions
    }
  });
});
