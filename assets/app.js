(function ($, undefined) {

    var userName = 'heiswayi';

    // Return the gist description
    function getGistDesc(gist) {
        if (gist.description) {
            return gist.description;
        }
        else {
            return 'No description';
        }
    }

    // Return the gist files
    function getGistFiles(gist) {
        var gLang = [], gFiles = [];
        $.each(gist.files, function(j, file) {
            gFiles.push(file.filename);
        })
        return '<span class="gist__file">'+gFiles.join('</span> <span class="gist__file">')+'</span>';
    }

    // Create an entry for the gist in the grid of org repos
    function showGist(gist) {
        var $item = $('<div class="unit-1-3 gist" />');
        var $link = $('<a class="box default" href="' + gist.html_url + '" />');

        //$link.append('<h2 class="gist__name">' + gist.id + '</h2>');
        $link.append('<p class="gist__desc">' + getGistDesc(gist) + '</p>');
        $link.append('<p class="gist__files">' + getGistFiles(gist) + '</p>');
        $link.append('<p class="gist__updated">Last updated: ' + prettyDate(gist.updated_at) + '</p>');

        $link.appendTo($item);
        $item.appendTo('#gists');
    }

    $.getJSON('https://api.github.com/users/' + userName + '/gists', function (result) {
        $.each(result, function (i, gist) {
            showGist(gist);
        });
    });

    // Relative times
    function prettyDate(date) {
        var seconds, formats, i = 0, f;
        date = new Date(date);
        seconds = (new Date() - date) / 1000;
        formats = [
            [60, 'seconds', 1],
            [120, '1 minute ago'],
            [3600, 'minutes', 60],
            [7200, '1 hour ago'],
            [86400, 'hours', 3600],
            [172800, 'Yesterday'],
            [604800, 'days', 86400],
            [1209600, '1 week ago'],
            [2678400, 'weeks', 604800]
        ];

        while (f = formats[i++]) {
            if (seconds < f[0]) {
                return f[2] ? Math.floor(seconds / f[2]) + ' ' + f[1] + ' ago' :  f[1];
            }
        }
        return 'A while ago';
    }

})(jQuery);
