// Run ASAP to init Materialze components
const SIDENAV = $(`.sidenav`);
const AUTOCOMPLETESIDE = $(`#autocomplete-input-side`);
const AUTOCOMPLETEMAIN = $(`#autocomplete-input-main`);

// Initialize sidenav - Materialize
// No options
M.Sidenav.init(SIDENAV, {});

// Initialize autocomplete - Materialize
// Creating with animal list from GitHub user boennemann
$.ajax({
    url: "https://raw.githubusercontent.com/boennemann/animals/master/words.json",
    method: "GET"
}).then(function (response) {
    // Parse response
    response = JSON.parse(response);

    // wordPairs will contain the key value pairs for our autocomplete
    let wordPairs = {};

    // for each value in response, create a key value pair in wordPairs
    $.each(response, function (index, value) {
        wordPairs[value] = null;
    });

    M.Autocomplete.init(AUTOCOMPLETESIDE, {
        data: wordPairs
    });

    M.Autocomplete.init(AUTOCOMPLETEMAIN, {
        data: wordPairs
    });
});

// On Document Ready
$(function () {

    const GIPHYAPIKEY = `KC8KiUIfj4EKXy0nBNAyXEfDpeKW01BX`;

    let animals = [`aardvark`, `tapir`, `armadillo`, `superb bird of paradise`];

    // Render buttons
    function renderButtons() {
        // Buttons should appear in #mobileTags (as an li) and tagsContent (as a button)

        // Store the cute switch
        let cuteItem = $(`#cuteItem`);

        // Clear all of the buttons
        $(`.gif-button`).remove();

        // Populate buttons
        animals.forEach(function (value, index) {

            $(`#cuteSwitchSide`).prepend(generateButton(value, `list`));
            $(`#tags-content`).append(generateButton(value, `button`));

        });

    }

    /* Generate button takes arguments value and listOrButton. Value is the search term and button label, 
       listOrButton is expected to be a string with the value "list" or "button" which determines whether or not
       the element being generated is for the sidenav or the main button display. Default behavior returns
       button for the button display */
    function generateButton(value, listOrButton) {

        if (typeof listOrButton === `string` && listOrButton.toLowerCase() === 'list') {

            let listItem = $(`<li>`);
            let aTag = $(`<a>`);

            aTag.addClass(`waves-effect waves-light btn-large purple darken-4`);
            aTag.text(value);

            listItem.append(aTag);

            return listItem;

        }
        else {

            let aTag = $(`<a>`);

            aTag.addClass(`waves-effect waves-light btn-large purple darken-4 mainButton`);
            aTag.text(value);

            return aTag;

        }
    }

    renderButtons();

});