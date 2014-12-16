(function () {

////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                            //
// packages/telescope-module-embedly/lib/embedly.js                                           //
//                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                              //
var thumbnailProperty = {                                                                     // 1
  propertyName: 'thumbnailUrl',                                                               // 2
  propertySchema: {                                                                           // 3
    type: String,                                                                             // 4
    optional: true                                                                            // 5
  }                                                                                           // 6
}                                                                                             // 7
addToPostSchema.push(thumbnailProperty);                                                      // 8
                                                                                              // 9
var mediaProperty = {                                                                         // 10
  propertyName: 'media',                                                                      // 11
  propertySchema: {                                                                           // 12
    type: Object,                                                                             // 13
    optional: true,                                                                           // 14
    blackbox: true                                                                            // 15
  }                                                                                           // 16
}                                                                                             // 17
addToPostSchema.push(mediaProperty);                                                          // 18
                                                                                              // 19
                                                                                              // 20
postModules.push({                                                                            // 21
  template: 'postThumbnail',                                                                  // 22
  position: 'center-left'                                                                     // 23
});                                                                                           // 24
                                                                                              // 25
var embedlyKeyProperty = {                                                                    // 26
  propertyName: 'embedlyKey',                                                                 // 27
  propertySchema: {                                                                           // 28
    type: String,                                                                             // 29
    optional: true,                                                                           // 30
    autoform: {                                                                               // 31
      group: 'embedly'                                                                        // 32
    }                                                                                         // 33
  }                                                                                           // 34
}                                                                                             // 35
addToSettingsSchema.push(embedlyKeyProperty);                                                 // 36
////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                            //
// packages/telescope-module-embedly/lib/client/template.post_thumbnail.js                    //
//                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                              //
                                                                                              // 1
Template.__checkName("postThumbnail");                                                        // 2
Template["postThumbnail"] = new Template("Template.postThumbnail", (function() {              // 3
  var view = this;                                                                            // 4
  return [ Blaze.If(function() {                                                              // 5
    return Spacebars.call(view.lookup("thumbnailUrl"));                                       // 6
  }, function() {                                                                             // 7
    return [ "\n    ", HTML.A({                                                               // 8
      "class": function() {                                                                   // 9
        return [ "post-thumbnail-link ", Spacebars.mustache(view.lookup("playVideoClass")) ]; // 10
      },                                                                                      // 11
      href: function() {                                                                      // 12
        return Spacebars.mustache(view.lookup("postLink"));                                   // 13
      },                                                                                      // 14
      target: "_blank"                                                                        // 15
    }, "\n      ", HTML.IMG({                                                                 // 16
      "class": "post-thumbnail-image",                                                        // 17
      src: function() {                                                                       // 18
        return Spacebars.mustache(view.lookup("thumbnailUrl"));                               // 19
      },                                                                                      // 20
      onerror: "this.style.display='none';"                                                   // 21
    }), "\n    "), "\n  " ];                                                                  // 22
  }), "\n  ", Blaze.If(function() {                                                           // 23
    return Spacebars.call(view.lookup("media"));                                              // 24
  }, function() {                                                                             // 25
    return [ "\n    ", Blaze._TemplateWith(function() {                                       // 26
      return {                                                                                // 27
        template: Spacebars.call(view.lookup("videoTemplate")),                               // 28
        data: Spacebars.call(view.lookup("."))                                                // 29
      };                                                                                      // 30
    }, function() {                                                                           // 31
      return Spacebars.include(function() {                                                   // 32
        return Spacebars.call(Template.__dynamic);                                            // 33
      });                                                                                     // 34
    }), "\n  " ];                                                                             // 35
  }) ];                                                                                       // 36
}));                                                                                          // 37
                                                                                              // 38
////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                            //
// packages/telescope-module-embedly/lib/client/post_thumbnail.js                             //
//                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                              //
Template[getTemplate('postThumbnail')].helpers({                                              // 1
  postLink: function () {                                                                     // 2
    return !!this.url ? getOutgoingUrl(this.url) : "/posts/"+this._id;                        // 3
  },                                                                                          // 4
  playVideoClass: function () {                                                               // 5
    return !!this.media ? 'post-thumbnail-has-video': '';                                     // 6
  },                                                                                          // 7
  videoTemplate: function () {                                                                // 8
    return getTemplate('postVideo');                                                          // 9
  }                                                                                           // 10
});                                                                                           // 11
                                                                                              // 12
Template[getTemplate('postThumbnail')].events({                                               // 13
  'click .post-thumbnail-has-video': function (e) {                                           // 14
    e.preventDefault();                                                                       // 15
    $('body').addClass('showing-lightbox');                                                   // 16
    $(e.target).parents('.post').find('.post-video-lightbox').fadeIn('fast');                 // 17
  }                                                                                           // 18
})                                                                                            // 19
////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                            //
// packages/telescope-module-embedly/lib/client/template.post_video.js                        //
//                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                              //
                                                                                              // 1
Template.__checkName("postVideo");                                                            // 2
Template["postVideo"] = new Template("Template.postVideo", (function() {                      // 3
  var view = this;                                                                            // 4
  return Spacebars.With(function() {                                                          // 5
    return Spacebars.call(view.lookup("media"));                                              // 6
  }, function() {                                                                             // 7
    return [ "\n    ", HTML.DIV({                                                             // 8
      "class": "post-video-lightbox hidden"                                                   // 9
    }, "\n      ", HTML.A({                                                                   // 10
      "class": "post-video-lightbox-hide",                                                    // 11
      href: "#"                                                                               // 12
    }, "×"), "\n      ", HTML.DIV({                                                           // 13
      "class": "post-video-lightbox-inner"                                                    // 14
    }, "\n        ", Blaze.View(function() {                                                  // 15
      return Spacebars.makeRaw(Spacebars.mustache(view.lookup("html")));                      // 16
    }), "\n      "), "\n    "), "\n  " ];                                                     // 17
  });                                                                                         // 18
}));                                                                                          // 19
                                                                                              // 20
////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                            //
// packages/telescope-module-embedly/lib/client/post_video.js                                 //
//                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                              //
Template[getTemplate('postVideo')].events({                                                   // 1
  'click .post-video-lightbox-hide, click .post-video-lightbox': function (e) {               // 2
    e.preventDefault();                                                                       // 3
    $(e.target).parents('.post').find('.post-video-lightbox').fadeOut('fast');                // 4
    $('body').removeClass('showing-lightbox');                                                // 5
  }                                                                                           // 6
})                                                                                            // 7
////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);
