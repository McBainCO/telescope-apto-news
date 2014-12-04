(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                   //
// packages/telescope-module-embedly/lib/embedly.js                                                  //
//                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                     //
var thumbnailProperty = {                                                                            // 1
  propertyName: 'thumbnailUrl',                                                                      // 2
  propertySchema: {                                                                                  // 3
    type: String,                                                                                    // 4
    optional: true                                                                                   // 5
  }                                                                                                  // 6
}                                                                                                    // 7
addToPostSchema.push(thumbnailProperty);                                                             // 8
                                                                                                     // 9
var mediaProperty = {                                                                                // 10
  propertyName: 'media',                                                                             // 11
  propertySchema: {                                                                                  // 12
    type: Object,                                                                                    // 13
    optional: true,                                                                                  // 14
    blackbox: true                                                                                   // 15
  }                                                                                                  // 16
}                                                                                                    // 17
addToPostSchema.push(mediaProperty);                                                                 // 18
                                                                                                     // 19
                                                                                                     // 20
postModules.push({                                                                                   // 21
  template: 'postThumbnail',                                                                         // 22
  position: 'center-left'                                                                            // 23
});                                                                                                  // 24
                                                                                                     // 25
var embedlyKeyProperty = {                                                                           // 26
  propertyName: 'embedlyKey',                                                                        // 27
  propertySchema: {                                                                                  // 28
    type: String,                                                                                    // 29
    optional: true,                                                                                  // 30
    autoform: {                                                                                      // 31
      group: 'embedly'                                                                               // 32
    }                                                                                                // 33
  }                                                                                                  // 34
}                                                                                                    // 35
addToSettingsSchema.push(embedlyKeyProperty);                                                        // 36
///////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                   //
// packages/telescope-module-embedly/lib/server/get_embedly_data.js                                  //
//                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                     //
getEmbedlyData = function (url) {                                                                    // 1
  var data = {}                                                                                      // 2
  var extractBase = 'http://api.embed.ly/1/extract';                                                 // 3
  var embedlyKey = getSetting('embedlyKey');                                                         // 4
                                                                                                     // 5
  try {                                                                                              // 6
                                                                                                     // 7
    if(!embedlyKey)                                                                                  // 8
      throw new Error("Couldn't find an Embedly API key! Please add it to your Telescope settings.") // 9
                                                                                                     // 10
    var result = Meteor.http.get(extractBase, {                                                      // 11
      params: {                                                                                      // 12
        key: embedlyKey,                                                                             // 13
        url: url,                                                                                    // 14
        image_width: 200,                                                                            // 15
        image_height: 150,                                                                           // 16
        image_method: 'crop'                                                                         // 17
      }                                                                                              // 18
    });                                                                                              // 19
                                                                                                     // 20
    if(!result.data.images.length)                                                                   // 21
      throw new Error("Couldn't find an image!");                                                    // 22
                                                                                                     // 23
    data.thumbnailUrl = result.data.images[0].url;                                                   // 24
                                                                                                     // 25
    if(typeof result.data.media !== 'undefined')                                                     // 26
      data.media = result.data.media                                                                 // 27
                                                                                                     // 28
    return data;                                                                                     // 29
  } catch (error) {                                                                                  // 30
    console.log(error)                                                                               // 31
    return null;                                                                                     // 32
  }                                                                                                  // 33
}                                                                                                    // 34
                                                                                                     // 35
Meteor.methods({                                                                                     // 36
  testGetEmbedlyData: function (url) {                                                               // 37
    console.log(getEmbedlyData(url))                                                                 // 38
  },                                                                                                 // 39
  setThumbnail: function (post) {                                                                    // 40
    var set = {};                                                                                    // 41
    if(post.url){                                                                                    // 42
      var data = getEmbedlyData(post.url);                                                           // 43
      if(!!data && !!data.thumbnailUrl)                                                              // 44
        set.thumbnailUrl = data.thumbnailUrl;                                                        // 45
      if(!!data && !!data.media.html)                                                                // 46
        set.media = data.media                                                                       // 47
      console.log(set)                                                                               // 48
      Posts.update({_id: post._id}, {$set: set});                                                    // 49
    }                                                                                                // 50
  }                                                                                                  // 51
});                                                                                                  // 52
                                                                                                     // 53
var extendPost = function (post) {                                                                   // 54
  if(post.url){                                                                                      // 55
    var data = getEmbedlyData(post.url);                                                             // 56
    if(!!data && !!data.thumbnailUrl)                                                                // 57
      post.thumbnailUrl = data.thumbnailUrl;                                                         // 58
    if(!!data && !!data.media.html)                                                                  // 59
      post.media = data.media                                                                        // 60
  }                                                                                                  // 61
  return post;                                                                                       // 62
}                                                                                                    // 63
                                                                                                     // 64
postSubmitMethodCallbacks.push(extendPost);                                                          // 65
///////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);
