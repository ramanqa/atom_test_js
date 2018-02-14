const LandingPage = require('../ui/landing_page').LandingPage;
const InstallPanel = require('../ui/settings_tab/install_panel.js').InstallPanel;

class WelcomeGuideTab{

  constructor(){
    this.cards = 'details.welcome-card';
    this.cardSummary = 'summary.welcome-summary';
    this.cardButton = 'button.btn-primary'
  }

  selectCard(cardName){
    let page = this;
    return new Promise(function(resolve, reject){
      app.client.elements(page.cards).then(function(cards){
        cards.value.forEach(function(card){
          app.client.elementIdElement(card.ELEMENT, page.cardSummary).then(function(cardSummary){
            app.client.elementIdText(cardSummary.value.ELEMENT).then(function(cardSummaryText){
              if(cardSummaryText.value == cardName){
                app.client.elementIdClick(cardSummary.value.ELEMENT).then(function(){
                  app.client.elementIdElement(card.ELEMENT, page.cardButton).then(function(cardButton){
                    app.client.elementIdClick(cardButton.value.ELEMENT).then(function(){
                      resolve(new InstallPanel());
                    });
                  })
                });
              }
            });
          });
        });
      });
    });
  }
}
exports.WelcomeGuideTab = WelcomeGuideTab;