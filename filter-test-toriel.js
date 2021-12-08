console.log("filter testing")


require([
         "esri/config",
         "esri/Map",
         "esri/views/MapView",
         "esri/layers/FeatureLayer", 
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
    
    

    const sqlExpressions = ["Choose an SQL clause", 
                            "Roll_LandValue < 200000", 
                            "TaxRateArea = 10853", 
                            "Bedrooms5 > 0", 
                            "UseType = 'Residential'", 
                            "Roll_RealEstateExemp > 0" ]
    
    const selectFilter = document.createElement("select");
        selectFilter.setAttribute("class", "esri-widget esri-select");
        selectFilter.setAttribute("style", "width: 275px; font-family: Avenir Next W00; font-size: 1em;");
    
    sqlExpressions.forEach((expression) => {
        let option = document.createElement("option");
        option.value = expression;
        option.innerHTML = expression;
        selectFilter.appendChild(option);
    });

    view.ui.add(selectFilter, "top-right")
    
})