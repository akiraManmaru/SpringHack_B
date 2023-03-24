"use strict";

//==========
// Matter.js

var stage = document.getElementById('playscreen');
// var ctx;

//   ctx = stage.getContext('2d');

//   stage.width = 600;
//   stage.height = 600;

//   ctx.strokeRect(300, 300, 100, 60);

// canvas size
const WIDTH  = 700;
const HEIGHT = 700;

// set matter.js modules 
const Engine     = Matter.Engine;
const Render     = Matter.Render;
const Runner     = Matter.Runner;
const Body       = Matter.Body;
const Bodies     = Matter.Bodies;
const Bounds     = Matter.Bounds;
const Common     = Matter.Common;
const Composite  = Matter.Composite;
const Composites = Matter.Composites;
const Constraint = Matter.Constraint;
const Events     = Matter.Events;
const Mouse      = Matter.Mouse;
const MouseConstraint = Matter.MouseConstraint;

window.onload = ()=>{

// ----------------- Setting ---------------------
	const engine = Engine.create();
	engine.gravity.scale = 0.0003;

	// rendering screen
	const render = Render.create({
		element: stage,//document.body,
		engine: engine,
		options: {
			width: WIDTH, height: HEIGHT,
			showAngleIndicator: false,
			showCollisions: false,
			showDebug: false,
			showIds: false,
			showVelocity: false,
			hasBounds: true,
			wireframes: false,// Important!!
			background: 'transparent',
		},

	});
	Render.run(render);

//--------------------- object ---------------------------

	// 地面
	const ground = Bodies.rectangle(WIDTH/2, HEIGHT, WIDTH, 50, 
		{isStatic: true,
		fillStyle:"white"});
	Composite.add(engine.world,  ground);

    // create note composite( =>Event, create note when 'mousedown') 
    const ballComposite = Composite.create();
    Composite.add(engine.world, ballComposite);

	createBag(500, 500, 120, 190);


//----------------Event---------------------
    //マウスカーソルの設定
    const mouse = Mouse.create(render.canvas);
	render.mouse = mouse;
	const mouseConstraint = MouseConstraint.create(engine, {
		mouse: mouse,
		constraint: {
			stiffness: 0.2,
			render: {visible: false}
		}
	});

    Events.on(mouseConstraint, 'mousedown', e => {
        // ドラッグ中の処理
        if (mouseConstraint.body) { return }
        
		// create note
        const metor = Math.random();
        const width = (1+metor) * 30;
        const height = (1+metor) * 30 + 10;
        const ball = Bodies.rectangle(50, 300, width, height, { 
            restitution: 0.5 ,
			label: 'note',
			chamfer: {radius: 12},
            render: {
				strokeStyle: "#ffffff",
				sprite: {texture: './images/note_'+Math.floor(metor * 8 + 1)+'.png',
						xScale:(metor+1) * 0.07,
						yScale:(metor+1) * 0.07
				}
			}
        });
		console.log(metor*8+1);
		Body.setVelocity(ball, {x: (Math.random()+1)*3,y: -(Math.random()+1)*4});
        Composite.add(ballComposite, ball);
    });
	Composite.add(engine.world, mouseConstraint);

	Events.on(engine, 'collisionStart', e => {
		var pairs = e.pairs;
        for (var i = 0; i < pairs.length; i++) {
            var labelA = pairs[i].bodyA.label;
            var labelB = pairs[i].bodyB.label;
			console.log(labelB);
            if (labelA == 'bagTop' && labelB == 'note') {
                uguisu.currentTime =0;
				uguisu.play();
				Composite.remove(ballComposite, pairs[i].bodyB);
            }
            if (labelA == 'note' && labelB == 'bagTop') {
                uguisu.currentTime =0;
				uguisu.play();
				Composite.remove(ballComposite, pairs[i].bodyA);
			}
        }
	});

//-------------------- function ----------------------

    function createBag(x,y,w,h){
		//set obejct that bag object stored
		const group = Body.nextGroup(true);
		const bag = Composite.create({label: "bag"});

		//bag
		const body = Bodies.rectangle(x, y, w, h, {
			collisionFilter: {group: group},
			isStatic: true,
			render: {
				sprite:{texture: './images/bag.png',
				xScale:0.15,
				yScale:0.17
				},
			}
		});

		//bag at top
		const top = Bodies.rectangle(x, y-(h/2)-1, w, 10, {
			collisionFillter: {group: group},
			label: 'bagTop',
			isStatic: true,
			background: 'transparent',
		});

		Composite.addBody(bag, top);
		Composite.addBody(bag, body);
		Composite.add(engine.world, bag);
    }
    
    
	// 4, 物理世界を更新します
	const runner = Runner.create();
	Runner.run(runner, engine);
}