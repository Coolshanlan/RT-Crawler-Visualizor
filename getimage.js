const request = require('request');
const download = require('download-file');
var d = new Date(Number(new Date())-24*60*60*1000);
var date = `${d.getFullYear()}${("0"+(d.getMonth()+1)).substr(-2)}${("0"+d.getDate()).substr(-2)}`;
//https://www.cwb.gov.tw/V7/observe/rainfall/hk.htm
request("https://www.cwb.gov.tw/V7/js/rainD_grd1.js", (e,r,d)=>{
  eval(d);
  var list = Object.keys(Day2);
  //console.log(Object.keys(Day2));
  downloadCallback(list);
});


function downloadCallback(list){
  if(list.length==0)return;
  console.log("------------");
  var url = "https://www.cwb.gov.tw/"+list.pop();
  var d = new Date(Number(new Date())-24*60*60*1000);
  var file = url.split("/").pop();
  var options = {
    directory:`./images/${date}-r`,
    filename:file,
  }
  download(url, options, (err)=>{
    if(err)
      list.push(url);
    console.log(file);
    console.log(`剩餘 ${list.length}`);
    return downloadCallback(list);
  });
}
