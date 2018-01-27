<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <title>cyberart.io</title>
        <link href="https://fonts.googleapis.com/css?family=Maven+Pro" rel="stylesheet">
        <style>
            #container {
                display: table;
                height: 100%;
                margin: 0 auto;
                width: 100%;
            }
            .content {
                background: #2e3436;
                padding: 40px;
                text-align: center;
                display: table-cell;
                vertical-align: middle;
            }
        </style>
    </head>
    <body style="background-color: #000000; height: 100vh; overflow:hidden">
        <!-- Load Facebook SDK for JavaScript -->
        <div id="fb-root" ></div>
        <script>(function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s); js.id = id;
                js.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.11&appId=111591186193819&autoLogAppEvents=1';
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));</script>

        <div id="container" style="color:#FFFFFF; text-align: center" >
            <div class="content" style="font-family: 'Maven Pro', sans-serif;">
                <br/>
                <a href="https://join.slack.com/t/cyberart-io/shared_invite/enQtMzAzNzcxOTgwMDk3LTZiZWMyNGM5Y2UwMmY3NWIwYmZkOGIzNWY5NTAzOWE5YzZlZjQ4NzRhYWM4NGRiY2RmNTZkZjc0MjFiZmU2ZTU">
                    <img style="width: 200px; height: 50px;" src="/img/btn-sign-in-with-slack.svg">
                </a>
                <br/><br/>
                <div
                    class="fb-page"
                    data-href="https://www.facebook.com/cyberart.io/"
                    data-tabs="timeline, events"
                    data-small-header="true"
                    data-adapt-container-width="true"
                    data-hide-cover="false"
                    data-show-facepile="true">
                    <blockquote
                        cite="https://www.facebook.com/cyberart.io/"
                        class="fb-xfbml-parse-ignore">
                        <a href="https://www.facebook.com/cyberart.io/">cyberart.io</a>
                    </blockquote>
                </div>
            </div>
        </div>
    </body>
</html>
