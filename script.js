var colName;
if (JSON.parse(localStorage.getItem("main"))) {
    var x = JSON.parse(localStorage.getItem("main"));
    var numbers = Object.keys(x).length + 1;
}

if (numbers == undefined) {
    numbers = 1;
}

colName = "Question - " + numbers;


let arr = ['quik_yes', 'quik_no', 'skip_5', 'skip_6',];
arr.forEach(function (item) {
    if (document.getElementById(item)) {
        document.getElementById(item).addEventListener('click', setStorageData);
    }
})

var old = {};
if (document.getElementById("submit_6")) {
    document.getElementById("submit_6").onclick = function () {
        var inputVal = document.getElementById("form-field-quik5_input").value;
        old = JSON.parse(localStorage.getItem("main"))
        old["" + colName + ""] = '' + inputVal + ''
        localStorage.setItem("main", JSON.stringify(old));
    }
}


var old = {};
if (document.querySelector("div.pbSubmit")) {
    document.querySelector("div.pbSubmit").onclick = function () {
        var dateCalendar = document.querySelector("div.slots").getAttribute("d");

        old = JSON.parse(localStorage.getItem("main"))
        old["" + colName + ""] = '' + dateCalendar + ''
        localStorage.setItem("main", JSON.stringify(old));
    }
}

function setStorageData(e) {
    e.preventDefault();
    var currentAnswer = null;
    let currentHref = this.href,
        currentText1 = this.querySelector('span.elementor-button-text');

    if (currentText1) {
        currentAnswer = currentText1.innerHTML;
    } else {
        currentAnswer = this.innerHTML;
    }

    let x = {};
    console.log("!" + colName);

    const currentStorageItem = localStorage.getItem("main", "newDate");
    console.log(currentStorageItem);
    if (currentStorageItem) {
        x = JSON.parse(localStorage.getItem("main"))
        x["" + colName + ""] = '' + currentAnswer + ''
        localStorage.setItem('main', JSON.stringify(x))

    } else {
        x["" + colName + ""] = currentAnswer
        localStorage.setItem("main", '' + JSON.stringify(x) + '')
    }
    window.location.href = currentHref;
}



var old = {};
if (document.getElementById("submit_yes")) {
    document.getElementById("submit_yes").onclick = function () {
        var inputVal = document.getElementById("email_yes").value;
        let formInputs = submit_yes.form.querySelectorAll('input.wpcf7-text');
        old = JSON.parse(localStorage.getItem("main"))

        for (i = 0; i < formInputs.length; i++) {
            let item = formInputs[i]
            old["" + item.name + ""] = '' + item.value + ''
        }
        localStorage.setItem("main", JSON.stringify(old));
    }
}

var old = {};
if (document.getElementById("submit_no")) {
    document.getElementById("submit_no").onclick = function () {
        var inputVal = document.getElementById("email_no").value;
        let formInputs = submit_no.form.querySelectorAll('input.wpcf7-text');
        old = JSON.parse(localStorage.getItem("main"))

        for (i = 0; i < formInputs.length; i++) {
            let item = formInputs[i]
            old["" + item.name + ""] = '' + item.value + ''
        }
        localStorage.setItem("main", JSON.stringify(old));
    }
}

jQuery(document).ready(function () {
    var old = {};
    if (document.querySelector("div.pbSubmit")) {
        document.querySelector("div.pbSubmit").onclick = function () {
            var dateCalendar = document.querySelector("div.slots").getAttribute("d")
            old = JSON.parse(localStorage.getItem("main"))
            window.location.href = "https://thetidegroup.com/quick-start-6/";
            if (old === undefined) {
                old = {}
            }

            old["" + colName + ""] = '' + dateCalendar + ''
            localStorage.setItem("main", JSON.stringify(old));
        }

    }



    // console.log(JSON.parse(localStorage.getItem("main")));

    jQuery("#submit_yes, #submit_no").on("click", function(){

        setTimeout(() => {
            var locData = JSON.parse(localStorage.getItem("main"));
            var locData = JSON.stringify(locData);
            // alert("set time");
            jQuery.ajax({
                url: "/wp-content/plugins/get-data/index.php",
                method: "POST",
                data: locData,
                success: function (locData) {
                    console.log(locData);
                    var clearStorage = localStorage.removeItem('main');

                },
            });
        }, 1000)

    })





    // var submit_yes = document.getElementById("submit_yes");
    // var submit_no = document.getElementById("submit_no");
    // var submits = document.querySelectorAll("#submit_yes, #submit_no");
    // submits.onclick = function(){
    //alert("test");
    // }



    /*
    var data = JSON.parse(localStorage.getItem("main"));
    function download_csv() {
        var csv = 'Name,Title\n';
        jQuery.each(data, function( key, item) {
            console.log(key + ' = ' + item);
            csv += key + "," + item;
            csv += "\n";
        });
        console.log(csv + "csv");
        console.log(data + "data");
        var hiddenElement = document.createElement('a');
        hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
        hiddenElement.target = '_blank';
        hiddenElement.download = 'people.csv';
        hiddenElement.click();
    }
  */

});


