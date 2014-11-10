var chai = require('chai');
chai.should();
var expect = chai.expect;


var Tennis = require('../main.js');

describe('Tennis game', function () {

    before(function () {
       this.tennis = new Tennis;
    });

    it('should define Tennis class', function () {
       expect(this.tennis).to.exist;
    });

    it('should define Tennis#getScore method', function () {
       expect(this.tennis).to.respondTo('getScore');
    });

    it('should define score method for each player', function () {
       expect(this.tennis).to.respondTo('playerOneScores');
       expect(this.tennis).to.respondTo('playerTwoScores');
    });

    it('should hold playerOne score as a variable', function () {
       expect(this.tennis.playerOneScore).to.be.equal(0);
    });

    it('should hold playerTwo score as a variable', function () {
        expect(this.tennis.playerTwoScore).to.be.equal(0);
    });


    describe('basic scoring', function () {
        beforeEach(function () {
           this.tennis = new Tennis;
        });

        it('should add point when playerOne scores', function () {
           this.tennis.playerOneScores();
            expect(this.tennis.playerOneScore).to.be.equal(1);
        });

        it('should add point when playerTwo scores', function () {
            this.tennis.playerTwoScores();
            expect(this.tennis.playerTwoScore).to.be.equal(1);
        });
    });

    describe('#getScore', function () {
        beforeEach(function () {
            this.tennis = new Tennis;
        });

        it('displays "Love, Love" when no player scored', function () {
            expect(this.tennis.getScore()).to.equal('Love, Love');
        });

        it('displays "Fifteen, Love" when playerOne has scored once', function () {
            this.tennis.playerOneScores();
            expect(this.tennis.getScore()).to.equal('Fifteen, Love');

        });

        it('displays "Thirty, Love" when playerOne has 2 points', function () {
            this.tennis.playerOneScores();
            this.tennis.playerOneScores();
            expect(this.tennis.getScore()).to.equal('Thirty, Love');

        });

        it('displays "Forty, Thirty" when score is 3:2', function () {
            this.tennis.playerOneScore = 3;
            this.tennis.playerTwoScore = 2;
            expect(this.tennis.getScore()).to.equal('Forty, Thirty');
        });

        it('displays "Winner: playerTwo" when score is 4:6', function () {

            this.tennis.playerOneScore = 4;
            this.tennis.playerTwoScore = 6;

            expect(this.tennis.getScore()).to.be.equal("Winner: playerTwo");
        });

        it('displays "Deuce" when both players have the same score', function () {
            this.tennis.playerOneScore = 4;
            this.tennis.playerTwoScore = 4;

            expect(this.tennis.getScore()).to.be.equal("Deuce");
        });

        it('displays "Advantage: playerOne" when playerOne leads by one point', function () {
            this.tennis.playerOneScore = 9;
            this.tennis.playerTwoScore = 8;

            expect(this.tennis.getScore()).to.equal("Advantage: playerOne");
        });
    });

    describe('#getWinner', function () {
        beforeEach(function () {
            this.tennis = new Tennis;
        });

        it('returns "Winner: playerOne" when score is 3:0', function () {

            this.tennis.playerOneScore = 3;
            this.tennis.playerTwoScore = 0;

            expect(this.tennis.getWinner()).to.be.equal("Winner: playerOne");
        });

        it('returns "Winner: playerTwo" when score is 0:3', function () {

            this.tennis.playerOneScore = 0;
            this.tennis.playerTwoScore = 3;

            expect(this.tennis.getWinner()).to.be.equal("Winner: playerTwo");
        });

        it('returns "Winner: playerTwo" when score is 4:6', function () {

            this.tennis.playerOneScore = 4;
            this.tennis.playerTwoScore = 6;

            expect(this.tennis.getWinner()).to.be.equal("Winner: playerTwo");
        });

    });

    describe('#isDeuce', function () {
        beforeEach(function () {
            this.tennis = new Tennis;
        });

        it('returns true if both players have same score (equal 3)', function () {
            this.tennis.playerOneScore = 3;
            this.tennis.playerTwoScore = 3;

            expect(this.tennis.isDeuce()).to.equal(true);
        });

        it('returns true if both players have same score (above 3)', function () {
            this.tennis.playerOneScore = 6;
            this.tennis.playerTwoScore = 6;

            expect(this.tennis.isDeuce()).to.equal(true);
        });

        it('returns false when players have the same score but it\'s lower than 3', function (){
           expect(this.tennis.isDeuce()).to.equal(false);
        });

        it('returns false when players have different scores', function () {
            this.tennis.playerOneScore = 1;
            this.tennis.playerTwoScore = 2;

            expect(this.tennis.isDeuce()).to.equal(false);
        })
    });

    describe("#getAdvantage", function () {
        beforeEach(function () {
            this.tennis = new Tennis;
        });

        it('should be defined', function () {
           expect(this.tennis).to.respondTo('getAdvantage');
        });

        it('should return "Advantage: playerOne" when player leads by one point over 3', function () {
            this.tennis.playerOneScore = 4;
            this.tennis.playerTwoScore = 3;

            expect(this.tennis.getAdvantage()).to.equal("Advantage: playerOne");
        });

        it('should return "Advantage: playerTwo" when playerTwo leads by one point over 3', function () {
            this.tennis.playerOneScore = 3;
            this.tennis.playerTwoScore = 4;

            expect(this.tennis.getAdvantage()).to.equal("Advantage: playerTwo");
        });

        it('should return "Advantage: playerOne" when playerOne leads by one point', function () {
            this.tennis.playerOneScore = 9;
            this.tennis.playerTwoScore = 8;

            expect(this.tennis.getAdvantage()).to.equal("Advantage: playerOne");
        });

    });


});