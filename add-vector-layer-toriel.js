console.log("now we'll add a vector layer");

require([
          "esri/config",
          "esri/Map",
          "esri/views/MapView",
          "esri/layers/VectorTileLayer"
], (esriConfig, Map, MapView, VectorTileLayer) => {

    const vectorLayer = new VectorTileLayer({
        url: "https://vectortileservices3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Santa_Monica_Mountains_Parcels_VTL/VectorTileServer/"
    })

    esriConfig.apiKey = "AAPK115d19ab66264ef1b7cdbdd54b6804f4whm-2t82h02UCQQ1zigAlbT-GPsbqzkH4Cd1xDjXtPoshgyibnsGBM4zg-eklxut" 

    const map = new Map ({
        basemap: "arcgis-light-gray",
        layers: [vectorLayer]
    });

    const view = new MapView ({
        container: "viewDiv",
        map: map,
        center: [-118.80543, 34.02700],
        zoom: 15
    });

})