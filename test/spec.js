var chai = require('chai');
chai.should();
var expect = chai.expect;


var Tennis = require('../main.js');

describe('Tennis game kata:', function () {
    before(function () {
        this.tennis = Tennis.new();
    });

    it('defines tennis object', function () {
       expect(this.tennis).to.exist;
    });

    it('exposes getScore method', function () {
       expect(this.tennis).to.respondTo('getScore');
    });

    it('should expose methods for player scoring', function () {
        expect(this.tennis).to.respondTo('player1Scores');
        expect(this.tennis).to.respondTo('player2Scores');
    });


    describe('Simple Scores', function () {
        beforeEach(function () {
           this.tennis = Tennis.new();
        });

        it('before any player scored the score should be "Love, Love"', function () {
           expect(this.tennis.getScore()).to.equal("Love, Love");
        });

        it('after player1 scores, the score should say "15, Love"', function () {
            this.tennis.player1Scores();
            expect(this.tennis.getScore()).to.equal("15, Love");
        });

        it('after player1 scores twice the score should be "30, Love', function () {
            this.tennis.player1Scores();
            this.tennis.player1Scores();
            expect(this.tennis.getScore()).to.equal("30, Love");
        });

        it('should work the same for player2', function () {
            expect(this.tennis.getScore()).to.equal("Love, Love");
            this.tennis.player2Scores();
            expect(this.tennis.getScore()).to.equal("Love, 15");
            this.tennis.player2Scores();
            expect(this.tennis.getScore()).to.equal("Love, 30");
        });
    });

    describe('Winning:', function () {
        beforeEach(function () {
           this.tennis = Tennis.new();
        });


        it('if player1 has 40 points he should be declared a winner', function () {
            for(var i = 0; i < 3; i++) {
               this.tennis.player1Scores();
            }

            expect(this.tennis.getScore()).to.equal('Winner: player1');
        });

        it('if player2 has 40 points he should be declared a winner', function () {
            for(var i = 0; i < 3; i++) {
                this.tennis.player2Scores();
            }

            expect(this.tennis.getScore()).to.equal('Winner: player2');
        });


        it('winner shouldnt be declared if his advantage is less than 2 points', function () {
            for(var i = 0; i < 3; i++) {
                this.tennis.player2Scores();
            }

            for(var j = 0; j < 2; j++) {
                this.tennis.player1Scores();
            }

            expect(this.tennis.getScore()).to.equal('30, 40');
        });

    });

    describe('Deuce', function () {
        beforeEach(function () {
            this.tennis = Tennis.new();
        });

        it('result of getScore should be "Deuce" when both players have score of 40', function () {
            for(var i = 0; i < 3; i++) {
                this.tennis.player1Scores();
                this.tennis.player2Scores();
            }

            expect(this.tennis.getScore()).to.equal("Deuce");
        });

        it('result of getScore should be "Deuce" when both players have equal score of more than 40', function () {
            for(var i = 0; i < 10; i++) {
                this.tennis.player1Scores();
                this.tennis.player2Scores();
            }

            expect(this.tennis.getScore()).to.equal("Deuce");
        });
    });

    describe('Advantage', function () {
        beforeEach(function () {
            this.tennis = Tennis.new();
        });

        it('getScore should return "Advantage: player1" when both players have scored at least 3 times and one of them leads by 1 point', function () {
            for(var i = 0; i < 3; i++) {
                this.tennis.player1Scores();
                this.tennis.player2Scores();
            }
            this.tennis.player1Scores();

            expect(this.tennis.getScore()).to.equal('Advantage: player1');
        });

        it('getScore should return "Advantage: player1" when both players have scored at least 3 times and one of them leads by 1 point', function () {
            for(var i = 0; i < 3; i++) {
                this.tennis.player1Scores();
                this.tennis.player2Scores();
            }
            this.tennis.player2Scores();

            expect(this.tennis.getScore()).to.equal('Advantage: player2');
        });
    });

});
