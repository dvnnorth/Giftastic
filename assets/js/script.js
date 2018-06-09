$(function() {

    const SIDENAV = $(`.sidenav`);
    const AUTOCOMPLETE = $(`#autocomplete-input`);
    const GIPHYAPIKEY = `KC8KiUIfj4EKXy0nBNAyXEfDpeKW01BX`;

    // Initialize sidenav - Materialize
    // No options
    M.Sidenav.init(SIDENAV, {});

    // Initialize autocomplete - Materialize
    // Creating with animal list from GitHub user boennemann
    $.ajax({
        url: "https://raw.githubusercontent.com/boennemann/animals/master/words.json",
        method: "GET"
    }).then( function(response) {
        // Parse response
        response = JSON.parse(response);

        // wordPairs will contain the key value pairs for our autocomplete
        let wordPairs = {};

        // for each value in response, create a key value pair in wordPairs
        $.each(response, function (index, value) {
            wordPairs[value] = null;
        });

        M.Autocomplete.init(AUTOCOMPLETE, {
            data: wordPairs
        })
    });

});