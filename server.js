const express = require('express')
const api_helper = require('./backend/app')
const app = express()
const port = 3000
const EbayAPIKey= 'MahimaPu-Myproduc-PRD-9e46bc082-d04201c4';

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/geoname', (req, res) => {
  code = req.query["code"];
  api_helper.make_API_call('http://api.geonames.org/postalCodeSearchJSON?postalcode_startsWith=' + code + '&username=mpulastya&country=US&maxRows=5')
  .then(response => {
      res.json(response)
  })
  .catch(error => {
      res.send(error)
  })
})

// keyword,category,distance,conditions,shippingOptions,zipCode
app.get('/searchItem', (req, res) => {
  find = req.query["keyword"];
  // newC = req.query["new"];
  // usedC = req.query["used"];
  // unspec = req.query["unspecified"];
  // localpickup = req.query["localpickup"];
  // freeshipping = req.query["freeshipping"];
  // distance = req.query["distance"];
  // postalCode = req.query["postalCode"];

  postalCode = '90007';
  api_helper.make_API_call('https://svcs.ebay.com/services/search/FindingService/v1?SECURITY-APPNAME='+ EbayAPIKey +'&OPERATION-NAME=findItemsAdvanced&SERVICE-VERSION=1.0.0&RESPONSE-DATA-FORMAT=JSON&RESTPAYLOAD&paginationInput.entriesPerPage=50&keywords='+ find + '&buyerPostalCode=' + postalCode + '&itemFilter(0).name=MaxDistance&itemFilter(0).value=10&itemFilter(1).name=FreeShippingOnly&itemFilter(1).value=true&itemFilter(2).name=LocalPickupOnly&itemFilter(2).value=true&itemFilter(3).name=HideDuplicateItems&itemFilter(3).value=true&itemFilter(4).name=Condition&itemFilter(4).value(0)=New&itemFilter(4).value(1)=Used&itemFilter(4).value(2)=Unspecified&outputSelector(0)=SellerInfo&outputSelector(1)=StoreInfo')
  .then(response => {
      res.json(response)
  })
  .catch(error => {
      res.send(error)
  })
})

app.get('/itemDetails', (req, res) => {
  itemID = req.query[itemID];
  api_helper.make_API_call('http://open.api.ebay.com/shopping?callname=GetSingleItem&responseencoding=JSON&appid=' + EbayAPIKey + '&siteid=0&version=967&ItemID='+ itemID +'&IncludeSelector=Description,Details,ItemSpecifics')
  .then(response => {
      res.json(response)
  })
  .catch(error => {
      res.send(error)
  })
})


app.get('/similarItems', (req, res) => {
  api_helper.make_API_call2('https://svcs.ebay.com/MerchandisingService?OPERATION-NAME=getSimilarItems&SERVICE-NAME=MerchandisingService&SERVICE-VERSION=1.1.0&CONSUMER-ID=MahimaPu-Myproduc-PRD-9e46bc082-d04201c4&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&itemId=152770330173&maxResults=20')
  .then(response => {
      res.json(JSON.parse(response))
  })
  .catch(error => {
      res.send(error)
  })
})

app.get('/googlePhotos', (req, res) => {
  api_helper.make_API_call('https://www.googleapis.com/customsearch/v1?q=%22Apple%20iPhone%207%20-%2032GB%20-%20Black%20(Unlocked)%20A1660%20(CDMA%20+GSM)%22&cx=005205816040132596365:jrgtgdslooo&imgSize=huge&imgType=news&num=8&searchType=image&key=AIzaSyD8hL2p3msJzzIY3dLaTtcQuQcCE7AAUIc')
  .then(response => {
      res.json(response)
  })
  .catch(error => {
      res.send(error)
  })
})

app.listen(port, () => console.log(`App listening on port ${port}!`))

