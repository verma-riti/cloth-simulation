

$(function(){

	$(document).bind("contextmenu",function(e){
	
		return true;
	});

	$( "#tabs" ).tabs();

	
	$("#left").toggle();


	var $container = $("#container"),
		width = $container.width(),
		height = $container.height();

	var position = $container.position(),
		left = position.left,
		bottom = position.top + height;

	var numPoints = 0,
		webGL = true;

	if (Detector.webgl){
		numPoints = 20;
	}
	else {
		$("#canvasMode").toggle();
		numPoints = 10;
		webGL = false;
	}

	var sim = new ClothSim("#container", width, height, left, bottom),
		damping = 0.02,
		stepSize = 0.1,
		cloth = new Cloth(numPoints, damping, stepSize);

	sliderInit(cloth);

	sim.cameraInit(45, 0.2, 6500);
	sim.renderInit(webGL);
	sim.eventListeners();

	cloth.createPoints(left, bottom);
	cloth.createTriangles();

	sim.addCloth(cloth);
	sim.animate();

	$(window).resize(function() {
		position = $container.position();
		left = position.left;
		bottom = position.top + height;

		sim.updateSize(left, bottom, $container.width(), $container.height());

	});

	$("#redraw").click(function(){
		sim.redraw(numPoints);
	});

	var $dimensions = $("#dimensions");
	$("#up").click(function(){
		numPoints++;
		$dimensions.html("[" + numPoints + "," + numPoints + "]");
	});

	$("#down").click(function(){
		if(numPoints > 1) {
			numPoints--;
			$dimensions.html("[" + numPoints + "," + numPoints + "]");
		}
	});

});


function sliderInit(cloth){
	var $gravSlider = $("#gravSlider"),
		$iterSlider = $("#iterSlider"),
		$pointSlider = $("#pointSlider"),
		$xSlider = $("#xSlider"),
		$ySlider = $("#ySlider"),
		$zSlider = $("#zSlider");

	$gravSlider.slider({
		orientation: "vertical",
		range:"min",
		min: -60,
		max: 60,
		value: -10,
		slide: function(event, ui){
			cloth.updateGravity(ui.value);
		}
	});

	$iterSlider.slider({
		orientation: "vertical",
		range:"min",
		min: 1,
		max: 30,
		value: 15,
		slide: function(event, ui){
			cloth.updateIter(ui.value);
		}
	});

	$xSlider.slider({
		orientation: "vertical",
		range:"min",
		min: -20,
		max: 20,
		value: 5,
		slide: function(event, ui){
			cloth.updateWind(ui.value, null, null);
		}
	});

	$ySlider.slider({
		orientation: "vertical",
		range:"min",
		min: -20,
		max: 20,
		value: 0,
		slide: function(event, ui){
			cloth.updateWind(null, ui.value, null);
		}
	});

	$zSlider.slider({
		orientation: "vertical",
		range:"min",
		min: -20,
		max: 20,
		value: 1,
		slide: function(event, ui){
			cloth.updateWind(null, null, ui.value);
		}
	});

}
