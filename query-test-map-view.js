console.log("connected to the query-test-js.")

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
            center:[-118.80543, 34.03000],
            zoom: 13
        });

        const parcelLayerSQL = [ "Chose a SQL 'where' clause...", 
                                "UseType = 'Government'",
                                "UseType = 'Residential'",
                                "UseType = 'Irrigated Farm'",
                                "TaxRateArea = 10860",
                                "TaxRateArea = 08637",
                                "Roll_LandValue < 1000000" ];
        
        let whereClause = parcelLayerSQL[0];

        const sqlSelect = document.createElement("select", "");
            sqlSelect.setAttribute("class", "esri-widget esri-select");
            sqlSelect.setAttribute("style","width:200px; font-family: 'Avenir Next;font-size: 1em");
            parcelLayerSQL.forEach(((query) => {
                let option = document.createElement("option");
                option.innerHTML = query;
                option.value = query;
                sqlSelect.appendChild(option);
            }))
            view.ui.add(sqlSelect, "top-right");

        sqlSelect.addEventListener('change', (event) => {
            whereClause = event.target.value;
            query(view.extent)
        });

        const parcelLayer = new FeatureLayer ({
            url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/LA_County_Parcels/FeatureServer/0"
        })

        const query = function queryFeatureLayer(extent) {

            const parcelQuery = {
                where: whereClause,
                spatialPropery: "intersects",
                geometry: extent,
                outFields: ["APN", "UseType", "TaxRateCity", "Roll_LandValue"],
                returnGeometry: true
            }

            parcelLayer.queryFeatures(parcelQuery).
            then((results) => {
                console.log(results.features.length);
            displayResults(results)}).
                catch((err) => {
                    console.log("here's what went wrong: " + err)
                })
        }
       
        function displayResults(results){

            const symbol = {
                type: "simple-fill",
                color: [20, 130, 200, 0.5],
                outline:{
                    color: "white",
                    width: 1
                }
            }
            
            const popupTemplate = {
                title: "Parcel {APN}",
                content: "Type: {UseType} <br> Land value: {Roll_LandValue} <br> Tax Rate City: {TaxRateCity}"
            };

            results.features.map((results) => {
                results.symbol = symbol;
                results.popupTemplate = popupTemplate;
                return results;        
            });

            view.popup.close()
            view.graphics.removeAll();
            view.graphics.addMany(results.features)

        }

console.log("nobody came")
    });