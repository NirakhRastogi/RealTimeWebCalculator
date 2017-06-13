import { Component } from '@angular/core';

@Component({
  selector: 'app-sideba',
  templateUrl: './sideba.component.html',
  styleUrls: ['./sideba.component.css']
})
export class SidebaComponent {

  query:String=null;
  mode:String="DEG";
  queryReplica: String = null;
  result:String=null;
  PiValue:String="180";
  HelpShow:Boolean=false;
  HelpText:String="Show";

  toggleMode(){
    if(this.mode=="RAD")
        this.mode="DEG";
      else
        this.mode="RAD";

      this.fireQuery();
  }

  toggleHelp(){
    if(this.HelpShow){
        this.HelpShow=false;
        this.HelpText="Show";
      }
      else{
        this.HelpShow=true;
        this.HelpText="Hide";
      }
    console.log(this.HelpShow);
  }

  togglePi(){
    if(this.PiValue=="180")
        this.PiValue="3.141592653589793238462643";
      else
        this.PiValue="180";

      this.fireQuery();
  }

   replaceAll(queryString:String,searchValue:string,replaceValue:string){
    for(var i=0;i<queryString.length/2 + 1;i++){
      queryString=queryString.replace(searchValue,replaceValue);
    }
    return queryString;
  }

  replaceOperatorToString(){
      this.queryReplica=this.replaceAll(this.query,"+","add");
      this.queryReplica=this.replaceAll(this.queryReplica,"-","sub");
      this.queryReplica=this.replaceAll(this.queryReplica,"**","pow");
      this.queryReplica=this.replaceAll(this.queryReplica,"*","mul");
      this.queryReplica=this.replaceAll(this.queryReplica,"/","div");
      this.queryReplica=this.replaceAll(this.queryReplica,"%","mod");
  }

  replaceStringToOpetator(){
      this.result=this.replaceAll(this.result,"add","+");
      this.result=this.replaceAll(this.result,"sub","-");
      this.result=this.replaceAll(this.result,"mul","*");
      this.result=this.replaceAll(this.result,"div","/");
      this.result=this.replaceAll(this.result,"mode","xxx");
      this.result=this.replaceAll(this.result,"mod","%");
      this.result=this.replaceAll(this.result,"pow","**");
      this.result=this.replaceAll(this.result,"xxx","mode");
      return this.result;
  }

  fireQuery(){
      let req = new XMLHttpRequest();
        this.replaceOperatorToString();
      if(this.queryReplica.length>0)
      {
        req.open("GET","http://localhost:8080/CalculatorWS/calculate/query/("+this.queryReplica+")"+"/("+this.mode+")"+"/("+this.PiValue+")");
        req.onreadystatechange = () =>{
          let raw=req.responseText;
          this.result = raw;
          this.result=this.replaceStringToOpetator();

          if(this.result == "Incorrect Script Error")
            this.result="Error"
          else
            this.result=this.replaceAll(this.result,"E","*10^");
        }
        req.send();
      }
  }
}
