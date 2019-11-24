const clientUrls = function (credentials, format) {

    const baseURL = "https://affiliate-api.flipkart.net/affiliate/"

    const reqUrl = {
      productFeedList: baseURL + "api/"+ credentials.trackingId +"." + format,
      booksCategoryFeed: baseURL + "1.0/booksApi/"+ credentials.trackingId +"." + format,
      searchByKeyword: baseURL + "1.0/search." + format,
      searchById: baseURL + "1.0/product." + format,
      feedDownloadList: baseURL + "download/feeds/"+ credentials.trackingId +"." + format,
      allOffer: baseURL + "offers/v1/all/" + format,
      dealsOfTheDay: baseURL + "offers/v1/dotd/" + format,
      orderReport: baseURL + "report/orders/detail/" + format,
      appInstallReport: baseURL + "v1/appInstall/" + format,
    }

    return reqUrl;
}

exports.getUrls = clientUrls;