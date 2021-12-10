console.log("displaying a webmap");
console.log("it's okay to take your time to learn.");
console.log("remember to ask good questions");

require([
      "esri/config",
      "esri/WebMap",
      "esri/views/MapView",
      "esri/widgets/ScaleBar",
      "esri/widgets/Legend"
    ], function(esriConfig, WebMap, MapView, ScaleBar, Legend) {

    esriConfig.apiKey = "AAPK115d19ab66264ef1b7cdbdd54b6804f4whm-2t82h02UCQQ1zigAlbT-GPsbqzkH4Cd1xDjXtPoshgyibnsGBM4zg-eklxut" 

    const webmap = new WebMap({
        portalItem: {
          id: "deb865f54e68469b92b34b63568eb77b"
        }
      });

      const view = new MapView({
        container: "viewDiv",

        map: webmap

      });

      const scaleBar = new ScaleBar ({
          view: view
      })
      view.ui.add(scaleBar, "bottom-left")

      const legend = new Legend ({
          view: view
      });
      view.ui.add(legend, "top-right")

      
})

