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
                                                                                                                       // 5
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
if(_.isUndefined(TAPi18n.translations["de"])) {                                                                        // 8
  TAPi18n.translations["de"] = {};                                                                                     // 9
}                                                                                                                      // 10
                                                                                                                       // 11
if(_.isUndefined(TAPi18n.translations["de"][namespace])) {                                                             // 12
  TAPi18n.translations["de"][namespace] = {};                                                                          // 13
}                                                                                                                      // 14
                                                                                                                       // 15
_.extend(TAPi18n.translations["de"][namespace], {"the_top_5_posts_of_each_day":"Die Top-5-Links eines jeden Tages.","previous_day":"Einen Tag zurück","next_day":"Einen Tag vor","sorry_no_posts_for_today":"Heute gibt es keine Links.","sorry_no_posts_for":"Keine Links für","today":"Heute","yesterday":"Gestern"});
                                                                                                                       // 17
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
if(_.isUndefined(TAPi18n.translations["es"])) {                                                                        // 8
  TAPi18n.translations["es"] = {};                                                                                     // 9
}                                                                                                                      // 10
                                                                                                                       // 11
if(_.isUndefined(TAPi18n.translations["es"][namespace])) {                                                             // 12
  TAPi18n.translations["es"][namespace] = {};                                                                          // 13
}                                                                                                                      // 14
                                                                                                                       // 15
_.extend(TAPi18n.translations["es"][namespace], {"the_top_5_posts_of_each_day":"Los 5 mejores posts de cada día","previous_day":"Dia anterior","next_day":"Dia siguiente","sorry_no_posts_for_today":"Lo sentimos, no hay post para hoy","today":"Hoy","yesterday":"Ayer"});
                                                                                                                       // 17
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
if(_.isUndefined(TAPi18n.translations["fr"])) {                                                                        // 8
  TAPi18n.translations["fr"] = {};                                                                                     // 9
}                                                                                                                      // 10
                                                                                                                       // 11
if(_.isUndefined(TAPi18n.translations["fr"][namespace])) {                                                             // 12
  TAPi18n.translations["fr"][namespace] = {};                                                                          // 13
}                                                                                                                      // 14
                                                                                                                       // 15
_.extend(TAPi18n.translations["fr"][namespace], {"the_top_5_posts_of_each_day":"5 meilleurs post par jours","previous_day":"Jour précédent","next_day":"Jour suivant","sorry_no_posts_for_today":"Désolé, aucun post aujourd'hui","sorry_no_posts_for":"Désolé, aucun post pour","today":"Aujourd'hui","yesterday":"Hier"});
                                                                                                                       // 17
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
if(_.isUndefined(TAPi18n.translations["it"])) {                                                                        // 8
  TAPi18n.translations["it"] = {};                                                                                     // 9
}                                                                                                                      // 10
                                                                                                                       // 11
if(_.isUndefined(TAPi18n.translations["it"][namespace])) {                                                             // 12
  TAPi18n.translations["it"][namespace] = {};                                                                          // 13
}                                                                                                                      // 14
                                                                                                                       // 15
_.extend(TAPi18n.translations["it"][namespace], {"the_top_5_posts_of_each_day":"I 5 migliori post di ogni giorno.","previous_day":"Giorno Precedente","next_day":"Giorno Successivo","sorry_no_posts_for_today":"Ci spiace, non ci sono post per oggi","sorry_no_posts_for":"Ci spiace, non ci sono post per","today":"Oggi","yesterday":"Ieri"});
                                                                                                                       // 17
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
if(_.isUndefined(TAPi18n.translations["tr"])) {                                                                        // 8
  TAPi18n.translations["tr"] = {};                                                                                     // 9
}                                                                                                                      // 10
                                                                                                                       // 11
if(_.isUndefined(TAPi18n.translations["tr"][namespace])) {                                                             // 12
  TAPi18n.translations["tr"][namespace] = {};                                                                          // 13
}                                                                                                                      // 14
                                                                                                                       // 15
_.extend(TAPi18n.translations["tr"][namespace], {"the_top_5_posts_of_each_day":"Her günün en üst 5 paylaşımı","previous_day":"Önceki gün","next_day":"Sonraki gün","Sorry, no posts for today":"Özür dileriz, bugün bir paylaşım yok","sorry_no_posts_for_today":"Özür dileriz, paylaşım yok","today":"Bugün","yesterday":"Dün"});
                                                                                                                       // 17
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
if(_.isUndefined(TAPi18n.translations["zh-CN"])) {                                                                     // 8
  TAPi18n.translations["zh-CN"] = {};                                                                                  // 9
}                                                                                                                      // 10
                                                                                                                       // 11
if(_.isUndefined(TAPi18n.translations["zh-CN"][namespace])) {                                                          // 12
  TAPi18n.translations["zh-CN"][namespace] = {};                                                                       // 13
}                                                                                                                      // 14
                                                                                                                       // 15
_.extend(TAPi18n.translations["zh-CN"][namespace], {"the_top_5_posts_of_each_day":"每天前5名的帖子","previous_day":"前一天","next_day":"后一天","sorry_no_posts_for_today":"抱歉今天没有新的帖子","today":"今天","yesterday":"昨天"});
                                                                                                                       // 17
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);
