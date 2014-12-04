<<<<<<< HEAD
Template[getTemplate('post_submit')].helpers({
  categoriesEnabled: function(){
    return Categories.find().count();
  },
  categories: function(){
    return Categories.find();
  },
  users: function(){
    return Meteor.users.find({}, {sort: {'profile.name': 1}});
  },
  userName: function(){
    return getDisplayName(this);
  },
  isSelected: function(user){
    return user._id == Meteor.userId() ? "selected" : "";
  },
  showPostedAt: function () {
    if(Session.get('currentPostStatus') == STATUS_APPROVED){
      return 'visible'
    }else{
      return 'hidden'
    }
    // return (Session.get('currentPostStatus') || STATUS_APPROVED) == STATUS_APPROVED; // default to approved
  }
});

Template[getTemplate('post_submit')].rendered = function(){
  // run all post submit rendered callbacks
  var instance = this;
  postSubmitRenderedCallbacks.forEach(function(callback) {
    callback(instance);
  });

  Session.set('currentPostStatus', STATUS_APPROVED);
  Session.set('selectedPostId', null);
  if(!this.editor && $('#editor').exists())
    this.editor= new EpicEditor(EpicEditorOptions).load();

  $('#postedAtDate').datepicker();

  // $("#postUser").selectToAutocomplete(); // XXX
  var urlParams;
  (window.onpopstate = function () {
      var match,
          pl     = /\+/g,  // Regex for replacing addition symbol with a space
          search = /([^&=]+)=?([^&]*)/g,
          decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
          query  = window.location.search.substring(1);

      urlParams = {};
      while (match = search.exec(query))
         urlParams[decode(match[1])] = decode(match[2]);
  })();
  $('#url').val(urlParams["url"]);
  $('#title').val(urlParams["title"]);
};


Template[getTemplate('post_submit')].events({
  'change input[name=status]': function (e, i) {
    Session.set('currentPostStatus', e.currentTarget.value);
  },
  'click input[type=submit]': function(e, instance){
    e.preventDefault();

    $(e.target).addClass('disabled');

    // ------------------------------ Checks ------------------------------ //

    if(!Meteor.user()){
      throwError(i18n.t('You must be logged in.'));
      return false;
    }

    // ------------------------------ Properties ------------------------------ //

    // Basic Properties
=======
AutoForm.hooks({
  submitPostForm: {
    onSubmit: function(insertDoc, updateDoc, currentDoc) {
>>>>>>> 1bd798fad130c5ffa2ccf38209dea5a7bf7b11e0

      var properties = insertDoc;
      var submit = this;

      // ------------------------------ Checks ------------------------------ //

      if (!Meteor.user()) {
        throwError(i18n.t('you_must_be_logged_in'));
        return false;
      }

      // ------------------------------ Callbacks ------------------------------ //

      // run all post submit client callbacks on properties object successively
      properties = postSubmitClientCallbacks.reduce(function(result, currentFunction) {
          return currentFunction(result);
      }, properties);

      // console.log(properties)

      // ------------------------------ Insert ------------------------------ //
      Meteor.call('submitPost', properties, function(error, post) {
        if(error){
          submit.done(error);
        }else{
          // note: find a way to do this in onSuccess instead?
          trackEvent("new post", {'postId': post._id});
          if (post.status === STATUS_PENDING) {
            throwError('Thanks, your post is awaiting approval.');
          }
          Router.go('post_page', {_id: post._id});
          submit.done();
        }
      });

      return false
    },

    onSuccess: function(operation, result, template) {
      // not used right now because I can't find a way to pass the "post" object to this callback
      // console.log(post)
      // trackEvent("new post", {'postId': post._id});
      // if(post.status === STATUS_PENDING)
      //   throwError('Thanks, your post is awaiting approval.');
      // Router.go('/posts/'+post._id);
    },

    onError: function(operation, error, template) {
      throwError(error.reason.split('|')[0]); // workaround because error.details returns undefined
      clearSeenErrors();
      // $(e.target).removeClass('disabled');
      if (error.error == 603) {
        var dupePostId = error.reason.split('|')[1];
        Router.go('/posts/'+dupePostId);
      }
    }

    // Called at the beginning and end of submission, respectively.
    // This is the place to disable/enable buttons or the form,
    // show/hide a "Please wait" message, etc. If these hooks are
    // not defined, then by default the submit button is disabled
    // during submission.
    // beginSubmit: function(formId, template) {},
    // endSubmit: function(formId, template) {}
  }
});