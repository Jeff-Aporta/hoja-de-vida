const SVG_A_HTML = (imgURL, $img) => {
    let retorno = "";
    $.get(imgURL, function (data) {
        let $svg = jQuery(data).find('svg');

        $svg = $svg.removeAttr('xmlns:a');
        $svg = $svg.removeAttr('xmlns');

        if ($img) {
            $img.removeAttr('src');
            $.each($img.prop("attributes"), function () {
                $svg.attr(this.name, this.value);
            });
            $img.replaceWith($svg);
        }
        retorno = $svg.prop('outerHTML');
    }, 'xml');
    return retorno;
}

const SVG_A_HTML_BARRER_TODO = () => {
    document.querySelectorAll('img[src$=".svg"]').forEach(function (img) {
        let $img = jQuery(img);
        let imgURL = $img.attr('src');
        SVG_A_HTML(imgURL, $img);
    });
}

const IMG_A_SVG = {
    SVG_A_HTML,
    SVG_A_HTML_BARRER_TODO
}

const SELECTPICKEROPTIONS_A_ARRAY = (id) => {
    var select = document.getElementById(id);
    var size = select.options.length;
    var s = [];
    if (select != null) {
        for (var i = 0; i < size; i++) {
            if (select.options[i].selected) {
                var v = select.options[i].innerText;
                s.push(v)
            }
        }
    }
    return s;
};

const JQUERY = {
    SELECTPICKEROPTIONS_A_ARRAY,
    IMG_A_SVG
};

setTimeout(() => {
    SVG_A_HTML_BARRER_TODO();
}, 0);