$(document).ready(() => {
    const maxChars = 140,
    errorColour = 'red';

    //disable Tweet button ifthe value is empty
    if($("textarea[name='text']").val() == '') {
        $("textarea[name='text']").next().attr('disabled', true);
    }

    $("textarea[name='text']").keyup(function() {
        let chars = $(this).val().length;
        let remaining = maxChars - chars;
        let counter = $(this).nextAll().last();

        if(remaining <= 0) {
            counter.css('color', errorColour);
            counter.text(maxChars - chars);
            //$(this).next().attr('disabled', true); 
            // Let the user try and post a tweet. See what happens!
        } else {
            counter.css('color', '#244751'); // Reset to default color
            counter.text(maxChars - chars);
            $(this).next().attr('disabled', false);
        }  
    });

});