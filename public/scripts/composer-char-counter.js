$(document).ready(() => {
    const maxChars = 140,
    textArea = $("textarea[name='text']"),
    counter = textArea.nextAll().last(),
    tweetButton = textArea.next(),
    errorColour = 'red';

    textArea.keydown(() => {
        let chars = textArea.val().length;
        let remaining = maxChars - chars;

        if(remaining <=0) {
            counter.css('color', errorColour);
            tweetButton.prop('disabled', true);

            counter.text(maxChars - chars);
        } else {
            counter.css('color', '#244751');
            tweetButton.prop('disabled', false);

            counter.text(maxChars - chars);
        }

        
    });

});