const PackageCard = require('../../ui/settings_tab/package_card.js').PackageCard;

class InstallPanel{

  constructor(){
    this.searchEntry = '.search-container atom-text-editor';
    this.packagesButton = '//button[text() = "Packages"]';
    this.packageCards = 'div.package-card';
  }

  searchPackage(term){
    let page = this;
    let results = [];
    return new Promise(function(resolve, reject){
      app.client.element(page.searchEntry).keys(term).then(function(){
        app.client.element(page.packagesButton).click().then(function(){
          app.client.waitForVisible(page.packageCards, 20000).then(function(){
            app.client.elements(page.packageCards).then(function(packageCardElements){
              let count = packageCardElements.value.length;
              packageCardElements.value.forEach(function(packageCardElement){
                count--;
                results.push(new PackageCard(packageCardElement.ELEMENT));
                if(count == 0){
                  resolve(results);
                }
              });
            });
          });
        });
      });
    });
  }

  packageResultsAreDisplayed(){
    return app.client.elementIdDisplayed(this.packageCards);
  }

  // packageResults(){
  //   let page = this;
  //   let results = [];
  //   return new Promise(function(resolve, reject){
  //     app.client.elements(page.packageCards).then(function(packageCards){
  //       let count = 0;
  //       packageCards.value.forEach(function(packageCardElement){
  //         count++;
  //         results.push(new PackageCard(packageCardElement));
  //         if(count == 5){
  //           resolve(results);
  //         }
  //       });
  //     });
  //   });
  // }
}

exports.InstallPanel = InstallPanel;