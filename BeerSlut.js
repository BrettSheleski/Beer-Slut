/// <reference path="createjs-2015.11.26.min.js" />

BeerSlut = (function (createjs) {




    function BeerSlut(canvas, options) {
        var self = this;

        if (!options)
            options = {};

        this.stage = new createjs.Stage(canvas);

        this.currentPage = null;

        var fps = parseInt(options.fps);

        if (isNaN(fps)) {
            fps = 40;
        }

        createjs.Ticker.setFPS(fps);

        createjs.Ticker.addEventListener("tick", function () {
            self.stage.update();
        });

    }

    BeerSlut.prototype.showPage = function (page) {
        if (this.currentPage)
            this.stage.removeChild(this.currentPage);

        this.currentPage = page;

        if (this.currentPage)
            this.stage.addChild(this.currentPage);
    };

    BeerSlut.prototype.start = function () {
        var intro = createIntro(this);

        this.showPage(intro);
    };

    BeerSlut.prototype.getCenter = function () {
        return {
            x: this.stage.canvas.width / 2,
            y: this.stage.canvas.height / 2
        }
    };


    function createIntro(bs) {
        var container = new createjs.Container();

        var center = bs.getCenter();

        var textOptions = {
            x: center.x,
            y: center.y,
            textAlign: "center",
            textBaseline: "middle",
            font: "86px Arial Black",
            color: "red",
            lineWidth: 800,
            alpha: 0
        };

        var thirstyText = new createjs.Text("I'm so damn thirsty baby".toUpperCase()).set(textOptions);
        
        var fetchText = new createjs.Text("Why don't you go and fetch me a beer?".toUpperCase()).set(textOptions);

        var punchText = new createjs.Text("Or I'll punch you in the face!!!".toUpperCase()).set(textOptions)
            .set({
                font: "72px Arial Black",
                lineWidth: null,
                y: fetchText.y + 300
            });
        
        container.addChild(thirstyText, fetchText, punchText);

        var fadeTime = 250;

        createjs.Tween.get(thirstyText)
            .to({ alpha: 1 }, fadeTime)
            .wait(3000)
            .to({ alpha: 0 }, fadeTime)
            .call(function () {
                createjs.Tween.get(fetchText)
                    .to({ alpha: 1 }, fadeTime)
                    .wait(1000)
                    .call(function () {
                        createjs.Tween.get(punchText)
                            .to({ alpha: 1 }, fadeTime)
                            .wait(1000)
                            .call(function () {
                                
                            });
                    });
            });


        return container;
    }

    function createIntroSong(bs) {

    }

    return BeerSlut;
})(createjs);


