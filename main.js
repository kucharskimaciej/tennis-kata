var Tennis = function () {

    var getScore, instance, player1Scores, player2Scores,
        translatePlayerScore, getWinner, hasDeuce, getAdvantage;

    instance = {};

    instance.player1Score = 0;
    instance.player2Score = 0;


    getScore = function () {
        var winner, advantage;

        winner = getWinner();
        advantage = getAdvantage();

        if (winner) {
            return "Winner: " + winner;
        }

        if (advantage) {
            return "Advantage: " + advantage;
        }

        if (hasDeuce()) {
            return "Deuce";
        }

        return translatePlayerScore(instance.player1Score) +
                ", " + translatePlayerScore(instance.player2Score);
    };
    player1Scores = function () {
        instance.player1Score++;
    };
    player2Scores = function () {
        instance.player2Score++;
    };

    translatePlayerScore = function (score) {
        var readableScore = null;
        switch(score) {
            case 0:
                readableScore = "Love";
                break;
            case 1:
                readableScore = "15";
                break;
            case 2:
                readableScore = "30";
                break;
            case 3:
                readableScore = "40";
                break;
        }

        return readableScore;
    };

    getWinner = function () {

        if (instance.player1Score === 3 &&
            instance.player1Score - 2 >= instance.player2Score) {
            return "player1";
        }

        if (instance.player2Score === 3 &&
            instance.player2Score - 2 >= instance.player1Score) {
            return "player2";
        }

        return undefined;
    };

    getAdvantage = function () {
        if (instance.player1Score >= 3 &&
            instance.player2Score >= 3) {

            if (instance.player1Score - 1 === instance.player2Score) {
                return "player1";
            }
            if (instance.player2Score - 1 === instance.player1Score) {
                return "player2";
            }
        }

        return undefined;
    };

    hasDeuce = function () {
        if (instance.player1Score === instance.player2Score &&
            instance.player1Score >= 3 &&
            instance.player2Score >= 3) {

            return true;
        }

        return false;
    };





    return {
        getScore: getScore,
        player1Scores: player1Scores,
        player2Scores: player2Scores
    };
};

module.exports = {
    new: Tennis
};