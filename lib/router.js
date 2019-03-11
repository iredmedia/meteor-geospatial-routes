FlowRouter.route('/', {
  name: 'trips',
  action: function () {
    BlazeLayout.render('defaultLayout', {content: 'trips'});
  }
});

