// Run ASAP to init Materialze components and load audio
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

document.getElementById(`cuteMusic`).load();

// On Document Ready
$(function () {

    const GIPHYAPIKEY = `KC8KiUIfj4EKXy0nBNAyXEfDpeKW01BX`;

    let animals = [`aardvark`, `tapir`, `armadillo`, `superb bird of paradise`];

    let cuteMode = false;

    // Render buttons
    function renderButtons() {
        // Buttons should appear in #mobileTags (as an li) and tagsContent (as a button)

        // Clear all of the buttons
        $(`.gifButton`).remove();

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

            aTag.addClass(`waves-effect waves-light btn-large purple darken-4 gifButton`);
            aTag.text(value);

            listItem.append(aTag);

            return listItem;

        }
        else {

            let aTag = $(`<a>`);

            aTag.addClass(`waves-effect waves-light btn-large purple darken-4 gifButton mainButton`);
            aTag.text(value);

            return aTag;

        }
    }

    renderButtons();

    // On mainSubmit
    $(`#mainSubmit,#sideSubmit`).on(`click`, function () {
        if ($(this).attr(`id`) === `mainSubmit`) {
            let value = $(`#autocomplete-input-main`).val().trim().toLowerCase();
            console.log(value);
            if (value === "" || animals.includes(value)) {
                $(`#mainSubmit`).effect(`shake`);
            }
            else {
                animals.push(value);
                console.log(animals);
            }
            $(`#autocomplete-input-main`).val(``);
        }
        else {
            let value = $(`#autocomplete-input-side`).val().trim().toLowerCase();
            console.log(value);
            if (value === "" || animals.includes(value)) {
                $(`#sideSubmit`).effect(`shake`);
            }
            else {
                animals.push(value);
                console.log(animals);
            }
            $(`#autocomplete-input-side`).val(``);
        }
        renderButtons();
    });

    // On .gifButton click listener
    $(document).on(`click`, `.gifButton`, function () {

    });

    // Click listener for the Cute Mode switch. On click of cute mode switch, the color scheme changes, music plays, and every search has "cute"
    // appended to front

    $(document).on(`click`, `.cuteSwitch`, function () {

        // Check if checked
        // if not checked, START CUTE MODE ~~~~~~~!!! K A W A I I  D E S U  N E ~?
        if ($(this).prop(`checked`)) {

            // ACTIVATE CUTE MODE!
            cuteMode = true;

            // Make sure both switches are flipped
            $(`.cuteSwitch`).each(function () {
                $(this).prop(`checked`, true);
            });

            // Change color scheme
            $(`.purple`).each(function () {
                $(this).removeClass(`purple`);
                $(this).addClass(`pink`);
                if ($(this).hasClass(`darken-2`)) {
                    $(this).removeClass(`darken-2`);
                    $(this).addClass(`darkenPlaceholder`);
                }
                else {
                    $(this).removeClass(`darken-4`);
                    $(this).addClass(`darken-1`);
                }
            });

            // Start sakura blossoms falling
            $(`body`).sakura();

            // Play cute music
            document.getElementById(`cuteMusic`).play();

        }
        // Else deactivate cute mode... ( ^, _ ,^)
        else {

            cuteMode = false;

            // Make sure both switches are flipped
            $(`.cuteSwitch`).each(function () {
                $(this).prop(`checked`, false);
            });

            // Change color scheme back
            $(`.pink`).each(function () {
                $(this).removeClass(`pink`);
                $(this).addClass(`purple`);
                if ($(this).hasClass(`darkenPlaceholder`)) {
                    $(this).removeClass(`darkenPlaceholder`);
                    $(this).addClass(`darken-2`);
                }
                else {
                    $(this).removeClass(`darken-1`);
                    $(this).addClass(`darken-4`);
                }
            });

            // Stop sakura blossoms falling
            $(`body`).sakura(`stop`);

            // Stop cute music
            document.getElementById(`cuteMusic`).pause();

        }

    });

});