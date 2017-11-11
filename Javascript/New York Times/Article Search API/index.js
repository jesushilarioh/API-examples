$(document).ready(function () {

    $("#userValue").keyup(function () {
        apiCall();
    });
    $("#searchButton").click(function () {
        apiCall();
    });

    function apiCall() {
        var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
        url += '?' + $.param({
            'api-key': "<---Your-API-Key--->",
            'q': $("#userValue").val(),
            'begin_date': "17001111",
            'end_date': "20191111",
            'sort': "newest"
        });

        $.ajax({
            url: url,
            method: 'GET',

        }).done(function (result) {
            console.log(result);

            var i = 0;
            var articleHeadline = "";

            while (result.response.docs[i]) {

                articleHeadline += "<a href='" + JSON.stringify(result.response.docs[i].web_url).toString().replace(/"/g, "") + "' target='_blank'><div>";
                articleHeadline += "<h3>" + JSON.stringify(result.response.docs[i].headline.main).toString().replace(/"/g, "") + "</h3>";
                articleHeadline += "<p>" + JSON.stringify(result.response.docs[i].snippet).toString().replace(/"/g, "").replace(/\\/g, "") + "</p>";

                if (result.response.docs[i].multimedia[0])
                    articleHeadline += "<img src='" + "https://www.nytimes.com/" + JSON.stringify(result.response.docs[i].multimedia[0].url).toString().replace(/"/g, "") + "'></div></a>";
                else
                    articleHeadline += "</div></a>"

                // $("#articleSnippet").html(articleSnippet);

                $("#articleHeadline").html(articleHeadline);

                i++;
            }

        }).fail(function (err) {
            // throw err;
            $("#articleHeadline").html("<h4>Sorry, no response is found for " + $("#userValue").val() + "</h4>");
            console.log(JSON.stringify(err));

        });
    }
});
