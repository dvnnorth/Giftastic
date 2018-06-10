// Run ASAP to init Materialze components and load audio
const $SIDENAV = $(`.sidenav`);
const $AUTOCOMPLETESIDE = $(`#autocomplete-input-side`);
const $AUTOCOMPLETEMAIN = $(`#autocomplete-input-main`);

// Initialize sidenav - Materialize
// No options
M.Sidenav.init($SIDENAV, {});

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

    M.Autocomplete.init($AUTOCOMPLETESIDE, {
        data: wordPairs
    });

    M.Autocomplete.init($AUTOCOMPLETEMAIN, {
        data: wordPairs
    });
});

document.getElementById(`cuteMusic`).load();

// On Document Ready
$(function () {

    const GIPHYAPIKEY = `KC8KiUIfj4EKXy0nBNAyXEfDpeKW01BX`;

    const GIPHYURL = "https://api.giphy.com/v1/gifs/search?api_key=" + GIPHYAPIKEY;

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

            let $listItem = $(`<li>`);
            let $aTag = $(`<a>`);

            $aTag.addClass(`waves-effect waves-light btn-large purple darken-4 gifButton`);
            $aTag.text(value);

            $listItem.append($aTag);

            return $listItem;

        }
        else {

            let $aTag = $(`<a>`);

            $aTag.addClass(`waves-effect waves-light btn-large purple darken-4 gifButton mainButton`);
            $aTag.text(value);

            return $aTag;

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

        $('#gifDisplay').empty();

        let input = $(this).text();
        console.log(input);
        let thisEndpoint = GIPHYURL + "&" + $.param({
            "q": (cuteMode ? ("cute " + input) : input),
            "limit": "10",
            "offset": "0",
            "rating": "G",
            "lang": "en"
        });

        $.ajax({
            url: thisEndpoint,
            method: "GET"
        }).done(function (response) {

            let results = response.data;
            console.log(results);

            results.forEach(function (value, index) {

                // This is what you're creating
                `<div class="card col s12 m4 offset-m1">
                    <div class="card-image waves-effect waves-block waves-light">
                        <img class="activator" src="https://placeimg.com/200/200/any">
                    </div>
                    <div class="card-content">
                        <span class="card-title activator grey-text text-darken-4">Card Title
                            <i class="material-icons right">more_vert</i>
                        </span>
                        <p>
                            <a href="#">This is a link</a>
                        </p>
                    </div>
                    <div class="card-reveal">
                        <span class="card-title grey-text text-darken-4">Card Title
                            <i class="material-icons right">close</i>
                        </span>
                        <p>Here is some more information about this product that is only revealed once clicked on.</p>
                    </div>
                </div>`

                let $card = $(`<div>`);
                $card.attr(`class`, `card col s12 m4 offset-m1`);

                let $cardImageDiv = $(`<div>`);
                $cardImageDiv.attr(`class`, `card-image waves-effect waves-block waves-light`);

                let $image = $(`<img>`);
                let imageAttributes = {
                    "id": "gif" + index,
                    "src": value.images.fixed_width_still.url,
                    "data-still": value.images.fixed_width_still.url,
                    "data-animated": value.images.fixed_width.url
                };

                for (let key in imageAttributes) {
                    $image.attr(key, imageAttributes[key]);
                    console.log($image.attr(key), key);
                }

                let $cardContent = $(`<div>`)
                $cardContent.attr(`class`, `card-content`);
                let $cardTitle = $(`<span>`);
                $cardTitle.attr(`class`, `card-title activator grey-text text-darken-4`);
                $cardTitle.html(`<a href="${value.url}">${value.title}</a>`);
                let $moreVert = $(`<i>`);
                $moreVert.attr(`class`, `material-icons right`);
                $moreVert.text(`more_vert`);

                let $cardReveal = $(`<div>`);
                $cardReveal.attr(`class`, `card-reveal`);
                let $cardTitleReveal = $(`<span>`);
                $cardTitleReveal.attr(`class`, `card-title grey-text text-darken-4`);
                $cardTitleReveal.html(`<a href="${value.url}">${value.title}</a>`);
                $close = $(`<i>`);
                $close.attr(`class`, `material-icons right`);
                $close.text(`close`);
                $pInvisible = $(`<p>`);
                $pInvisible.text("Here's some information that is hidden until clicked upon");

                // Get to appending
                $cardImageDiv.append($image);

                $cardTitle.append($moreVert);
                $cardContent.append($cardTitle);

                $cardTitleReveal.append($close);
                $cardReveal.append($cardTitleReveal);
                $cardReveal.append($pInvisible);

                $card.append($cardImageDiv);
                $card.append($cardContent);
                $card.append($cardReveal);

                console.log($card);

                $(`#gifDisplay`).append($card);

                /*let p = $('<p>');

                let rating = results[i].rating.toUpperCase();

                if (rating == '') {
                    p.text("Not rated");
                }
                else {
                    p.text("Rated " + rating);
                }

                let gifImg = $('<img>');
                gifImg.addClass('gifImg')
                gifImg.attr('src', results[i].images.fixed_height_small_still.url);
                gifImg.attr('data-still', results[i].images.fixed_height_small_still.url);
                gifImg.attr('data-active', results[i].images.fixed_height_small.url);

                gifDiv.append(p);
                gifDiv.append(gifImg);

                $('#gifHolder').prepend(gifDiv);*/

            });

            $('img').on('click', function (e) {

                console.log(e);

                let current = $(this).attr('src');
                let active = e.currentTarget.dataset.active;
                let still = e.currentTarget.dataset.still;

                if (current == still) {
                    $(this).attr('src', active);
                    current = active;
                } else {
                    $(this).attr('src', still);
                    current = still;
                }
            });
        });
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