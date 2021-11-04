var filelist = new Array();

var content = document.getElementById('content');
var download = document.getElementById('download');

function updateList() {
    var input = document.getElementById('fileUploader');
    var isFirstFile = true;
    
    for (var i = 0; i < input.files.length; ++i) {
        //filelist[i] = input.files.item(i).name;
        /* filelist.push(input.files.item(i).value); */
        let f = input.files.item(i);
        let reader = new FileReader();
        // Closure to capture the file information.
        reader.onload = (function(theFile) {
            return function(e) {
                let result = e.target.result;
                if(!isFirstFile){
                    var lines = result.split('\n');
                    // remove one line, starting at the first position
                    lines.splice(0,1);
                    // join the array back into a single string
                    result = lines.join('\n');
                }
                content.value += result;
                isFirstFile = false;
            };
        })(f);
        
        // Read in the image file as a data URL.
        reader.readAsText(f);
    }
}

var textFile = null;
function makeTextFile(value) {
    var data = new Blob([value], {type: 'text/plain'});

    console.log(data);

    if (textFile !== null) {
        window.URL.revokeObjectURL(textFile);
    }

    textFile = window.URL.createObjectURL(data);

    return textFile;
};

download.addEventListener('click', function () {
    var a = document.createElement("a");
    a.href = makeTextFile(content.value);
    var d = new Date();
    var dateString = ""+d.getFullYear()+"_"+(d.getMonth()+1)+"_"+d.getDate()+"_"+d.getHours()+"_"+d.getMinutes();
    a.setAttribute("download", "merge_"+dateString+".csv");
    a.click();
}, false);