const apiOptions = { 
server : 'http://localhost:3000' 
}; 
if (process.env.NODE_ENV === 'production') { 
apiOptions.server = 'https://pure-temple-67771.herokuapp.com'; 
}

const doAddReview = function(req, res){
const locationid = req.params.locationid; 
const path = `/api/locations/${locationid}/reviews`; 
const postdata = { 
author: req.body.name, 
rating: parseInt(req.body.rating, 10), 
reviewText: req.body.review 
}; 
const requestOptions = {
url : apiOptions.server + path, 
method : 'POST', 
json : postdata 
};
if (!postdata.author || !postdata.rating || !postdata.reviewText) { 
res.redirect('/location/' + locationid + '/review/new?err=val'); 
} else {
request( requestOptions,(err, response, body) => {
if (response.statusCode === 201) { 
res.redirect(`/location/${locationid}`); 
}  else if (response.statusCode === 400 && body.name && body.name ==='ValidationError' ) { 
res.redirect(`/location/${locationid}/review/new?err=val`); 
} else {
console.log(body);
_showError(req, res, response.statusCode);
}
});
}
};


const request = require('request');

const _renderHomepage = function(req, res, responseBody){
res.render('locations-list', {
title: 'Music', 
pageHeader: {
      title: 'Music',
      strapline: 'Great Music to listen to'
    },
    sidebar: "Keeep your head bopping",
    locations: responseBody 
});
};
const homelist = function(req, res){
const path = '/api/locations'; 
const requestOptions = { 
url : apiOptions.server + path, 
method : 'GET', 
json : {}, 
qs : { 
 
} 
}; 
request(requestOptions, (err, response, body) => { 
_renderHomepage(req, res, body);
if (response.statusCode === 200 && data.length) { 
for (let i = 0; i < data.length; i++) {
data[i].distance = _formatDistance(data[i].distance);
}
}

} 
);
};

const _showError = function (req, res, status) {
let title = '';
let content = '';
if (status === 404) { 
title = '404, page not found'; 
content = 'Oh dear. Looks like we can\'t find this page. Sorry.'; 
} else { 
title = `${status}, something's gone wrong`; 
content = 'Something, somewhere, has gone just a little bit wrong.'; 
}
res.status(status); 
res.render('generic-text', { 
title : title, 
content : content 
}); 
};






/* GET 'Location info' page */
/*const locationInfo = function(req, res){
  res.render('location-info', {
    title: 'Black Sabath',
    pageHeader: {
      title: 'Black Sabath'
    },
    sidebar: {
      context: 'is on Loc8r because it has accessible wifi and space to sit down with your laptop and get some work done.',
      callToAction: 'If you\'ve been and you like it - or if you don\'t - please leave a review to help other people just like you.'
    },
    location: {
      name: 'Black Sabath',
      album: 'Greatest Hits',
      rating: 3,
      facilities: ['Hot drinks', 'Food', 'Premium wifi'],
      reviews: [{
        author: 'Simon Holmes',
        rating: 5,
        timestamp: '16 July 2013',
        reviewText: 'What a great place. I can\'t say enough good things about it.'
      }, {
        author: 'Charlie Chaplin',
        rating: 3,
        timestamp: '16 June 2013',
        reviewText: 'It was okay. Coffee wasn\'t great, but the wifi was fast.'
      }]
    }
  });
};*/

/*const locationInfo = function(req, res){
const path = `/api/locations/${req.params.locationid}`; 
requestOptions = { 
url : apiOptions.server + path, 
method : 'GET', 
json : {} 
}; 
request(requestOptions,(err, response, body) => {
_renderDetailPage(req, res); 
}
);
};
*/

/*const _renderReviewForm = function (req, res) { 
res.render('location-review-form', {
title: 'Review Albums on Music',
pageHeader: { title: 'Review Albums' }
});
};*/
/* GET 'Add review' page */
/*const addReview = function(req, res){
_renderReviewForm(req, res); 
};
*/
/* GET 'register' page */
const register = function(req, res){
  res.render('register', {
    title: 'Register for best music',
    pageHeader: { title: 'Register' }
  });
};

const login = function(req, res){
  res.render('login', {
    title: 'Login for best music',
    pageHeader: { title: 'Login' }
  });
};

const _renderDetailPage = function (req, res) { 
res.render('location-info', { 
title: 'Black Sabath', 
pageHeader: {
      title: 'Black Sabath'
    },
    sidebar: {
      context: 'great music',
      callToAction: 'Review our ablums'
    },
location: req
});
};

const _getLocationInfo = function (req, res, callback) { 
const path = `/api/locations/${req.params.locationid}`;
const requestOptions = {
url : apiOptions.server + path,
method : 'GET',
json : {}
};
request(requestOptions,(err, response, body) => {
let data = body;
if (response.statusCode === 200) {
data.coords = {

};
callback(req, res, data); 
} else {
_showError(req, res, response.statusCode);
}
}
);
};
const locationInfo = function(req, res){
_getLocationInfo(req, res, (req, res, responseData) => { 
_renderDetailPage(req, res, responseData); 
}); 
};
const addReview = function(req, res){
_getLocationInfo(req, res, (req, res, responseData) => { 
_renderReviewForm(req, res, responseData); 
}); 
};


const _renderReviewForm = function (req, res, locDetail) { 
res.render('location-review-form', {
title: `Review ${locDetail.name} on Music`, 
pageHeader: { title: `Review ${locDetail.name}` },
error: req.query.err 
});
};




module.exports = {
  homelist,
  locationInfo,
  addReview,
  register,
  login,
  doAddReview
};