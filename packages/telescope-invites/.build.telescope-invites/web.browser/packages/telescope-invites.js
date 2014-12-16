(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/telescope-invites/package-i18n.js                                                                       //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
TAPi18n.packages["telescope-invites"] = {"translation_function_name":"__","helper_name":"_","namespace":"project"}; // 1
                                                                                                                    // 2
// define package's translation function (proxy to the i18next)                                                     // 3
__ = TAPi18n._getPackageI18nextProxy("project");                                                                    // 4
// define the package's templates registrar                                                                         // 5
registerI18nTemplate = TAPi18n._getRegisterHelpersProxy("telescope-invites");                                       // 6
registerTemplate = registerI18nTemplate; // XXX OBSOLETE, kept for backward compatibility will be removed in the future
                                                                                                                    // 8
// Record the list of templates prior to package load                                                               // 9
var _ = Package.underscore._;                                                                                       // 10
non_package_templates = _.keys(Template);                                                                           // 11
                                                                                                                    // 12
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/telescope-invites/lib/invites.js                                                                        //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
InviteSchema = new SimpleSchema({                                                                                   // 1
  _id: {                                                                                                            // 2
    type: String,                                                                                                   // 3
    optional: true                                                                                                  // 4
  },                                                                                                                // 5
  invitingUserId: {                                                                                                 // 6
    type: String,                                                                                                   // 7
    optional: true                                                                                                  // 8
  },                                                                                                                // 9
  invitedUserEmail: {                                                                                               // 10
    type: String,                                                                                                   // 11
    regEx: SimpleSchema.RegEx.Email                                                                                 // 12
  },                                                                                                                // 13
  accepted: {                                                                                                       // 14
    type: Boolean,                                                                                                  // 15
    optional: true                                                                                                  // 16
  }                                                                                                                 // 17
});                                                                                                                 // 18
                                                                                                                    // 19
Invites = new Meteor.Collection("invites");                                                                         // 20
Invites.attachSchema(InviteSchema);                                                                                 // 21
                                                                                                                    // 22
// invites are managed through Meteor method                                                                        // 23
                                                                                                                    // 24
Invites.deny({                                                                                                      // 25
  insert: function(){ return true; },                                                                               // 26
  update: function(){ return true; },                                                                               // 27
  remove: function(){ return true; }                                                                                // 28
});                                                                                                                 // 29
                                                                                                                    // 30
userProfileEdit.push({                                                                                              // 31
  template: 'userInvites',                                                                                          // 32
  order: 2                                                                                                          // 33
});                                                                                                                 // 34
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/telescope-invites/lib/client/templates/template.user_invites.js                                         //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
                                                                                                                    // 1
Template.__checkName("userInvites");                                                                                // 2
Template["userInvites"] = new Template("Template.userInvites", (function() {                                        // 3
  var view = this;                                                                                                  // 4
  return HTML.DIV({                                                                                                 // 5
    "class": "grid-small grid-block dialog admin"                                                                   // 6
  }, HTML.Raw("\n    <h2>Invites</h2>\n    \n    "), Blaze.If(function() {                                          // 7
    return Spacebars.call(view.lookup("canCurrentUserInvite"));                                                     // 8
  }, function() {                                                                                                   // 9
    return [ "\n      ", Blaze._TemplateWith(function() {                                                           // 10
      return {                                                                                                      // 11
        schema: Spacebars.call(view.lookup("invitesSchema")),                                                       // 12
        id: Spacebars.call("inviteForm"),                                                                           // 13
        "class": Spacebars.call("form-block"),                                                                      // 14
        type: Spacebars.call("method"),                                                                             // 15
        meteormethod: Spacebars.call("inviteUser")                                                                  // 16
      };                                                                                                            // 17
    }, function() {                                                                                                 // 18
      return Spacebars.include(view.lookupTemplate("autoForm"), function() {                                        // 19
        return [ "\n        ", HTML.H3("Invite someone"), "\n        ", HTML.DIV({                                  // 20
          "class": "control-group"                                                                                  // 21
        }, "\n          ", HTML.LABEL("Email"), "\n          ", HTML.DIV({                                          // 22
          "class": "controls"                                                                                       // 23
        }, "\n            ", Blaze._TemplateWith(function() {                                                       // 24
          return {                                                                                                  // 25
            name: Spacebars.call("invitedUserEmail")                                                                // 26
          };                                                                                                        // 27
        }, function() {                                                                                             // 28
          return Spacebars.include(view.lookupTemplate("afFieldInput"));                                            // 29
        }), "\n          "), "\n        "), "\n        ", HTML.DIV({                                                // 30
          "class": "form-actions"                                                                                   // 31
        }, "\n          ", Blaze.If(function() {                                                                    // 32
          return Spacebars.dataMustache(view.lookup("afFieldIsInvalid"), Spacebars.kw({                             // 33
            name: "invitedUserEmail"                                                                                // 34
          }));                                                                                                      // 35
        }, function() {                                                                                             // 36
          return "\n            This is not a valid email\n          ";                                             // 37
        }), "\n          ", HTML.INPUT({                                                                            // 38
          type: "submit",                                                                                           // 39
          "class": "button",                                                                                        // 40
          value: "Invite"                                                                                           // 41
        }), "\n        "), "\n      " ];                                                                            // 42
      });                                                                                                           // 43
    }), "\n    " ];                                                                                                 // 44
  }), "\n\n    ", HTML.TABLE("\n      ", HTML.THEAD("\n        ", HTML.TR("\n          ", HTML.TD("Email"), "\n          ", HTML.TD("Accepted"), "\n        "), "\n      "), "\n      ", HTML.TBODY("\n          ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("invites"));                                                                  // 46
  }, function() {                                                                                                   // 47
    return [ "\n          ", HTML.TR("\n            ", HTML.TD(Blaze.View(function() {                              // 48
      return Spacebars.mustache(view.lookup("invitedUserEmail"));                                                   // 49
    })), "\n            ", HTML.TD(Blaze.If(function() {                                                            // 50
      return Spacebars.call(view.lookup("accepted"));                                                               // 51
    }, function() {                                                                                                 // 52
      return HTML.I({                                                                                               // 53
        "class": "icon-check"                                                                                       // 54
      });                                                                                                           // 55
    })), "\n          "), "\n          " ];                                                                         // 56
  }), "\n      "), "\n    "), "\n\n  ");                                                                            // 57
}));                                                                                                                // 58
                                                                                                                    // 59
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/telescope-invites/lib/client/templates/user_invites.js                                                  //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
Template[getTemplate('userInvites')].created = function () {                                                        // 1
                                                                                                                    // 2
  var user = this.data;                                                                                             // 3
  var instance = this;                                                                                              // 4
                                                                                                                    // 5
  instance.invites = new ReactiveVar({});                                                                           // 6
                                                                                                                    // 7
  Meteor.autorun(function () {                                                                                      // 8
    coreSubscriptions.subscribe('invites', user._id);                                                               // 9
    var invites = Invites.find({invitingUserId: user._id});                                                         // 10
    instance.invites.set(invites);                                                                                  // 11
  });                                                                                                               // 12
};                                                                                                                  // 13
                                                                                                                    // 14
Template[getTemplate('userInvites')].helpers({                                                                      // 15
  canCurrentUserInvite: function () {                                                                               // 16
    var currentUser = Meteor.user();                                                                                // 17
    return currentUser && (currentUser.inviteCount > 0 && canInvite(currentUser));                                  // 18
  },                                                                                                                // 19
  invitesLeft: function () {                                                                                        // 20
    var currentUser = Meteor.user();                                                                                // 21
    return currentUser ? currentUser.inviteCount : 0;                                                               // 22
  },                                                                                                                // 23
  invitesSchema: function () {                                                                                      // 24
    // expose schema for Invites (used by AutoForm)                                                                 // 25
    return InviteSchema;                                                                                            // 26
  },                                                                                                                // 27
  invites: function () {                                                                                            // 28
    return Template.instance().invites.get();                                                                       // 29
  }                                                                                                                 // 30
});                                                                                                                 // 31
                                                                                                                    // 32
var scrollUp = function(){                                                                                          // 33
  Deps.afterFlush(function() {                                                                                      // 34
    var element = $('.grid > .error');                                                                              // 35
    $('html, body').animate({scrollTop: element.offset().top});                                                     // 36
  });                                                                                                               // 37
};                                                                                                                  // 38
                                                                                                                    // 39
AutoForm.hooks({                                                                                                    // 40
  inviteForm: {                                                                                                     // 41
    onSuccess: function(operation, result, template) {                                                              // 42
      clearSeenMessages();                                                                                          // 43
                                                                                                                    // 44
      if(result && result.newUser){                                                                                 // 45
        flashMessage('An invite has been sent out. Thank you!', "success");                                         // 46
      } else {                                                                                                      // 47
        flashMessage('Thank you!', "info");                                                                         // 48
      }                                                                                                             // 49
      scrollUp();                                                                                                   // 50
    },                                                                                                              // 51
                                                                                                                    // 52
    onError: function(operation, error, template) {                                                                 // 53
      clearSeenMessages();                                                                                          // 54
                                                                                                                    // 55
      if(error && error.reason){                                                                                    // 56
        flashMessage(error.reason, "error");                                                                        // 57
        scrollUp();                                                                                                 // 58
      }                                                                                                             // 59
    }                                                                                                               // 60
  }                                                                                                                 // 61
});                                                                                                                 // 62
                                                                                                                    // 63
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/telescope-invites/Users/grahammcbain/apto/Telescope/packages/telescope-invites/i18n/de.i18n.js          //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
var _ = Package.underscore._,                                                                                       // 1
    package_name = "telescope-invites",                                                                             // 2
    namespace = "telescope-invites";                                                                                // 3
                                                                                                                    // 4
if (package_name != "project") {                                                                                    // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                           // 6
}                                                                                                                   // 7
var package_templates = _.difference(_.keys(Template), non_package_templates);                                      // 8
                                                                                                                    // 9
for (var i = 0; i < package_templates.length; i++) {                                                                // 10
  var package_template = package_templates[i];                                                                      // 11
                                                                                                                    // 12
  registerI18nTemplate(package_template);                                                                           // 13
}                                                                                                                   // 14
                                                                                                                    // 15
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/telescope-invites/Users/grahammcbain/apto/Telescope/packages/telescope-invites/i18n/en.i18n.js          //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
var _ = Package.underscore._,                                                                                       // 1
    package_name = "telescope-invites",                                                                             // 2
    namespace = "telescope-invites";                                                                                // 3
                                                                                                                    // 4
if (package_name != "project") {                                                                                    // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                           // 6
}                                                                                                                   // 7
// integrate the fallback language translations                                                                     // 8
TAPi18n.addResourceBundle("en", namespace, {"translation_key":"translation string"});                               // 9
                                                                                                                    // 10
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/telescope-invites/Users/grahammcbain/apto/Telescope/packages/telescope-invites/i18n/es.i18n.js          //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
var _ = Package.underscore._,                                                                                       // 1
    package_name = "telescope-invites",                                                                             // 2
    namespace = "telescope-invites";                                                                                // 3
                                                                                                                    // 4
if (package_name != "project") {                                                                                    // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                           // 6
}                                                                                                                   // 7
                                                                                                                    // 8
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/telescope-invites/Users/grahammcbain/apto/Telescope/packages/telescope-invites/i18n/fr.i18n.js          //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
var _ = Package.underscore._,                                                                                       // 1
    package_name = "telescope-invites",                                                                             // 2
    namespace = "telescope-invites";                                                                                // 3
                                                                                                                    // 4
if (package_name != "project") {                                                                                    // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                           // 6
}                                                                                                                   // 7
                                                                                                                    // 8
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/telescope-invites/Users/grahammcbain/apto/Telescope/packages/telescope-invites/i18n/it.i18n.js          //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
var _ = Package.underscore._,                                                                                       // 1
    package_name = "telescope-invites",                                                                             // 2
    namespace = "telescope-invites";                                                                                // 3
                                                                                                                    // 4
if (package_name != "project") {                                                                                    // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                           // 6
}                                                                                                                   // 7
                                                                                                                    // 8
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/telescope-invites/Users/grahammcbain/apto/Telescope/packages/telescope-invites/i18n/zh-CN.i18n.js       //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
var _ = Package.underscore._,                                                                                       // 1
    package_name = "telescope-invites",                                                                             // 2
    namespace = "telescope-invites";                                                                                // 3
                                                                                                                    // 4
if (package_name != "project") {                                                                                    // 5
    namespace = TAPi18n.packages[package_name].namespace;                                                           // 6
}                                                                                                                   // 7
                                                                                                                    // 8
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);
