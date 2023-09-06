import { DefaultLoadingManager } from "three"

export const HandleLoadingProgress = ({
  handleLoading,
  totalAssets,
  logassets,
}) => {
  // DefaultLoadingManager.onStart = function (url, itemsLoaded, itemsTotal) {
  //   console.log(
  //     "Started loading file: " +
  //       url +
  //       ".\nLoaded " +
  //       itemsLoaded +
  //       " of " +
  //       itemsTotal +
  //       " files."
  //   )
  // }

  // not needed because on progress reduces to 100
  // // DefaultLoadingManager.onLoad = function () {
  // //   handleLoading(100)
  // // }
  DefaultLoadingManager.onError = function (url) {
    console.log("There was an error loading " + url)
  }

  DefaultLoadingManager.onProgress = function (url, itemsLoaded, itemsTotal) {
    logassets && console.log("object", itemsLoaded, itemsTotal)
    handleLoading((itemsLoaded / totalAssets) * 100)
  }

  return null
}
