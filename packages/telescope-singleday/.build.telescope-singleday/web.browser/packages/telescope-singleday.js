(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/telescope-singleday/package-i18n.js                                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
TAPi18n.packages["telescope-singleday"] = {"translation_function_name":"__","helper_name":"_","namespace":"project"};  // 1
                                                                                                                       // 2
// define package's translation function (proxy to the i18next)                                                        // 3
__ = TAPi18n._getPackageI18nextProxy("project");                                                                       // 4
// define the package's templates registrar                                                                            // 5
registerI18nTemplate = TAPi18n._getRegisterHelpersProxy("telescope-singleday");                                        // 6
registerTemplate = registerI18nTemplate; // XXX OBSOLETE, kept for backward compatibility will be removed in the future
                                                                                                                       // 8
// Record the list of templates prior to package load                                                                  // 9
var _ = Package.underscore._;                                                                                          // 10
non_package_templates = _.keys(Template);                                                                              // 11
                                                                                                                       // 12
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/telescope-singleday/lib/routes.js                                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
// Controller for post digest                                                                                          // 1
                                                                                                                       // 2
PostsDigestController = RouteController.extend({                                                                       // 3
  template: getTemplate('posts_digest'),                                                                               // 4
  waitOn: function() {                                                                                                 // 5
    // if day is set, use that. If not default to today                                                                // 6
    var currentDate = this.params.day ? new Date(this.params.year, this.params.month-1, this.params.day) : new Date(), // 7
        terms = {                                                                                                      // 8
          view: 'digest',                                                                                              // 9
          after: moment(currentDate).startOf('day').toDate(),                                                          // 10
          before: moment(currentDate).endOf('day').toDate()                                                            // 11
        };                                                                                                             // 12
    return [                                                                                                           // 13
      coreSubscriptions.subscribe('postsList', terms),                                                                 // 14
      coreSubscriptions.subscribe('postsListUsers', terms)                                                             // 15
    ];                                                                                                                 // 16
  },                                                                                                                   // 17
  data: function() {                                                                                                   // 18
    var currentDate = this.params.day ? new Date(this.params.year, this.params.month-1, this.params.day) : Session.get('today'),
        terms = {                                                                                                      // 20
          view: 'digest',                                                                                              // 21
          after: moment(currentDate).startOf('day').toDate(),                                                          // 22
          before: moment(currentDate).endOf('day').toDate()                                                            // 23
        },                                                                                                             // 24
        parameters = getPostsParameters(terms);                                                                        // 25
    Session.set('currentDate', currentDate);                                                                           // 26
                                                                                                                       // 27
    parameters.find.createdAt = { $lte: Session.get('listPopulatedAt') };                                              // 28
    var posts = Posts.find(parameters.find, parameters.options);                                                       // 29
                                                                                                                       // 30
    // Incoming posts                                                                                                  // 31
    parameters.find.createdAt = { $gt: Session.get('listPopulatedAt') };                                               // 32
    var postsIncoming = Posts.find(parameters.find, parameters.options);                                               // 33
                                                                                                                       // 34
    return {                                                                                                           // 35
      incoming: postsIncoming,                                                                                         // 36
      posts: posts                                                                                                     // 37
    };                                                                                                                 // 38
  },                                                                                                                   // 39
  fastRender: true                                                                                                     // 40
});                                                                                                                    // 41
                                                                                                                       // 42
Meteor.startup(function () {                                                                                           // 43
                                                                                                                       // 44
  // Digest                                                                                                            // 45
                                                                                                                       // 46
  Router.route('/digest/:year/:month/:day', {                                                                          // 47
    name: 'posts_digest',                                                                                              // 48
    controller: PostsDigestController                                                                                  // 49
  });                                                                                                                  // 50
                                                                                                                       // 51
  Router.route('/digest', {                                                                                            // 52
    name: 'posts_digest_default',                                                                                      // 53
    controller: PostsDigestController                                                                                  // 54
  });                                                                                                                  // 55
                                                                                                                       // 56
});                                                                                                                    // 57
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/telescope-singleday/lib/singleday.js                                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
viewNav.push({                                                                                                         // 1
  route: 'posts_digest_default',                                                                                       // 2
  label: 'digest'                                                                                                      // 3
});                                                                                                                    // 4
                                                                                                                       // 5
viewParameters.digest = function (terms) {                                                                             // 6
  return {                                                                                                             // 7
    find: {                                                                                                            // 8
      postedAt: {                                                                                                      // 9
        $gte: terms.after,                                                                                             // 10
        $lt: terms.before                                                                                              // 11
      }                                                                                                                // 12
    },                                                                                                                 // 13
    options: {                                                                                                         // 14
      sort: {sticky: -1, baseScore: -1, limit: 0}                                                                      // 15
    }                                                                                                                  // 16
  };                                                                                                                   // 17
}                                                                                                                      // 18
                                                                                                                       // 19
getDigestURL = function(moment){                                                                                       // 20
  return Router.routes['posts_digest'].path({                                                                          // 21
    year: moment.year(),                                                                                               // 22
    month: moment.month() + 1,                                                                                         // 23
    day: moment.date()                                                                                                 // 24
  });                                                                                                                  // 25
};                                                                                                                     // 26
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/telescope-singleday/lib/client/templates/template.posts_digest.js                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("posts_digest");                                                                                  // 2
Template["posts_digest"] = new Template("Template.posts_digest", (function() {                                         // 3
  var view = this;                                                                                                     // 4
  return [ HTML.DIV({                                                                                                  // 5
    "class": "grid"                                                                                                    // 6
  }, "\n    ", HTML.DIV({                                                                                              // 7
    "class": "grid-block"                                                                                              // 8
  }, "\n      ", Blaze.View(function() {                                                                               // 9
    return Spacebars.mustache(view.lookup("_"), "the_top_5_posts_of_each_day");                                        // 10
  }), " |\n    ", Blaze.If(function() {                                                                                // 11
    return Spacebars.call(view.lookup("showPreviousDate"));                                                            // 12
  }, function() {                                                                                                      // 13
    return [ "\n    ", HTML.A({                                                                                        // 14
      href: function() {                                                                                               // 15
        return Spacebars.mustache(view.lookup("previousDateURL"));                                                     // 16
      },                                                                                                               // 17
      "class": "prev-link"                                                                                             // 18
    }, Blaze.View(function() {                                                                                         // 19
      return Spacebars.mustache(view.lookup("_"), "previous_day");                                                     // 20
    })), " |\n    " ];                                                                                                 // 21
  }), "\n    ", Blaze.View(function() {                                                                                // 22
    return Spacebars.mustache(view.lookup("currentDate"));                                                             // 23
  }), " |\n    ", Blaze.If(function() {                                                                                // 24
    return Spacebars.call(view.lookup("showNextDate"));                                                                // 25
  }, function() {                                                                                                      // 26
    return [ "\n    ", HTML.A({                                                                                        // 27
      href: function() {                                                                                               // 28
        return Spacebars.mustache(view.lookup("nextDateURL"));                                                         // 29
      },                                                                                                               // 30
      "class": "next-link"                                                                                             // 31
    }, Blaze.View(function() {                                                                                         // 32
      return Spacebars.mustache(view.lookup("_"), "next_day");                                                         // 33
    })), "\n    " ];                                                                                                   // 34
  }), "\n    "), "\n  "), "\n\n  ", Blaze._TemplateWith(function() {                                                   // 35
    return {                                                                                                           // 36
      template: Spacebars.call(view.lookup("postsListIncoming")),                                                      // 37
      data: Spacebars.call(view.lookup("incoming"))                                                                    // 38
    };                                                                                                                 // 39
  }, function() {                                                                                                      // 40
    return Spacebars.include(function() {                                                                              // 41
      return Spacebars.call(Template.__dynamic);                                                                       // 42
    });                                                                                                                // 43
  }), "\n\n  ", Blaze.If(function() {                                                                                  // 44
    return Spacebars.call(view.lookup("hasPosts"));                                                                    // 45
  }, function() {                                                                                                      // 46
    return [ "\n    ", HTML.DIV({                                                                                      // 47
      "class": "posts grid list"                                                                                       // 48
    }, "\n      ", Blaze.Each(function() {                                                                             // 49
      return Spacebars.call(view.lookup("posts"));                                                                     // 50
    }, function() {                                                                                                    // 51
      return [ "\n        ", Blaze._TemplateWith(function() {                                                          // 52
        return {                                                                                                       // 53
          template: Spacebars.call(view.lookup("post_item"))                                                           // 54
        };                                                                                                             // 55
      }, function() {                                                                                                  // 56
        return Spacebars.include(function() {                                                                          // 57
          return Spacebars.call(Template.__dynamic);                                                                   // 58
        });                                                                                                            // 59
      }), "\n      " ];                                                                                                // 60
    }), "\n    "), "\n  " ];                                                                                           // 61
  }, function() {                                                                                                      // 62
    return [ "\n    ", HTML.DIV({                                                                                      // 63
      "class": "grid-small grid-block dialog"                                                                          // 64
    }, "\n      ", HTML.P(Blaze.View(function() {                                                                      // 65
      return Spacebars.mustache(view.lookup("_"), "sorry_no_posts_for");                                               // 66
    }), " ", Blaze.View(function() {                                                                                   // 67
      return Spacebars.mustache(view.lookup("currentDate"));                                                           // 68
    }), "."), "\n    "), "\n  " ];                                                                                     // 69
  }) ];                                                                                                                // 70
}));                                                                                                                   // 71
                                                                                                                       // 72
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/telescope-singleday/lib/client/templates/posts_digest.js                                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Meteor.startup(function () {                                                                                           // 1
                                                                                                                       // 2
  Template[getTemplate('posts_digest')].created = function(){                                                          // 3
    $(document).unbind('keyup'); //remove any potential existing bindings to avoid duplicates                          // 4
    var currentDate=moment(Session.get('currentDate')).startOf('day');                                                 // 5
    var today=moment(new Date()).startOf('day');                                                                       // 6
    $(document).bind('keyup', 'left', function(){                                                                      // 7
      Router.go($('.prev-link').attr('href'));                                                                         // 8
    });                                                                                                                // 9
    $(document).bind('keyup', 'right', function(){                                                                     // 10
      if(isAdmin(Meteor.user()) || today.diff(currentDate, 'days') > 0)                                                // 11
        Router.go($('.next-link').attr('href'));                                                                       // 12
    });                                                                                                                // 13
  };                                                                                                                   // 14
                                                                                                                       // 15
  Template[getTemplate('posts_digest')].helpers({                                                                      // 16
    post_item: function () {                                                                                           // 17
      return getTemplate('post_item');                                                                                 // 18
    },                                                                                                                 // 19
    postsListIncoming: function () {                                                                                   // 20
      return getTemplate('postsListIncoming');                                                                         // 21
    },                                                                                                                 // 22
    hasPosts: function(){                                                                                              // 23
      if(this.posts) // XXX                                                                                            // 24
        return !!this.posts.count();                                                                                   // 25
    },                                                                                                                 // 26
    currentDate: function(){                                                                                           // 27
      var currentDate=moment(Session.get('currentDate'));                                                              // 28
      var today=moment(new Date());                                                                                    // 29
      var diff=today.diff(currentDate, 'days');                                                                        // 30
      if(diff === 0)                                                                                                   // 31
        return i18n.t("today");                                                                                        // 32
      if(diff === 1)                                                                                                   // 33
        return i18n.t("yesterday");                                                                                    // 34
      return currentDate.format("dddd, MMMM Do YYYY");                                                                 // 35
    },                                                                                                                 // 36
    previousDateURL: function(){                                                                                       // 37
      var currentDate=moment(Session.get('currentDate'));                                                              // 38
      var newDate=currentDate.subtract(1, 'days');                                                                     // 39
      return getDigestURL(newDate);                                                                                    // 40
    },                                                                                                                 // 41
    showPreviousDate: function(){                                                                                      // 42
      // TODO                                                                                                          // 43
      return true;                                                                                                     // 44
    },                                                                                                                 // 45
    nextDateURL: function(){                                                                                           // 46
      var currentDate=moment(Session.get('currentDate'));                                                              // 47
      var newDate=currentDate.add('days', 1);                                                                          // 48
      return getDigestURL(newDate);                                                                                    // 49
    },                                                                                                                 // 50
    showNextDate: function(){                                                                                          // 51
      var currentDate=moment(Session.get('currentDate')).startOf('day');                                               // 52
      var today=moment(new Date()).startOf('day');                                                                     // 53
      return isAdmin(Meteor.user()) || (today.diff(currentDate, 'days') > 0)                                           // 54
    }                                                                                                                  // 55
  });                                                                                                                  // 56
                                                                                                                       // 57
  Template[getTemplate('posts_digest')].rendered = function(){                                                         // 58
    var distanceFromTop = 0;                                                                                           // 59
    $('.post').each(function(){                                                                                        // 60
      distanceFromTop += $(this).height();                                                                             // 61
    });                                                                                                                // 62
    distanceFromTop+=55;                                                                                               // 63
    Session.set('distanceFromTop', distanceFromTop);                                                                   // 64
    $('body').css('min-height',distanceFromTop+160);                                                                   // 65
    $('.more-button').css('top', distanceFromTop+"px");                                                                // 66
  }                                                                                                                    // 67
                                                                                                                       // 68
  Template[getTemplate('posts_digest')].created = function() {                                                         // 69
    Session.set('listPopulatedAt', new Date());                                                                        // 70
  };                                                                                                                   // 71
                                                                                                                       // 72
});                                                                                                                    // 73
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/telescope-singleday/Users/grahammcbain/apto/Telescope/packages/telescope-singleday/i18n/de.i18n.js         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _ = Package.underscore._,                                                                                          // 1
    package_name = "telescope-singleday",                                                                              // 2
    namespace = "telescope-singleday";                                                                                 // 3
                                                                                                                       // 4
if (package_name != "project") {                                                                                       // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                              // 6
}                                                                                                                      // 7
var package_templates = _.difference(_.keys(Template), non_package_templates);                                         // 8
                                                                                                                       // 9
for (var i = 0; i < package_templates.length; i++) {                                                                   // 10
  var package_template = package_templates[i];                                                                         // 11
                                                                                                                       // 12
  registerI18nTemplate(package_template);                                                                              // 13
}                                                                                                                      // 14
                                                                                                                       // 15
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/telescope-singleday/Users/grahammcbain/apto/Telescope/packages/telescope-singleday/i18n/en.i18n.js         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _ = Package.underscore._,                                                                                          // 1
    package_name = "telescope-singleday",                                                                              // 2
    namespace = "telescope-singleday";                                                                                 // 3
                                                                                                                       // 4
if (package_name != "project") {                                                                                       // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                              // 6
}                                                                                                                      // 7
// integrate the fallback language translations                                                                        // 8
TAPi18n.addResourceBundle("en", namespace, {"the_top_5_posts_of_each_day":"The top 5 posts of each day.","previous_day":"Previous Day","next_day":"Next Day","sorry_no_posts_for_today":"Sorry, no posts for today","sorry_no_posts_for":"Sorry, no posts for","today":"Today","yesterday":"Yesterday"});
                                                                                                                       // 10
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/telescope-singleday/Users/grahammcbain/apto/Telescope/packages/telescope-singleday/i18n/es.i18n.js         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _ = Package.underscore._,                                                                                          // 1
    package_name = "telescope-singleday",                                                                              // 2
    namespace = "telescope-singleday";                                                                                 // 3
                                                                                                                       // 4
if (package_name != "project") {                                                                                       // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                              // 6
}                                                                                                                      // 7
                                                                                                                       // 8
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/telescope-singleday/Users/grahammcbain/apto/Telescope/packages/telescope-singleday/i18n/fr.i18n.js         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _ = Package.underscore._,                                                                                          // 1
    package_name = "telescope-singleday",                                                                              // 2
    namespace = "telescope-singleday";                                                                                 // 3
                                                                                                                       // 4
if (package_name != "project") {                                                                                       // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                              // 6
}                                                                                                                      // 7
                                                                                                                       // 8
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/telescope-singleday/Users/grahammcbain/apto/Telescope/packages/telescope-singleday/i18n/it.i18n.js         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _ = Package.underscore._,                                                                                          // 1
    package_name = "telescope-singleday",                                                                              // 2
    namespace = "telescope-singleday";                                                                                 // 3
                                                                                                                       // 4
if (package_name != "project") {                                                                                       // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                              // 6
}                                                                                                                      // 7
                                                                                                                       // 8
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/telescope-singleday/Users/grahammcbain/apto/Telescope/packages/telescope-singleday/i18n/tr.i18n.js         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _ = Package.underscore._,                                                                                          // 1
    package_name = "telescope-singleday",                                                                              // 2
    namespace = "telescope-singleday";                                                                                 // 3
                                                                                                                       // 4
if (package_name != "project") {                                                                                       // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                              // 6
}                                                                                                                      // 7
                                                                                                                       // 8
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/telescope-singleday/Users/grahammcbain/apto/Telescope/packages/telescope-singleday/i18n/zh-CN.i18n.js      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _ = Package.underscore._,                                                                                          // 1
    package_name = "telescope-singleday",                                                                              // 2
    namespace = "telescope-singleday";                                                                                 // 3
                                                                                                                       // 4
if (package_name != "project") {                                                                                       // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                              // 6
}                                                                                                                      // 7
                                                                                                                       // 8
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);
