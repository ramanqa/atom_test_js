class SettingsTab{

    constructor(panel){
        if(panel == "Install"){
            this.panel = new InstallPanel();
        }
    }
}

exports.SettingsTab = SettingsTab;