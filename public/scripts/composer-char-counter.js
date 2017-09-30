$(document).ready(() => {
    const maxChars = 140,
    errorColour = 'red';

    $("textarea[name='text']").keyup(function() {
        let chars = $(this).val().length;
        let remaining = maxChars - chars;
        let counter = $(this).nextAll().last();

        //disable Tweet button ifthe value is empty
        if(remaining == maxChars) {
            $(this).next().attr('disabled', true);
        } else {
            $(this).next().attr('disabled', false);
        }

        if(remaining <= 0) {
            counter.css('color', errorColour);
            counter.text(maxChars - chars);
        } else {
            counter.css('color', '#244751'); // Reset to default color
            counter.text(maxChars - chars);
            $(this).next().attr('disabled', false);
        }  
    });

});