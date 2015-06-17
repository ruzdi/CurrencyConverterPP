var ServerConfig = function(){

    this.serverIP = '127.0.0.1';
    this.serverPort = 3000;


    this.getServerIP = function(){
        return this.serverIP;
    };

    this.setServerIP = function(ip){
        this.serverIP = ip;
    };


    this.getServerPort = function(){
        return this.serverPort;
    };


    this.setServerPort = function(port){
        this.serverPort = port;
    };

    this.getServerAddress = function(){
        return "http://"+this.getServerIP()+":"+this.getServerPort()+"/";
    };
};

exports.ServerConfig = ServerConfig;