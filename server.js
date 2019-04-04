const express = require('express')
const api_helper = require('./backend/app')
const app = express()
const port = 8080
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
  try {
  find = req.query["keyword"];
  category = req.query["category"];
  distance = req.query["distance"];
  newC = req.query["new"];
  usedC = req.query["used"];
  unspec = req.query["unspecified"];
  localpickup = req.query["localpickup"];
  freeshipping = req.query["freeshipping"];
  distance = req.query["distance"];
  postalCode = req.query["postalCode"];
  } catch (e) {}

  searchURL = 'https://svcs.ebay.com/services/search/FindingService/v1?SECURITY-APPNAME='+ EbayAPIKey +'&OPERATION-NAME=findItemsAdvanced&SERVICE-VERSION=1.0.0&RESPONSE-DATA-FORMAT=JSON&RESTPAYLOAD&paginationInput.entriesPerPage=50&keywords='+ find + '&buyerPostalCode=' + postalCode;

  if(category !== undefined && category != '') {
    searchURL = searchURL + '&categoryId=' + category;
  }

  filterIndex = 0;
  if(distance !== undefined) {
    searchURL = searchURL + '&itemFilter(' + filterIndex + ').name=MaxDistance&itemFilter(' + filterIndex +').value=' + distance;
    filterIndex++;
  }

  if(freeshipping !== undefined) {
    searchURL = searchURL + '&itemFilter(' + filterIndex + ').name=FreeShippingOnly&itemFilter(' + filterIndex +').value=' + freeshipping;
    filterIndex++;
  }

  if(freeshipping !== undefined) {
    searchURL = searchURL + '&itemFilter(' + filterIndex + ').name=LocalPickupOnly&itemFilter(' + filterIndex +').value=' + localpickup;
    filterIndex++;
  }
  searchURL = searchURL + '&itemFilter(' + filterIndex +').name=HideDuplicateItems&itemFilter(' + filterIndex + ').value=true';
  filterIndex++;

  if(newC == 'true' || usedC == 'true' || unspec == 'true') {
  searchURL = searchURL + '&itemFilter(' + filterIndex  + ').name=Condition';
  index = 0;
  if (newC === 'true') {
    searchURL = searchURL + '&itemFilter(' + filterIndex + ').value(' + index +')=New'
    index++;
  }

  if (usedC === 'true') {
    searchURL = searchURL + '&itemFilter(' + filterIndex + ').value(' + index +')=Used'
    index++;
  }

  if (unspec === 'true') {
    searchURL = searchURL + '&itemFilter(' + filterIndex +').value(' + index +')=Unspecified'
    index++;
  }
  }

  searchURL = searchURL + '&outputSelector(0)=SellerInfo&outputSelector(1)=StoreInfo';
  api_helper.make_API_call(searchURL)
  .then(response => {
      res.json(response)
  })
  .catch(error => {
      res.send(error)
  })
})

app.get('/itemDetails', (req, res) => {
  itemID = req.query["itemID"];
  detailsURL = 'http://open.api.ebay.com/shopping?callname=GetSingleItem&responseencoding=JSON&appid=' + EbayAPIKey + '&siteid=0&version=967&ItemID='+ itemID +'&IncludeSelector=Description,Details,ItemSpecifics'
  api_helper.make_API_call(detailsURL)
  .then(response => {
      res.json(response)
  })
  .catch(error => {
      res.send(error)
  })
})


app.get('/similarItems', (req, res) => {
  try {
  itemID = req.query["itemID"];
  } catch(e) {
    itemID = '';
  }
  api_helper.make_API_call2('https://svcs.ebay.com/MerchandisingService?OPERATION-NAME=getSimilarItems&SERVICE-NAME=MerchandisingService&SERVICE-VERSION=1.1.0&CONSUMER-ID=' + EbayAPIKey + '&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&itemId=' + itemID + '&maxResults=20')
  .then(response => {
      res.json(JSON.parse(response))
  })
  .catch(error => {
      res.send(error)
  })
})

app.get('/googlePhotos', (req, res) => {
  productTitle = req.query["productTitle"];
  imageURL = 'https://www.googleapis.com/customsearch/v1?q=' + encodeURI(productTitle) +'&cx=005205816040132596365:jrgtgdslooo&imgSize=huge&imgType=news&num=8&searchType=image&key=AIzaSyD8hL2p3msJzzIY3dLaTtcQuQcCE7AAUIc';
  api_helper.make_API_call(imageURL)
  .then(response => {
      res.json(response)
  })
  .catch(error => {
      res.send(error)
  })
})

app.listen(port, () => console.log(`App listening on port ${port}!`))

