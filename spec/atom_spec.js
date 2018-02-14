const Application = require('spectron').Application;
const path = require('path');
const rest = require('unirest');
const expect = require('chai').expect;
const LandingPage = require('../ui/landing_page.js').LandingPage;
const WelcomeGuideTab = require('../ui/welcome_guide_tab.js').WelcomeGuideTab;
const InstallPanel = require('../ui/settings_tab/install_panel.js').InstallPanel;
global.app = new Application({
    path: 'atom.app/atom',
  });

describe('Atom IDE', function(){
  this.timeout(60000);
  this.app = app;

  before(function (done) {
    app.start().then(function(){
      setTimeout(function(){
        app.browserWindow.maximize();
        done();  
      }, 5000);
    });
  });
  after(function (done) {
    if (app && app.isRunning()){
        app.stop();
        done();
    }
  });

  describe('search for packages to install', function(){
    before(function(done){
      let firstResultsInUi;
      new LandingPage()
        .selectTab('Welcome Guide').then(function(tab){
          tab.selectCard('Install a Package').then(function(panel){
            panel.searchPackage("capybara").then(function(packageCards){
              packageCards[0].packageName.then(function(text){
                this.firstResultsInUi = text;
                done();
              });
            });
          });
        });
    });

    it('displays a list of packages', function(){
      new InstallPanel().packageResultsAreDisplayed().then(function(isDisplayed){
        expect(isDisplayed).to.be.true;
      });
    });

    it('displays package list matching the entered search term', function(done){
      rest.get('https://atom.io/api/packages/search?q=capybara').end(function(response){
          expect(this.firstResultsInUi).to.be.equal(response.body[0].name);
          done();
        });
    });

  });

  
});