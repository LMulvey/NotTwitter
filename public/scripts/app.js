$(document).ready(() => {   
    let error = $('#error'),
    success = $('#success');
    
    function timeSince(date) {
        const seconds = Math.floor((new Date() - date) / 1000);
        let interval = Math.floor(seconds / 31536000);

        if(interval > 1) return interval + " years ago";

        interval = Math.floor(seconds / 2592000);
        if (interval > 1) return interval + " months ago";

        interval = Math.floor(seconds / 86400);
        if (interval > 1) return interval + " days ago";

        interval = Math.floor(seconds / 3600);
        if (interval > 1) return interval + " hours ago";

        interval = Math.floor(seconds / 60);
        if (interval > 1) return interval + " minutes ago";

        return Math.floor(seconds) + " seconds ago";
    }

    function submitTweet(el) {
        let text = $("textarea[name='text']").val();
        let data = $(el).serialize();

        console.log(data);

        if(text.length > 140) {
            createFlash('error', 'More than 140 characters entered.');
        } else if (text.length == 0) {
            createFlash('error', 'You need to actually say something!');
        } else {
            $.post('/tweets', data, () => getTweets());
            $(el).find('textarea').val('').keyup();
            $("textarea[name='text']").next().attr('disabled', true);
            createFlash('success', 'Tweet successfully posted!');
        }
    }

    function createFlash(type, message) {
        let target = $('#flash-holder');
        if(type == 'success') {
            target.css('background-color', '#2BA152');
            target.html('<strong>Success!</strong> ' + message);
        }
        if(type == 'error') {
            target.css('background-color', '#A12B2B');
            target.html('<strong>Error!</strong> ' + message);
        }
        target.fadeToggle(3600, 'swing', target.fadeToggle(400, 'swing'));
    }

    function createTweetElement(data) {
        let tweet = `<article class="tweet"> \
            <header class="tweet-header"> \
                <img src="${data.user.avatars.small}"> \
                <span class="real-name">${data.user.name}</span> \
                <span class="twitter-handle">${data.user.handle}</span> \
            </header> \
            <div class="tweet-message"> \
            ${data.content.text} \
            </div> \
            <footer class="tweet-footer"> \
                <span class="datestamp">${timeSince(data.created_at)}</span> \
                <span class="icons"> \
                    <i class="fa fa-flag fa-fw"></i> \
                    <i class="fa fa-retweet fa-fw"></i> \
                    <i class="fa fa-heart fa-fw"></i> \
                </span> \
            </footer> \
            </article>`;

        return tweet;
    }

    function renderTweets(data) {
        if(data.constructor === Array) {
            data.forEach((tweet) => {
                $('#tweets-container').prepend(createTweetElement(tweet));
            });
        } else $('#tweets-container').prepend(createTweetElement(data));
    }

    function getTweets() {
        $.get('/tweets').then(renderTweets);
    }

    $('#composeTweet').on('submit', function(e) {
        e.preventDefault();
        submitTweet($(this));
    });

    $('#composeTweet').on('keydown', function(e) {
        if(e.keyCode == 13 && e.metaKey) $(this).submit();
    });

    $('#composeButton').on('click', function() {
        $('.new-tweet').slideToggle(200, () => $('textarea[name="text"').focus());  
    });

    getTweets();
});