export default class Datas{
    constructor(){

    }

    adicionarDias(data: Date,dias: number){
        
        data.setDate(data.getDate() + dias);
        return data;
    }

    diferencaDias(data: Date){
    //    var Data = 

        var diff = data.getTime() - this.dataAtual().getTime();   
    
        var daydiff = diff / (1000 * 60 * 60 * 24);   
        return daydiff
    }


    dataAtual(){
        return new Date()
    }
}