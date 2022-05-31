$(document).ready(function() {
    //window.jsPDF = window.jspdf.jsPDF

    $("#elrondSelectPhrase").change(function() {
        var selected = $(this).val();
        $(".card-title").html(selected);
        console.log(selected);
    });

    $("#elrondAddressInput").change(function() {
        $(".qrcode").html("");
        var selected = $(this).val();
        var qrc = new QRCode(document.getElementById("qrcode"), {
            text: selected,
            width: 158,
            height: 158,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H,
        });
    });

    $("#elrondMessageArea").change(function() {
        var selected = $(this).val();
        $(".custom-message p").text(selected);
    });

    $(".generate-pdf").click(function() {
        html2canvas(document.querySelector('.card-container')).then(function(canvas) {
            console.log(canvas);
            simulateDownloadImageClick(canvas.toDataURL(), 'maiar-referral.png');
        });
    });

    function simulateDownloadImageClick(uri, filename) {
        var link = document.createElement('a');
        if (typeof link.download !== 'string') {
            window.open(uri);
        } else {
            link.href = uri;
            link.download = filename;
            accountForFirefox(clickLink, link);
        }
    }

    function clickLink(link) {
        link.click();
    }

    function accountForFirefox(click) { // wrapper function
        let link = arguments[1];
        document.body.appendChild(link);
        click(link);
        document.body.removeChild(link);
    }
});