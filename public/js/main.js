//defaults
let timber_grade = "Rustic";
let tedge = "Live Edge";
let twood_color = "Clear Wax";
let leg_style = "Spider";
let frame_welded = "Welded";
let timber_thickness = "35mm";
let custom_table_size = "No";
let table_top_finish = "Wax Polish";

const base_url = "img/Table and Bench Parts/";
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

//defaults
let images = [
    base_url + 'LBL X Frame Welded Steel.png',
    base_url + 'LBT Rustic Live Edge Clear Wax.png', 
    base_url + 'TBL X Frame Welded Steel.png', 
    base_url + 'TBT Rustic Live Edge Clear Wax.png', 
    base_url + 'RBL X Frame Welded Steel.png', 
    base_url + 'RBT Rustic Live Edge Clear Wax.png', 
];

// Load all images
let loadedImages = [];
let imagesLoaded = 0;


$(document).ready(function(){
    $('input[type=radio][name=timber-grade]').change(function() {
        
        $('.timber-grade .selected').removeClass('selected');
        $(this).parent().parent().addClass('selected');
        timber_grade = $(this).val();
        loadImages();

        $('.timber-grade-selected').text(timber_grade=='Rustic'?'Rustic':'Wooden Planed');

        if( timber_grade == "Rustic" ){
            $('.timber-grade .blurb').hide();
            $('.timber-grade .blurb.rustic').show();
        }else{
            $('.timber-grade .blurb').hide();
            $('.timber-grade .blurb.smooth').show();
        }
        
    });

    //table edge
    $('input[type=radio][name=table-edge-style]').change(function() {
        $('.table-edge .selected').removeClass('selected');
        $(this).parent().parent().addClass('selected');
        tedge = $(this).val();
        loadImages();

        $('.table-edge-selected').text(tedge);
    });

    //timber thickness
    $('input[type=radio][name=timber-thickness]').change(function() {
        $('.timber-thickness .selected').removeClass('selected');
        $(this).parent().parent().addClass('selected');
        timber_thickness = $(this).val();

        $('.thickness-selected').text(timber_thickness);
        
        if(timber_thickness=='50mm (Chunky)'){
            $('.warning').hide();
        }else {
            $('.warning').show();
        }
    });

    //custom table size
    $('input[type=radio][name=table-size]').change(function() {
        $('.table-size .selected').removeClass('selected');
        $(this).parent().parent().addClass('selected');
        custom_table_size = $(this).val();

        $('.table-size-selected').text(custom_table_size);
        
        if(custom_table_size == 'Yes'){
            $('.custom-tbl_size-fields').show();
        }else {
            $('.custom-tbl_size-fields').hide();
        }
    });

    //table top finish
    $('input[type=radio][name=table-top-finish]').change(function() {
        $('.table-top-finish .selected').removeClass('selected');
        $(this).parent().parent().addClass('selected');
        table_top_finish = $(this).val();

        $('.table-top-finish-selected').text(table_top_finish);
        
        if( table_top_finish == "Wax Polish" ){
            $('.table-top-finish .blurb').hide();
            $('.table-top-finish .blurb.wax-polish').show();
        }else{
            $('.table-top-finish .blurb').hide();
            $('.table-top-finish .blurb.hard-wax-oil').show();
        }
    });

    //table wood color
    $('input[type=radio][name=table-wood-color]').change(function() {
        $('.wood-color .selected').removeClass('selected');
        $(this).parent().parent().addClass('selected');
        twood_color = $(this).val();

        $('.wood-color-selected').text(twood_color);

        let rusticFinishPath = `img/Material Swatches/Rustic Swatch - ${twood_color}.png`;
        let smoothFinishPath = `img/Material Swatches/Smooth Swatch - ${twood_color}.png`;
        let liveEdgePath = `img/Table Edge Previews/Live Edge - ${twood_color}.png`;
        let roundedEdgePath = `img/Table Edge Previews/Rounded Edge - ${twood_color}.png`;
        
        
        //update finish style and table edge preview images
        $('#rustic-finish').attr('src', rusticFinishPath);
        $('#rustic-finish').attr('alt', `Rustic Swatch - ${twood_color}`);
        $('#smooth-finish').attr('src', smoothFinishPath);
        $('#smooth-finish').attr('alt', `Smooth Swatch - ${twood_color}`);

        $('#live-edge').attr('src', liveEdgePath);
        $('#live-edge').attr('alt', `Live Edge - ${twood_color}`);
        $('#rounded-edge').attr('src', roundedEdgePath);
        $('#rounded-edge').attr('alt', `Rounded Edge - ${twood_color}`);

        loadImages();

        switch (twood_color) {
            case 'Clear Wax':
                $('.wood-color .blurb').hide();
                $('.wood-color .blurb.clear-wax').show();
                break;
            case 'Lime Wax':
                $('.wood-color .blurb').hide();
                $('.wood-color .blurb.lime-wax').show();
                break;
            case 'Grey Wash':
                $('.wood-color .blurb').hide();
                $('.wood-color .blurb.grey-wash').show();
                break;
            case 'Antique Oak':
                $('.wood-color .blurb').hide();
                $('.wood-color .blurb.antique-oak').show();
                break;
            case 'Forest':
                $('.wood-color .blurb').hide();
                $('.wood-color .blurb.forest').show();
                break;
            case 'Rugger Brown':
                $('.wood-color .blurb').hide();
                $('.wood-color .blurb.rugger-brown').show();
                break;
            case 'Jacobean':
                $('.wood-color .blurb').hide();
                $('.wood-color .blurb.jacobean').show();
                break;
        }
    });

    //leg style
    $('input[type=radio][name=leg-style]').change(function() {
        $('.leg-style .selected').removeClass('selected');
        $(this).parent().parent().addClass('selected');
        leg_style = $(this).val();
        loadImages();
    });

    //leg finish or leg color
    $('input[type=radio][name=frame-welded]').change(function() {
        $('.leg-weld .selected').removeClass('selected');
        $(this).parent().parent().addClass('selected');
        frame_welded = $(this).val();

        if(frame_welded != "Custom RAL"){
            loadImages();
            $('.leg-color-selected').text(frame_welded=='Unwelded'?'Black':'Raw Steel');
        }else {
            $('.leg-color-selected').text(frame_welded);
        }

        if( frame_welded == "Welded" ){
            $('.leg-weld .blurb').hide();
            $('.leg-weld .blurb.raw-steel').show();
        }else if( frame_welded == "Unwelded" ){
            $('.leg-weld .blurb').hide();
            $('.leg-weld .blurb.black').show();
        }else{
            $('.leg-weld .blurb').hide();
            $('.leg-weld .blurb.custom-ral').show();
        }
        
    });

    // Function to resize the canvas based on the device width
    function resizeCanvas() {

        if(window.innerWidth < 1024){
            canvas.width = 300; // Set canvas width to window width
            canvas.height = 225; // Set canvas height to window height
            // Redraw content on the canvas if necessary
            // For demonstration purposes, I'm just filling the canvas with a color
            // ctx.fillStyle = 'lightblue';
            // ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        
    }

    // Call the resizeCanvas function initially
    resizeCanvas();

    // Call the resizeCanvas function whenever the window is resized
    $(window).on('resize', resizeCanvas);
});

function get_filepath(){
    return timber_grade + " " + tedge + " " + twood_color + ".png";
}

function get_legs_filepath(){
    return leg_style + " Frame " + frame_welded + " Steel.png";
}

function updateImages(){
    //tops
    images[1] = base_url + "LBT " + get_filepath();
    images[3] = base_url + "TBT " + get_filepath();
    images[5] = base_url + "RBT " + get_filepath();

    //legs
    images[0] = base_url + "LBL " + get_legs_filepath();
    images[2] = base_url + "TBL " + get_legs_filepath(); 
    images[4] = base_url + "RBL " + get_legs_filepath();

    // console.log(images);
}

function loadImages() {

    loadedImages = [];
    imagesLoaded = 0;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    updateImages();

    for (let i = 0; i < images.length; i++) {
        let img = new Image();
        img.onload = img.onerror = function() {
            imagesLoaded++;
            if (imagesLoaded === images.length) {
                setTimeout(function() {
                    requestAnimationFrame(function() {
                        drawImages(loadedImages);
                    });
                }, 500); // Delay
            }
        };
        img.src = images[i];
        loadedImages.push(img);
    }
}

// Draw all images onto the canvas
function drawImages(images) {
    var index = 0;
    var drawNextImage = function() {
        if (index < images.length) {
            ctx.drawImage(images[index], 0, 0, canvas.width, canvas.height);
            index++;
            requestAnimationFrame(drawNextImage); // Continue drawing next image
        }
    };
    requestAnimationFrame(drawNextImage); // Start drawing images
}

window.onload = loadImages

// Function to resize the canvas based on the device width
function resizeCanvas() {

    if(window.innderWidth < 768){
        canvas.width = window.innerWidth; // Set canvas width to window width
        canvas.height = window.innerHeight; // Set canvas height to window height
        // Redraw content on the canvas if necessary
        // For demonstration purposes, I'm just filling the canvas with a color
        // ctx.fillStyle = 'lightblue';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

// Call the resizeCanvas function initially
resizeCanvas();

// Call the resizeCanvas function whenever the window is resized
window.addEventListener('resize', resizeCanvas);
