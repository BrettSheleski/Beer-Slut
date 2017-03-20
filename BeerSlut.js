/// <reference path="createjs-2015.11.26.min.js" />

BeerSlut = (function (createjs) {


    var fadeTime = 250;

    var textShadow = new createjs.Shadow("black", 5, 5, 10);

    function BeerSlut(canvas, options) {
        var self = this;

        if (!options)
            options = {};

        this.stage = new createjs.Stage(canvas);
        this.stage.enableMouseOver();
        this.numberOfPlayers = 1;
        this.currentPlayerIndex = 0;

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

    BeerSlut.prototype.incrementCurrentPlayerIndex = function () {
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.numberOfPlayers;
    };

    BeerSlut.prototype.loadAssets = function (callback) {

    };


    BeerSlut.prototype.showPage = function (page) {
        if (this.currentPage === null) {
            this.currentPage = page;

            if (this.currentPage)
                this.stage.addChild(this.currentPage);
        }
        else {

            var oldPage = this.currentPage;

            createjs.Tween.get(oldPage, { override: true }).to({ alpha: 0 }, fadeTime).call(function () {
                this.stage.removeChild(oldPage);
            });

            this.currentPage = page;

            if (page !== null) {
                var alpha = page.alpha;

                page.alpha = 0;
                this.stage.addChild(page);
                createjs.Tween.get(page).to({ alpha: alpha }, fadeTime);
            }

        }

    };

    BeerSlut.prototype.start = function () {

        this.loadAssets();

        var bs = this;

        var introPage = new Page(this, [
            { id: "intro", src: "assets/intro/intro.mp3" },
            { id: "introsong", src: "assets/introsong/song.mp3" },
            { id: "introsong.bg", src: "assets/introsong/bg.jpg" },
            { id: "wench", src: "assets/introsong/wench.png" },
            { id: "bg", src: "assets/introsong/bg.jpg" }
        ]);

        introPage.createContent = createIntroPage;

        introPage.start();

    };

    BeerSlut.prototype.getCenter = function () {
        return {
            x: this.stage.canvas.width / 2,
            y: this.stage.canvas.height / 2
        };
    };

    BeerSlut.prototype.getHeightPercent = function (p) {
        return this.stage.canvas.height * p / 100;
    };

    BeerSlut.prototype.getWidthPercent = function (p) {
        return this.stage.canvas.width * p / 100;
    };

    function createIntroPage(bs, assets) {
        var container = new createjs.Container();

        var center = bs.getCenter();



        var textOptions = {
            x: center.x,
            y: center.y - 100,
            textAlign: "center",
            textBaseline: "middle",
            font: "bold 86px Arial",
            color: "red",
            lineWidth: 800,
            alpha: 0
        };

        var thirstyText = new createjs.Text("I'm so damn thirsty baby".toUpperCase()).set(textOptions);

        var fetchText = new createjs.Text("Why don't you go and fetch me a beer?".toUpperCase()).set(textOptions);

        var punchText = new createjs.Text("Or I'll punch you in the face!!!".toUpperCase()).set(textOptions)
            .set({
                font: "bold 72px Arial",
                lineWidth: null,
                y: fetchText.y + 300
            });

        container.addChild(thirstyText, fetchText, punchText);

        createjs.Tween.get(thirstyText)
            .to({ alpha: 1 }, fadeTime)
            .wait(2000 - fadeTime)
            .to({ alpha: 0 }, fadeTime)
            ;

        createjs.Tween.get(fetchText)
            .wait(2000)
            .to({ alpha: 1, fadeTime })
            ;

        createjs.Tween.get(punchText)
            .wait(3400 - fadeTime)
            .to({ alpha: 1 }, fadeTime / 2)
            ;

        createjs.Sound.play("intro").on("complete", function () {
            bs.showPage(createIntroSongPage(bs, assets));
        });


        return container;
    }

    function createIntroSongPage(bs, assets) {
        var container = new createjs.Container();

        var bg = new createjs.Bitmap("assets/introsong/bg.jpg");

        var song = createjs.Sound.play("introsong");


        var textOptions = {
            text: "BEER SLUT",
            color: "red",
            font: "bold 72px Arial",
            shadow: textShadow,
            alpha: 0,
            textAlign: "center",
            textBaseline: "middle"
        };

        var bs1 = new createjs.Text(textOptions.text).set(textOptions).set({ x: bs.getWidthPercent(25), y: bs.getHeightPercent(25), rotation: -15 });
        var bs2 = new createjs.Text(textOptions.text).set(textOptions).set({ x: bs.getWidthPercent(80), y: bs.getHeightPercent(50), rotation: 30 });
        var bs3 = new createjs.Text(textOptions.text).set(textOptions).set({ x: bs.getWidthPercent(20), y: bs.getHeightPercent(75), rotation: 15 });
        var bs4 = new createjs.Text(textOptions.text).set(textOptions).set({ x: bs.getWidthPercent(50), y: bs.getHeightPercent(50), rotation: -20, font: "bold 112px Arial" });

        var wench = new createjs.Bitmap(assets.getResult("wench"))
            .set({
                x: bs.getWidthPercent(30),
                y: bs.getHeightPercent(100),
                alpha: 0,
                regX: 165,
                regY: 482
            });

        createjs.Tween.get(bs1)
            .wait(250)
            .to({ alpha: 1 }, fadeTime)
            .wait(7000 - 250)
            .to({ alpha: 0.75 }, fadeTime * 2);

        createjs.Tween.get(bs2)
            .wait(1250)
            .to({ alpha: 1 }, fadeTime)
            .wait(7000 - 1250)
            .to({ alpha: 0.75 }, fadeTime * 2);

        createjs.Tween.get(bs3)
            .wait(2250)
            .to({ alpha: 1 }, fadeTime)
            .wait(7000 - 2250)
            .to({ alpha: 0.75 }, fadeTime * 2);

        createjs.Tween.get(wench)
            .wait(7200)
            .to({ alpha: 1 }, fadeTime * 4);

        createjs.Tween.get(bs4)
            .wait(3500)
            .to({ alpha: 1, scaleX: 1.5, scaleY: 1.5 }, fadeTime)
            .wait(3700)
            .to({ alpha: 1, scaleX: 2, scaleY: 2, rotation: bs4.rotation + 15 }, fadeTime, createjs.Ease.bounceInOut)
            ;

        song.on("complete", function () {
            bs.showPage(createInstructionPage(bs));
        });

        container.addChild(bg, bs1, bs2, bs3, wench, bs4);

        return container;
    }

    function createInstructionPage(bs) {
        var container = new createjs.Container();

        var bg = new createjs.Shape();
        bg.graphics.beginFill("#3399ff").drawRect(0, 0, bs.getWidthPercent(100), bs.getHeightPercent(100));

        var textOptions = {
            color: "white",
            font: "40px Comic Sans MS, Comic Sans",
            x: bs.getWidthPercent(5),
            lineWidth: bs.getWidthPercent(90)
        };

        var ins1 = new createjs.Text("Beer Slut is a simple card game, played on your computer.  Choose the number of players, enter in your names and start.".toUpperCase())
            .set(textOptions)
            .set({ y: bs.getHeightPercent(5) });


        var ins2 = new createjs.Text("Players take turns, turning over the card of their choice.  You must perform the action specific to that card.".toUpperCase())
            .set(textOptions)
            .set({ y: bs.getHeightPercent(20) });

        container.addChild(bg, ins1, ins2);

        var cardsPerRow = 7;

        var cards = [
            { label: "Drink 3" },
            { label: "Beer SLut: Get Beer" },
            { label: "Distribute 3" },
            { label: "Match Game" },
            { label: "Person to the Right Drinks" },
            { label: "Rules" },
            { label: "Women Drink" },

            { label: "Bomb: Drink 5" },
            { label: "Person to the Left Drinks" },
            { label: "Beer Knight: Maze Game" },
            { label: "Men Drink" },
            { label: "Subjects Game" },
            { label: "Social" }
        ];

        var cardWidth = bs.getWidthPercent(75 / cardsPerRow);
        var cardHeight = bs.getHeightPercent(15);

        var cardMarginX = bs.getWidthPercent(1.5);

        textOptions.color = "black";
        textOptions.lineWidth = cardWidth;
        textOptions.textAlign = "center";
        textOptions.x = cardWidth / 2;
        textOptions.y = cardHeight;
        textOptions.font = "35px Comic Sans MS";

        for (var i = 0; i < cards.length; ++i) {
            var card = new createjs.Container();
            card.x = ins1.x + (i % cardsPerRow) * (cardWidth + cardMarginX);
            card.y = bs.getHeightPercent(30) + (Math.floor(i / cardsPerRow) * (cardHeight + 200));
            card.alpha = 0;

            createjs.Tween.get(card).wait(200 + Math.random() * 500).to({ alpha: 1 }, fadeTime);

            var shape = createCardShape(cardWidth, cardHeight);

            var caption = new createjs.Text(cards[i].label).set(textOptions);

            card.addChild(shape, caption);

            container.addChild(card);
        }

        var nextButton = new createjs.Container().set({ x: bs.getWidthPercent(90), y: bs.getHeightPercent(80), alpha: 0, scaleX: 0, scaleY: 0, cursor: "pointer" });

        createjs.Tween.get(nextButton).wait(700).to({ alpha: 1, scaleX: 1, scaleY: 1 }, fadeTime);

        var nextText = new createjs.Text("Continue").set({
            font: "42px Comic Sans MS",
            textAlign: "center",
            y: 100
        });

        var nextBg = new createjs.Shape();
        nextBg.graphics.beginFill("rgba(255,0,0,0)").moveTo(-100, -100).lineTo(100, -100).lineTo(100, 175).lineTo(-100, 175).closePath();
        nextBg.alpha = 0;

        var circle = new createjs.Shape();
        circle.graphics.setStrokeStyle(20).beginStroke("black").drawCircle(0, 0, 75);

        var triangle = new createjs.Shape();
        triangle.graphics.beginFill("black").lineTo(0, -35).lineTo(70, 0).lineTo(0, 35).closePath();
        triangle.x = -25;

        nextButton.addChild(nextBg, nextText, circle, triangle);

        container.addChild(nextButton);

        nextButton.on("click", function (evt) {
            bs.showPage(createPlayerSelectionPage(bs));
        });

        nextButton.on("mouseover", function (evt) {
            createjs.Tween.get(nextButton)
                .to({ scaleX: 1.25, scaleY: 1.25 }, fadeTime);
        });

        nextButton.on("mouseout", function (evt) {
            createjs.Tween.get(nextButton, { override: true })
                .to({ scaleX: 1.0, scaleY: 1.0 }, fadeTime);
        });

        return container;
    }

    function createGameBoardPage(bs) {
        var container = new createjs.Container();

        var bg = new createjs.Shape();
        bg.graphics.beginFill("#3399ff").drawRect(0, 0, bs.getWidthPercent(100), bs.getHeightPercent(100));

        var overlay = new createjs.Shape();
        overlay.graphics.beginFill("black").drawRect(0, 0, bs.getWidthPercent(100), bs.getHeightPercent(100));
        overlay.alpha = 0;

        var cardContainer = new createjs.Container().set({
            x: bs.getWidthPercent(5),
            y: bs.getHeightPercent(5)
        });

        container.addChild(bg, cardContainer);

        var isClickEnabled = true;

        var rows = 5,
            columns = 11,
            cardMargin = bs.getWidthPercent(1),
            cardHeight = bs.getHeightPercent(85) / rows,
            cardWidth = bs.getWidthPercent(90) / columns;

        function onCardMouseOver(evt) {
            createjs.Tween.get(evt.currentTarget).to({ scaleX: 1.25, scaleY: 1.25, alpha: 1 }, fadeTime);
        }

        function onCardMouseOut(evt) {
            createjs.Tween.get(evt.currentTarget, { override: true }).to({ scaleX: 1, scaleY: 1, alpha: .9 }, fadeTime / 2);
        }

        function onCardClick(evt) {
            if (evt.currentTarget.isEnabled && isClickEnabled) {
                evt.currentTarget.isEnabled = false;
                isClickEnabled = false;
                createjs.Tween.get(overlay, { override: true })
                    .to({ alpha: 0.75 }, fadeTime)
                    .call(function () {

                        var start = bs.getCenter();
                        var end = bs.getCenter();

                        var r = Math.floor(Math.random() * 4) % 4;

                        switch (r) {
                            case 0: // left
                                start.x -= bs.getWidthPercent(100);
                                break;
                            case 1: // top
                                start.y -= bs.getHeightPercent(100);
                                break;
                            case 2: // right
                                start.x += bs.getWidthPercent(100);
                                break;
                            case 3: // bottom
                                start.y += bs.getHeightPercent(100);
                                break;
                        }

                        r = Math.floor(Math.random() * 4) % 4;

                        switch (r) {
                            case 0: // left
                                end.x -= bs.getWidthPercent(100);
                                break;
                            case 1: // top
                                end.y -= bs.getHeightPercent(100);
                                break;
                            case 2: // right
                                end.x += bs.getWidthPercent(100);
                                break;
                            case 3: // bottom
                                end.y += bs.getHeightPercent(100);
                                break;
                        }




                        var text = new createjs.Text("Drink!", "bold 112px Arial", "red")
                            .set({
                                textAlign: "center",
                                textBaseline: "middle"
                            })
                            .set(start);

                        container.addChild(text);

                        createjs.Tween.get(text)
                            .to(bs.getCenter(), 1000, createjs.Ease.bounceOut)
                            .wait(1000)
                            .to(end, 1000, createjs.Ease.backIn)
                            .call(function () {

                                container.removeChild(text);

                                bs.incrementCurrentPlayerIndex();

                                createjs.Tween.get(overlay, { override: true })
                                    .to({ alpha: 0 }, fadeTime / 2)
                                    .call(function () {
                                        isClickEnabled = true;

                                        createjs.Tween.get(evt.currentTarget).to({ alpha: 0.5 }, fadeTime * 2);

                                        evt.currentTarget.cursor = "not-allowed";
                                        evt.currentTarget.removeAllEventListeners();



                                        createjs.Tween.get(turnText)
                                            .to({ scaleX: 1.1, scaleY: 1.1 }, fadeTime)
                                            .call(function () {
                                                turnText.text = "Player " + (bs.currentPlayerIndex + 1) + ", you're up!";
                                            })
                                            .to({ scaleX: 1, scaleY: 1 }, fadeTime / 2);
                                    });
                            });
                    });
            }

        }

        for (var i = 0; i < rows; ++i) {
            for (var j = 0; j < columns; ++j) {
                var card = new createjs.Container();
                card.regX = (cardWidth - cardMargin) / 2;
                card.regY = (cardHeight - cardMargin) / 2;
                card.x = j * cardWidth + card.regX;
                card.y = i * cardHeight + card.regY;
                card.alpha = 0;
                card.cursor = "pointer";
                card.isEnabled = false;

                createjs.Tween.get(card).wait(200 + Math.random() * 1000).to({ alpha: 0.9, isEnabled: true }, fadeTime);

                var cardShape = createCardShape(cardWidth - cardMargin, cardHeight - cardMargin);
                card.addChild(cardShape);

                card.on("mouseover", onCardMouseOver);
                card.on("mouseout", onCardMouseOut);
                card.on("click", onCardClick);

                cardContainer.addChild(card);
            }
        }



        var turnText = new createjs.Text("Player 1, you are up!")
            .set({
                x: bs.getWidthPercent(5),
                y: bs.getHeightPercent(95),
                textBaseline: "middle",
                color: "white",
                font: "bold 86px Arial"
            });

        container.addChild(turnText, overlay);



        return container;
    }

    function createPlayerSelectionPage(bs) {
        var container = new createjs.Container();

        var bg = new createjs.Shape();
        bg.graphics.beginFill("#3399ff").drawRect(0, 0, bs.getWidthPercent(100), bs.getHeightPercent(100));

        container.addChild(bg);

        var textOptions = {
            textAlign: "center",
            font: "bold 86px Arial",
            color: "white",
            shadow: textShadow
        };

        var text = new createjs.Text("How Many Players?".toUpperCase()).set(textOptions).set({ x: bs.getWidthPercent(50), y: bs.getHeightPercent(25) });

        container.addChild(text);

        for (var i = 1; i <= 6; ++i) {
            var card = new createjs.Container()
                .set({
                    x: bs.getWidthPercent(15) + i * bs.getWidthPercent(10),
                    y: bs.getHeightPercent(40),
                    cursor: "pointer",
                    numberOfPlayers: i
                });

            var shape = createCardShape(110, 150);
            shape.x = -55;
            card.addChild(shape);

            text = new createjs.Text(i.toString())
                .set(textOptions);

            card.addChild(text);

            card.on("mouseover", function (evt) {
                createjs.Tween.get(evt.currentTarget).to({ scaleX: 1.25, scaleY: 1.25 }, fadeTime);
            });

            card.on("mouseout", function (evt) {
                createjs.Tween.get(evt.currentTarget, { override: true }).to({ scaleX: 1, scaleY: 1 }, fadeTime);
            });

            card.on("click", function (evt) {
                bs.numberOfPlayers = evt.currentTarget.numberOfPlayers;

                bs.showPage(createGameBoardPage(bs));
            });

            container.addChild(card);
        }

        return container;
    }

    function createCardShape(width, height) {
        var shape = new createjs.Shape();
        shape.graphics
            .beginFill("#ff0000")
            .setStrokeStyle(1)
            .beginStroke("black")
            .moveTo(10, 0)
            .lineTo(width, 0)
            .lineTo(width, height)
            .lineTo(0, height)
            .lineTo(0, 10)
            .closePath();

        return shape;
    }

    function LoadingScreen(page) {
        this.Container_constructor();
        this.page = page;

        var bs = page.game;

        var text = new createjs.Text("Loading...");
        text.x = bs.getWidthPercent(50);
        text.y = bs.getHeightPercent(45);
        text.font = "bold 86px Arial";
        text.color = "white";
        text.textAlign = "center";
        text.textBaseline = "middle";

        var top = bs.getHeightPercent(92),
            bottom = bs.getHeightPercent(97),
            left = bs.getWidthPercent(20),
            right = bs.getWidthPercent(80),
            width = right - left,
            height = top - bottom;

        var outerBar = new createjs.Shape();
        outerBar.graphics
            .setStrokeStyle(5)
            .beginStroke("white")
            .moveTo(left, top)
            .lineTo(right, top)
            .lineTo(right, bottom)
            .lineTo(left, bottom)
            .closePath();


        var innerBar = new createjs.Shape()
            .set({ x: left, y: bottom });

        innerBar.graphics
            .beginFill("red")
            .moveTo(0, 0)
            .lineTo(width, 0)
            .lineTo(width, height)
            .lineTo(0, height)
            .closePath();

        innerBar.scaleX = 0;

        this.addChild(text, innerBar, outerBar);



        page.assets.on("progress", function (evt) {
            innerBar.scaleX = page.assets.progress;
        });

        page.assets.on("complete", function (evt) {
            page.game.showPage(page.createContent(page.game, page.assets));
        });
    }

    var loadScreenProgo = createjs.extend(LoadingScreen, createjs.Container);

    window.LoadingScreen = createjs.promote(LoadingScreen, "Container");


    function Page(game, manifest) {
        this.game = game;
        this.manifest = manifest;
        this.content = null;
        this.assets = new createjs.LoadQueue(false);
        this.assets.installPlugin(createjs.Sound);
    }

    Page.prototype.start = function () {

        if (this.manifest && this.manifest.length > 0) {
            this.assets.loadManifest(this.manifest);
            this.game.showPage(new LoadingScreen(this));
        }
        else {

            this.game.showPage(this.createContent(this.game));
        }
    };

    Page.prototype.createContent = function () {
        this.content = null;

        return this.content;
    };

    return BeerSlut;
})(createjs);


