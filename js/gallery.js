$container1 = $(".one");

for(var i = 0; i < 20; i++){
  $img = $("<div>").addClass("item dress").attr("data-order", i);
  $img.addClass("color"+String(Math.floor(i/2)+1)).attr("data-color", "color"+String(Math.floor(i/2)+1));
  $container1.append($img);
}


var idx1 = 1;
$(".dress").each(function() {
    $(this).css({left: (idx1-1) * 70});
    $(this).css({"width": "70px", "-webkit-transform": "translate(0,0)"});
    $(this).css("background-image", "url("+"images/dresses/"+idx1+".png)");
    idx1++;
});


var colors = ["#eee3e7", "#ff9999", "#ff6666", "#e60000", "#990000"];

$(".item").on("mouseover",function(e) {
		var current = $(this).data().order;
		var leftdif = ((current/20)*145)/current;
		var rightdif = (145-((current/20)*145))/(19-current);
		var wid = 70-(145-70)/20;

		$(".item").css({"width": "70px", "-webkit-transform": "translate(0,0)"})
		$(this).css({"width": "215px",  "-webkit-transform": "translate(-"+(current/20)*145+"px,0)"});
		$(this).prevAll(".item").each(function() {$( this ).css({"width": wid+"px", "-webkit-transform": "translate(-"+$(this).data().order*leftdif+"px,0)"});});
		$(this).nextAll(".item").each(function() {$( this ).css({"width": wid+"px", "-webkit-transform": "translate("+(20-$(this).data().order)*rightdif+"px,0)"});});
		console.log(current);

    $('<p style="color:'+colors[Math.floor((current % 10) /2)]+';">'+(1920+Math.floor(current/2)*10)+'</p>').appendTo('.caption');
    $(".caption").css({"left": current*70+"px","width": "215px",  "height": "50px", "-webkit-transform": "translate(-"+(current/20)*145+"px,0)"})


});

$(".item").mouseout(function(e) {
	$(".item").css({"width": "70px", "-webkit-transform": "translate(0,0)"});
  $(".caption").empty();
});

$(".item").on("click", function(){
	var detail = "images/dresses/"+($(this).data().order+1)+".png";
	showModal(detail,$(this).data().order);
	console.log(detail);
})

var $data = [];

window.onload = function() { init() };

var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1lv1zN2sdFnHVO8OidUGrB2B_nAYpP_SFoRNCJQeSbNc/pubhtml';
//var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1v9tZABDsdIgZ28iCHM7x24ssXATw41bbx08-N0-PHKE/pubhtml';

function init() {
  Tabletop.init( { key: public_spreadsheet_url,
                   callback: showInfo,
                   simpleSheet: true } )
}

function showInfo(data, tabletop) {
  console.log(data);
  $data = data;
}

function showModal(detail,set) {


   $(".modal").empty();
   //left div
   var $img = $("<img>").attr("src",detail).addClass("detail");
   $img.attr("nopin","nopin");
   var $div = $("<div>");
   $div.append($img);


   //right section

   var $section = $('<div>').addClass("section");
   var $title = $('<div>').addClass("description");
   var $figure1 = $("<figure>");
   var $png1 = $("<img>").attr("src","images/items/"+set+"/1.jpg").addClass("png").attr('data-pin-hover', "true").css({width: '200px',heigth: '1000px'});
   var $figure2 = $("<figure>");
   var $png2 = $("<img>").attr("src","images/items/"+set+"/2.jpg").addClass("png").css({width: '170px',heigth: '1000px'})
   var $figure3 = $("<figure>");
   var $png3 = $("<img>").attr("src","images/items/"+set+"/3.jpg").addClass("png").css({width: '170px',heigth: '1000px'})


  //  console.log(set);
  //  switch (set) {
  //   case "color1":
  //       var i = 0;
  //       break;
  //   case "color2":
  //       var i = 1;
  //       break;
  //   case "color3":
  //       var i = 2;
  //       break;
  //   case "color4":
  //       var i = 3;
  //       break;
  //   case "color5":
  //       var i = 4;
  //       break;
	// }

   // var $text = $("<h4>").text($data[i].description);
   // var $caption1 = $("<figcaption>").html($data[i].cap1+"<br/><span>"+$data[i].by1+"</span>");
   // var $caption2 = $("<figcaption>").html($data[i].cap2+"<br/><span>"+$data[i].by2+"</span>");
   // var $caption3 = $("<figcaption>").html($data[i].cap3+"<br/><span>"+$data[i].by3+"</span>");



   // $title.append($text);
   $figure1.append($png1)//.append($caption1);
   $figure2.append($png2)//.append($caption2);
   $figure3.append($png3)//.append($caption3);



   var $li1 = $("<li>");
   var $li2 = $("<li>");
   var $li3 = $("<li>");

   $li1.append($figure1);
   $li2.append($figure2);
   $li3.append($figure3);


   var $ul = $("<ul>");
   $ul.append($li1).append($li2).append($li3);


   $section.append($title).append($ul);

   $(".modal").append($div).append($section);

   $(".overlay").show();
   $(".modal").show();

     $('html, body').addClass("fixed");

}

function hideModal() {

  $(".overlay").hide();
  $(".modal").hide();
}

$(".overlay").on("click",function(e) {
      hideModal();
      $('html, body').removeClass("fixed");
  });
