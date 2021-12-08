console.log("dating start");

require([
        "esri/config",
        "esri/Map",
        "esri/views/MapView",
        "esri/layers/FeatureLayer"
], (esriConfig, Map, MapView, FeatureLayer) => {

    esriConfig.apiKey = "AAPK115d19ab66264ef1b7cdbdd54b6804f4whm-2t82h02UCQQ1zigAlbT-GPsbqzkH4Cd1xDjXtPoshgyibnsGBM4zg-eklxut"

    const map = new Map ({
        basemap: "arcgis-topographic"
    });

    const view = new MapView ({
        container: "viewDiv",
        map: map,
        center: [-118.80543, 34.02700],
        zoom: 13
    })

    const popupTrailheads = {
        "title": "Trailhead",
        "content": `<b>Trail:</b> {TRL_NAME} 
                    <br> <b>City:</b> {CITY_JUR} 
                    <br> <b>Cross Street:</b> {X_STREET} 
                    <br> <b>Parking:</b> {PARKING} 
                    <br> <b>Elevation:</b> {ELEV_FT} ft`
    }

    const trailheads = new FeatureLayer ({
        url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads_Styled/FeatureServer/0",
        outFields: ["TRL_NAME", "CITY_JUR", "X_STREET", "PARKING", "ELEV_FT"],
        popupTemplate: popupTrailheads
    })
    view.map.add(trailheads)

    const popupTrails = {
        title: "Trail Information: {TRL_NAME}",
        content: [{
            type: "media",
                mediaInfos: [{
                    type: "column-chart",
                    caption: "",
                    value: {
                        fields: ["ELEV_MIN", "ELEV_MAX"],
                        normalizeField: null,
                        tooltipField: "Min and Max elevation values."
                    }
                }]
            }]
        }
        
    const trails = new FeatureLayer({
        url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails_Styled/FeatureServer/0",
        outFields: ["ELEV_MIN", "ELEV_MAX"],
        popupTemplate: popupTrails
    })
    view.map.add(trails, 0);

})