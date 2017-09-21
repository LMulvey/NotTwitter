$(document).ready(() => {    
    let timeSince = (date) => {
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

    const createTweetElement = (data) => {
        let tweet = '<article class="tweet"> \
            <header class="tweet-header"> \
                <img src="' + data.user.avatars.small + '"> \
                <span class="real-name">' + data.user.name + '</span> \
                <span class="twitter-handle">' + data.user.handle + '</span> \
            </header> \
            <div class="tweet-message"> \
                ' + data.content.text + ' \
            </div> \
            <footer class="tweet-footer"> \
                <span class="datestamp">' + timeSince(data.created_at) + '</span> \
                <span class="icons"> \
                    <i class="fa fa-flag fa-fw"></i> \
                    <i class="fa fa-retweet fa-fw"></i> \
                    <i class="fa fa-heart fa-fw"></i> \
                </span> \
            </footer> \
            </article>';

        return tweet;
    }

    const renderTweets = (data) => {
        data.forEach((tweet) => {
            $('#tweets-container').prepend(createTweetElement(tweet));
        });
    }

    let tweetData = [
        {
          "user": {
            "name": "Newton",
            "avatars": {
              "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
              "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
              "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
            },
            "handle": "@SirIsaac"
          },
          "content": {
            "text": "If I have seen further it is by standing on the shoulders of giants"
          },
          "created_at": 1461116232227
        },
        {
          "user": {
            "name": "Descartes",
            "avatars": {
              "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
              "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
              "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
            },
            "handle": "@rd" },
          "content": {
            "text": "Je pense , donc je suis"
          },
          "created_at": 1461113959088
        },
        {
          "user": {
            "name": "Johann von Goethe",
            "avatars": {
              "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
              "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
              "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
            },
            "handle": "@johann49"
          },
          "content": {
            "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
          },
          "created_at": 1461113796368
        }
      ];

      renderTweets(tweetData);

 
});