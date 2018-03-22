$(function() {

//Define Variables
const submit = $("#submit");
const table = $("#pixel_canvas");
const input_height = $("#input_height");
const input_width = $("#input_width");
const reset = $("#reset");
const nogrid = $("#nogrid");
const saveimage = $("#save_image");
const download=$("#download");
const save=$("#save");

//hide buttons when load
saveimage.hide();
nogrid.hide();

// submit button
submit.click(function(e) {
e.preventDefault();
//remove previous table
table.children().remove();
makeGrid();
nogrid.show();
saveimage.show();


//  makeGrid()
function makeGrid() {

    let height = input_height.val();
    let width = input_width.val();

    for (let i = 0; i < height; i++) {
        let row = "<tr></tr>";
        table.append(row);

        for (let j = 0; j < width; j++) {
            let cell = "<td></td>";
            table.children().last().append(cell);
            $("td").css("background-color", "white");
        }
    }
}

//reset and make user able to download if reset is pressed
reset.click(function() {
table.children().remove();
nogrid.hide();
saveimage.hide();

});

//cell color

table.on("click", "td", function() {
    let colorpicker = $("#colorPicker");
    let color = colorpicker.val();
    $(this).css("background-color", color);
});

table.on("contextmenu", "td", function(e) {
    e.preventDefault();
    let colorpicker1 = $("#colorPicker1");
    let color1 = colorpicker1.val();
    $(this).css("background-color", color1);
});



//No Grid / Grid
nogrid.click(function () {
    $("td").toggleClass("border");
});

//Switch between capture and download button
function Switch(){
saveimage.toggleClass("visibility");
download.toggleClass("visibility");
}

//download image
saveimage.click(function(){
	
Switch();
//store image(important html2canvs don't deal with jQuery)
html2canvas(document.querySelector("#pixel_canvas")).then(canvas => {
document.body.appendChild(canvas); 
canvas.style.display = "none";
var photo=canvas.toDataURL("image/png");
document.querySelector("#save").setAttribute("href", photo);

});
});

//download then switch to save
download.click(function(){
Switch();
});

//Swich download to save if it was visible
if (download.css("visibility") == "visible") {
        Switch();
    } 

});



})