$(document).ready(function () {

  $("#userValue").on('keyup', function () {
    apiCall();
  });

  function apiCall() {
    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    url += '?' + $.param({
      'api-key': "937889dd098d40988431171b07ff38e1",
      'q': $("#userValue").val(),
      'begin_date': "17001111",
      'end_date': "20191111",
      'sort': "newest"
    });

    $.ajax({
      url: url,
      method: 'GET',

    }).done(function (result) {
      let object_info = result.response;

      console.log(result);

      var entire_article = "";
      entire_article = "<h4>Showing results for <span>" + $("#userValue").val() + "</span></h4>"

      function loop(x, y) {
        entire_article += "<div class='flex-rows'>"
        for (var i = x; i < y; i++) {
          let month = new Date(object_info.docs[i].pub_date).getUTCMonth();
          let date = new Date(object_info.docs[i].pub_date).getUTCDate();
          let year = new Date(object_info.docs[i].pub_date).getUTCFullYear();
          // let date = month.getMonth() + '/' + month.getDay() + '/' + month.getFullYear()
          console.log('Month = ' + (parseInt(month) + 1) + ' Date = ' + date + ' Year = ' + year);
          // console.log(date);

          entire_article += "<div class='box_" + (i + 1) + " boxes'>"
          entire_article += "<a href='" + JSON.stringify(object_info.docs[i].web_url).toString().replace(/"/g, "") + "' target='_blank'><div>";
          entire_article += "<h3>" + JSON.stringify(object_info.docs[i].headline.main).toString().replace(/"/g, "") + "</h3>";
          entire_article += "<p>" + JSON.stringify(object_info.docs[i].snippet).toString().replace(/"/g, "").replace(/\\/g, "") + "</p>";

          if (object_info.docs[i].multimedia[0]) {
            entire_article += "<img src='" + "https://www.nytimes.com/" + JSON.stringify(object_info.docs[i].multimedia[0].url).toString().replace(/"/g, "") + "'>";
          }

          entire_article += "<p class='article_date'>";
          entire_article += (parseInt(month) + 1) + '/' + date + '/' + year + "</p>";
          entire_article += "</div></a>";
          entire_article += "</div>";
          // $("#articleSnippet").html(articleSnippet);
          $("#entire_article").html(entire_article);

        }

        entire_article += "</div>";

      }

      loop(0, 1);
      loop(1, 4);
      loop(4, 5);
      loop(5, 7);
      loop(7, 10);
      $(".container").css("border-bottom", "1px solid #aaaaaa");

    }).fail(function (err) {
      // throw err;
      $("#entire_article").html("<h4>Sorry, no response is found for <span>" + $("#userValue").val() + "</span>. Try pressing enter.<br>If that doesn't work, check internet connect and try again.</h4>");
      console.log(err);

    });
  }
});