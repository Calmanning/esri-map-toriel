console.log("determination.")

require([
    "esri/config",
    "esri/Map",
    "esri/views/MapView",
    "esri/widgets/Sketch",
    "esri/layers/GraphicsLayer",
    "esri/layers/FeatureLayer"
], (esriConfig, Map, MapView, Sketch, GraphicsLayer, FeatureLayer) => {

     esriConfig.apiKey = "AAPK115d19ab66264ef1b7cdbdd54b6804f4whm-2t82h02UCQQ1zigAlbT-GPsbqzkH4Cd1xDjXtPoshgyibnsGBM4zg-eklxut"

    const map = new Map({
        basemap: "arcgis-topographic"
    });

    const view = new MapView({
        container: "viewDiv",
        map: map,
        center: [-118.80543, 34.03000],
        zoom: 11
    });
    
    const graphicsLayerSketch = new GraphicsLayer();
    view.map.add(graphicsLayerSketch);

    const sketch = new Sketch({
        layer: graphicsLayerSketch,
        view: view,
        creationMode: "update"
    });
    view.ui.add(sketch, "top-right");
    
    sketch.on("update", (event) => {
        
    })

    console.log("this is the end")
});