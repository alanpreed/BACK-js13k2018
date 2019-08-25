import planck from 'planck-js'

let cv = document.getElementById('js13k_canvas');
let ctx = cv.getContext('2d');
ctx.scale(4,4)

var world = planck.World({
  gravity: planck.Vec2(0, -10)
});

var ground = world.createBody({
    type: 'static',
    position: planck.Vec2(2, 5),
  });

ground.createFixture({
    shape: planck.Edge(planck.Vec2(-40.0, 0.0),planck.Vec2(40.0, 0.0))
  });

var shape = planck.Box(0.6, 0.125);

var y = 25.0;
var prevBody = ground;
for (let i = 0; i < 1; ++i) {
  var body = world.createDynamicBody(planck.Vec2(0.5 + i, y));
  body.createFixture(shape, {
    density: 20.0,
    friction: 0.2,
  });

  var anchor = planck.Vec2(i, y);
  world.createJoint(planck.RevoluteJoint({
    collideConnected: false,
  }, prevBody, body, anchor));

  prevBody = body;
}


function drawEdge(edge) {
  let cv = document.getElementById('js13k_canvas');
  let ctx = cv.getContext('2d');

  let lw = 1// options.lineWidth;
  let ratio = 2;//options.ratio;

  let v1 = edge.m_shape.m_vertex1;
  let v2 = edge.m_shape.m_vertex2;
console.log("test")
  let dx = v2.x - v1.x;
  let dy = v2.y - v1.y;

  let length = Math.sqrt(dx * dx + dy * dy);

  //ctx.scale(ratio, ratio);
  ctx.beginPath();
  ctx.moveTo(lw, lw);
  ctx.lineTo(lw + length, lw);

  ctx.lineCap = 'round';
  ctx.lineWidth = lw;//options.lineWidth;
  ctx.strokeStyle =  "#FF0000";//options.strokeStyle;
  ctx.stroke();
};

function drawPolygon(shape) {
  let cv = document.getElementById('js13k_canvas');
  let ctx = cv.getContext('2d');
  let lw = 1;//options.lineWidth;
  let strokeStyle = "#000000";
  let ratio = 2;//options.ratio;
  let scaleX = 1;
  let scaleY = 1;

  let vertices = shape.m_vertices;

  if (!vertices.length) {
    return;
  }

  let minX = Infinity, minY = Infinity;
  let maxX = -Infinity, maxY = -Infinity;

  for (let i = 0; i < vertices.length; ++i) {
    let v = vertices[i];
    minX = Math.min(minX, v.x);
    maxX = Math.max(maxX, v.x);
    minY = Math.min(minY, scaleY * v.y);
    maxY = Math.max(maxY, scaleY * v.y);
  }

  //ctx.scale(ratio, ratio);
  ctx.beginPath();
  for (let i = 0; i < vertices.length; ++i) {
    let v = vertices[i];
    let x = v.x - minX + lw;
    let y = scaleY * v.y - minY + lw;
    if (i == 0)
      ctx.moveTo(x, y);
    else
      ctx.lineTo(x, y);
  }

  if (vertices.length > 2) {
    ctx.closePath();
  }

  // if (options.fillStyle) {
  //   ctx.fillStyle = '';//options.fillStyle;
  //   ctx.fill();
  //   ctx.closePath();
  // }

  ctx.lineCap = 'round';
  ctx.lineWidth = lw;//options.lineWidth;
  ctx.strokeStyle = strokeStyle;
  ctx.stroke();
};

function step() {
  // in each frame call world.step(timeStep) with fixed timeStep
  world.step(1 / 60);

  // iterate over bodies and fixtures
  for (let body = world.getBodyList(); body; body = body.getNext()) {
    for (let fixture = body.getFixtureList(); fixture; fixture = fixture.getNext()) {
      // draw or update fixture
      
      let type = fixture.getType();
      let shape = fixture.getShape();
      if (type == 'circle') {
        //f.ui = viewer.drawCircle(shape, options);
      }
      if (type == 'edge') {
        drawEdge(fixture);
      }
      if (type == 'polygon') {
        drawPolygon(shape);
      }
      if (type == 'chain') {
        //f.ui = viewer.drawChain(shape, options);
      }
    }
  }
  window.requestAnimationFrame(step);
};

window.requestAnimationFrame(step);
