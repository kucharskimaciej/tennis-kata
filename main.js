var Tennis = (function () {
    var translateScore = function (score) {
        switch (score) {
            case 0: return "Love";
            case 1: return "Fifteen";
            case 2: return "Thirty";
            case 3: return "Forty";
        }
    };

    var Klass = function () {
        this.playerOneScore = 0;
        this.playerTwoScore = 0;

    };

    Klass.prototype.getScore = function () {
        var winner, advantage;
        winner = this.getWinner();

        if (winner) {
            return winner;
        }

        if (this.isDeuce()) {
            return "Deuce";
        }

        advantage = this.getAdvantage();
        if (advantage) {
            return advantage;
        }

        return translateScore(this.playerOneScore) +
            ", " + translateScore(this.playerTwoScore);
    };

    Klass.prototype.playerOneScores = function () {
        this.playerOneScore++;
    };

    Klass.prototype.playerTwoScores = function () {
        this.playerTwoScore++;
    };

    Klass.prototype.getWinner = function () {
        if( this.playerOneScore >= 3 &&
            this.playerOneScore >= this.playerTwoScore + 2) {
            return "Winner: playerOne";
        }

        if( this.playerTwoScore >= 3 &&
            this.playerTwoScore >= this.playerOneScore + 2) {
            return "Winner: playerTwo";
        }
    };

    Klass.prototype.isDeuce = function () {
        return this.playerOneScore === this.playerTwoScore &&
                this.playerOneScore >= 3;
    };

    Klass.prototype.getAdvantage = function () {
        if (this.playerOneScore === this.playerTwoScore + 1 &&
            this.playerOneScore >= 4 ) {
            return "Advantage: playerOne";
        }

        if (this.playerTwoScore === this.playerOneScore + 1 &&
            this.playerTwoScore >= 4 ) {
            return "Advantage: playerTwo";
        }

    };

    return Klass;
}());

module.exports = Tennis;