const WelcomeGuideTab = require('../ui/welcome_guide_tab.js').WelcomeGuideTab;

class LandingPage{

  constructor(){
    this.tabs = 'li.tab';
    this.tabCloseIcon = 'div.close-icon';
  }

  closeTab(tabName){
    let page = this;
    return new Promise(function(resolve, reject){
      app.client.elements(page.tabs).then(function(elements){
        elements.value.forEach(function(element){
          app.client.elementIdText(element.ELEMENT).then(function(response){
            if(response.value == tabName){
              app.client.elementIdElement(element.ELEMENT, page.tabCloseIcon).then(function(closeIcon){
                app.client.elementIdClick(closeIcon.value.ELEMENT).then(function(){
                  resolve(page);
                });
              });
            }
          });
        });
      });
    });
  }

  selectTab(tabName){
    let page = this;
    return new Promise(function(resolve, reject){
      app.client.elements(page.tabs).then(function(elements){
        elements.value.forEach(function(element){
          app.client.elementIdText(element.ELEMENT).then(function(response){
            if(response.value == tabName){
              app.client.elementIdClick(element.ELEMENT).then(function(){
                if(tabName == 'Welcome Guide'){
                  resolve(new WelcomeGuideTab());
                }
              });
            }
          });
        });
      });
    });
  }

}
exports.LandingPage = LandingPage;