class PackageCard{
  
  constructor(cardElement){
    this.element = cardElement;
    this.packageTitle = 'h4.card-name a.package-name';
  }

  get packageName(){
    let page = this;
    return new Promise(function(resolve, reject){
      return app.client.elementIdElement(page.element, page.packageTitle).then(function(packageNameElement){
        return app.client.elementIdText(packageNameElement.value.ELEMENT).then(function(text){
          resolve(text.value);
        });
      });
    });
  }

}

exports.PackageCard = PackageCard;