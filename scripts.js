// Executes On Page Load
$(function() {
    let players = [];
    const maxPlayers = 9;

    // HTML Elements
    const $count = $("#player-count");
    const $players = $("#players");
    const $input = $("#player-input").children(":first");
    const $addButton = $("#add");
    const $playButton = $("#play");

    // Effect On Page Load
    $count.hide();

    $input.on("keydown", e => {
        // Add Players By Pressing Enter
        if (e.key == "Enter") {
            addPlayer();
        }
    });
    // Other Event Listeners
    $addButton.on("click", addPlayer);
    $players.on("click", removePlayer);
    $playButton.on("click", play);

    function addPlayer() {
        let player = $input.val();
        // $var[0] Is Syntax For Using Vanilla JS with JQuery Objects
        if (player.length > 0 && $input[0].checkValidity() && players.length < maxPlayers && players.indexOf(player) == -1) {
            // Add Player & Clear Input
            players.push(player);
            $input.val("");
            // Update & Display Player Count
            $count.text(players.length);
            $count.fadeIn();
            // Display Player
            $players.append($(`<span>${player}</span>`));
        }
    }

    function removePlayer(e) {
        let player = $(e.target);
        // Click Target != Container
        if (!player.is($players)) {
            // Remove Player
            players.splice(players.indexOf(player.textContent), 1);
            // Update
            $count.text(players.length);
            // Remove Display
            player.remove();
        }
    }

    let content;

    function play() {
        if (players.length > 1) {
            // Remove Old & Add New HTML
            $("#container").remove();
            $("#mobile").load("url");
            // Change Layout
            $("container").css({
                "justify-content": "space around"
            });
            // Get JSON With Game Content
            $.getJSON("de.json", data => {
                content = data;
                next();
            });
        }
    }

    function next() {
        $(".heading").text("Never Have I Ever");
        $(".body").text(content["Never Have I Ever"][0]);
    }
});