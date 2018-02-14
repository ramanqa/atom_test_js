class Tabs{
  constructor(){
    this.tabs = 'li.tab';
    this.tabCloseIcon = 'div.close-icon';
  }

  close(tabName){
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

  select(tabName){
    let page = this;
    app.client.elements(page.tabs).then(function(elements){
      elements.value.forEach(function(element){
        app.client.elementIdText(element.ELEMENT).then(function(response){
          if(response.value == tabName){
            return app.client.elementIdClick(element.ELEMENT)
          }
        });
      });
    });
  }
}

exports.Tabs = Tabs;