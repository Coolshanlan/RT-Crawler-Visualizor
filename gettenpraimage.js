const request = require('request');
const download = require('download-file');
var datalist = [];
var d = new Date(Number(new Date())-24*60*60*1000);
var date = `${d.getFullYear()}${("0"+(d.getMonth()+1)).substr(-2)}${("0"+d.getDate()).substr(-2)}`;
//https://www.cwb.gov.tw/V7/observe/rainfall/hk.htm
//https://www.cwb.gov.tw/V7/js/rainD_grd1.js
var dataURL = "https://www.cwb.gov.tw/V7/js/temp.js";
request(dataURL, (e,r,d)=>{
  eval(d);
  var list = Object.keys(temp2);
  datalist = list.splice();
  downloadCallback(list);
});


function downloadCallback(list, name){
  if(list.length==0)
    return;
  console.log("------------");
  var url = "https://www.cwb.gov.tw/"+list.pop();
  // var d = new Date(Number(new Date())-24*60*60*1000);
  // var date = `${d.getFullYear()}${("0"+d.getMonth()).substr(-2)}${("0"+d.getDate()).substr(-2)}`;
  var file = url.split("/").pop();
  var options = {
    directory:`./images/${date}-t`,
    filename:file,
  }
  //console.log(file);
  download(url, options, (err)=>{
    if(err)
      list.push(url);
    console.log(file);
    console.log(`剩餘 ${list.length}`);
    return downloadCallback(list);
  });
}
