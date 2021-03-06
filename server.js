var express = require('express');
var cors = require('cors');
var axios = require('axios');
var cartAPI = require('./affiliate-urls/flipkart-apis');
var app = express();
const envs = require('./config');

var allowedOrigins = ['http://localhost:3000','http://127.0.0.1:3000'];

var corsOptions = function(req, callback) {
    if(allowedOrigins.indexOf(req.header('Origin')) !== -1){
        return callback(null, {origin: true});
    } else {
        return callback(null, {origin: false});
    }
}

app.use('*', cors(corsOptions));


const headerAuth = {
    'Fk-Affiliate-Id': envs.fk_affiliate_id,
    'Fk-Affiliate-Token': envs.fk_affiliate_token,
}

const apiUrls = cartAPI.getUrls(headerAuth, envs.data_format);

const apiExecuter = function(url, auth){
    return axios.get(url, {headers:auth});
}

const apiSuffix = "/api";
const kartAPISuffix = "/flipkart";

app.get(apiSuffix + kartAPISuffix + '/product', (req, res)=>{
    const apiPromise = apiExecuter(apiUrls.productFeedList, headerAuth);
    apiPromise.then(function(result){
        res.send(result.data);
    },function(err){
        console.error(err);
    });
    
});

app.get(apiSuffix + kartAPISuffix + '/booksCategory', (req, res)=>{
    const apiPromise = apiExecuter(apiUrls.booksCategoryFeed, headerAuth);
    apiPromise.then(function(result){
        res.send(result.data);
    },function(err){
        console.error(err);
    });
});

app.get(apiSuffix + kartAPISuffix + '/searchByKeyword', (req, res)=>{
    const url = apiUrls.searchByKeyword + "?query="+req.query.query+"&resultCount="+req.query.count;
    const apiPromise = apiExecuter(url, headerAuth);
    apiPromise.then(function(result){
        res.send(result.data);
    },function(err){
        console.error(err);
    });
});

app.get(apiSuffix + kartAPISuffix + '/searchById', (req, res)=>{
    const url = apiUrls.searchById + "?id="+req.query.id;
    const apiPromise = apiExecuter(url, headerAuth);
    apiPromise.then(function(result){
        res.send(result.data);
    },function(err){
        console.error(err);
    });
});

app.get(apiSuffix + kartAPISuffix + '/feeds', (req, res)=>{
    const apiPromise = apiExecuter(apiUrls.feedDownloadList, headerAuth);
    apiPromise.then(function(result){
        res.send(result.data);
    },function(err){
        console.error(err);
    });
});

app.get(apiSuffix + kartAPISuffix + '/allOffers', (req, res)=>{
    const apiPromise = apiExecuter(apiUrls.allOffer, headerAuth);
    apiPromise.then(function(result){
        res.send(result.data);
    },function(err){
        console.error(err);
    });
});

app.get(apiSuffix + kartAPISuffix + '/dealsOfTheDay', (req, res)=>{
    const apiPromise = apiExecuter(apiUrls.dealsOfTheDay, headerAuth);
    apiPromise.then(function(result){
        res.send(result.data);
    },function(err){
        console.error(err);
    });
});

app.get(apiSuffix + kartAPISuffix + '/orderReport', (req, res)=>{
    const url = apiUrls.orderReport+"?startDate="+req.query.startDate+"&endDate="+req.query.endDate+"&status="+req.query.status+"&offset="+req.query.offset;
    const apiPromise = apiExecuter(url, headerAuth);
    apiPromise.then(function(result){
        res.send(result.data);
    },function(err){
        console.error(err);
    });
});

app.get(apiSuffix + kartAPISuffix + '/appInstallReport', (req, res)=>{
    const url = apiUrls.appInstallReport + "?startDate="+req.query.startDate+"&endDate="+req.query.endDate+"&status="+req.query.status;
    const apiPromise = apiExecuter(url, headerAuth);
    apiPromise.then(function(result){
        res.send(result.data);
    },function(err){
        console.error(err);
    });
});

app.listen(envs.port, function(){
    console.log(`CORS Proxy Gateway for Cart Commerce APP listening on port ${envs.port}`);
})