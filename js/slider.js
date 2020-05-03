var formatDate = d3.timeFormat("%Y");

console.log("slider")
var startDate = new Date("1920-04-01"),
    endDate = new Date("2030-01-01");

var margin = {top:0, right:25, bottom:0, left:25},
    width = 480 -margin.left - margin.right,
    height = 150 - margin.top - margin.bottom;

var svg = d3.select(".slider")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height);

var x = d3.scaleTime()
    .domain([startDate, endDate])
    .range([0, width])
    .nice();

var slider = svg.append("g")
    .attr("class", "slider")
    .attr("transform", "translate(" + margin.left + ",50)");

slider.append("line")
    .attr("class", "track")
    .attr("x1", x.range()[0])
    .attr("x2", x.range()[1])
    .attr("stroke", "#000")
    .attr("stroke-opacity", 0.05)
    .attr("stroke-width", "8px")
  .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
    .attr("class", "track-inset")
  .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
    .attr("class", "track-overlay")
    .call(d3.drag()
        .on("start.interrupt", function() { slider.interrupt(); })
        .on("start drag", function() {
          update(x.invert(d3.event.x));
         }));

console.log(x.ticks())


slider.insert("g", ".track-overlay")
    .attr("class", "ticks")
    .attr("transform", "translate(0," + 18 + ")")
  .selectAll("text")
    .data(x.ticks(13))
    .enter()
    .append("text")
    .attr("x", x)
    .attr("y", 10)
    .attr("text-anchor", "middle")
    .text(function(d) {
        console.log(d);
        if (formatDate(d)==="2030") {return "Future";}
        else {return formatDate(d);} })
        .attr("font-family", "sans-serif")
        .attr("font-size", "12px")
        .attr("fill", "#ff6666");

// var label = slider.append("text")
//     .attr("class", "label")
//     .attr("text-anchor", "middle")
//     .text(formatDate(startDate))
//     .attr("transform", "translate(0," + (-25) + ")")

var handle = slider.insert("circle", ".track-overlay")
    .attr("class", "handle")
    .attr("r", 6)
    .style("fill", "#ff6666");

function update(h) {
  handle.attr("cx", x(h));
  // label
  //   .attr("x", x(h))
  //   .text(formatDate(h));

  showPic(h);
}

function showPic(h) {
  $(".caption").empty();

  var index = Math.ceil(h.getYear()/5) - 4

  if (index < 0) {index = 0;}
  else if (index===20) {index = 19;}

  console.log(index)

  if (index >= 21 ) {
    $("#confetti").show();
    $("#future").show();

      $('html, body').addClass("fixed");

  } else {

    var filter = "*[data-order=\""+String(index) + "\"]"
  	var current = $(filter).data().order;
    console.log(current);

  	var leftdif = ((current/20)*145)/current;
  	var rightdif = (145-((current/20)*145))/(19-current);
  	var wid = 70-(145-70)/20;

  	$(".item").css({"width": "70px", "-webkit-transform": "translate(0,0)"})
  	$(filter).css({"width": "215px",  "-webkit-transform": "translate(-"+(current/20)*145+"px,0)"});
  	$(filter).prevAll(".item").each(function() {$( this ).css({"width": wid+"px", "-webkit-transform": "translate(-"+$(this).data().order*leftdif+"px,0)"});});
  	$(filter).nextAll(".item").each(function() {$( this ).css({"width": wid+"px", "-webkit-transform": "translate("+(20-$(this).data().order)*rightdif+"px,0)"});});

    $('<p style="color:'+colors[Math.floor((index % 10) /2)]+';">'+(1920+Math.floor(index/2)*10)+'</p>').appendTo('.caption');
    $(".caption").css({"left": index*70+"px","width": "215px",  "height": "50px", "-webkit-transform": "translate(-"+(index/20)*145+"px,0)"})
  }

}
