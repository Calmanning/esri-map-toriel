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
        if(event.state === "start"){
            queryFeatureLayer(event.graphics[0].geometry);
        }
        if(event.state === "complete"){
            graphicsLayerSketch.remove(event.graphics[0]);
        }
        if(event.toolEventInfo && (event.toolEventInfo.type === "scale-stop" || 
                                   event.toolEventInfo.type === "reshape-stop" || 
                                   event.toolEventInfo.type === "move-stop")){
            queryFeatureLayer(event.graphics[0].geometry);
                                   }
    })

    const featureLayer = new FeatureLayer({
        url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/LA_County_Parcels/FeatureServer/0"
    })

    const queryFeatureLayer = ((geometry) => {

        const parcelQuery = {
            spatialRelationship: "intersects",
            geometry:geometry,
            outFields: ["APN", "UseType", "TaxRateCity", "Roll_LandValue"],
            returnGeometery: true
        }
        console.log(geometry);
        featureLayer.queryFeatures(parcelQuery)
        .then((result) => {
            console.log("Features returned from the query: " + result.features.length)
        }).catch((err) => {
            console.log(err);
        });
    })

    console.log("this is the end")
});