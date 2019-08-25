import planck from 'planck-js'

// let cv = document.getElementById('js13k_canvas');
// let ctx = cv.getContext('2d');
// ctx.scale(4,4)

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
for (let i = 0; i < 3; ++i) {
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


function drawEdge(ctx, edge, position, angle, linewidth, strokeStyle) {
  let v1 = edge.m_shape.m_vertex1;
  let v2 = edge.m_shape.m_vertex2;
3
  let dx = v2.x - v1.x;
  let dy = v2.y - v1.y;

  let length = Math.sqrt(dx * dx + dy * dy);

  ctx.save();
  ctx.translate(position.x, position.y);
  ctx.rotate(angle);
  ctx.scale(4,4);

  ctx.beginPath();
  ctx.moveTo(linewidth, linewidth);
  ctx.lineTo(linewidth + length, linewidth);

  ctx.lineCap = 'round';
  ctx.lineWidth = linewidth;
  ctx.strokeStyle =  strokeStyle;
  ctx.stroke();

  ctx.restore();
};

function drawPolygon(ctx, shape, position, angle, linewidth, strokeStyle, scaleY) {
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

  ctx.save();
  ctx.translate(position.x, position.y);
  ctx.rotate(angle);
  ctx.scale(4,4);

  ctx.beginPath();
  for (let i = 0; i < vertices.length; ++i) {
    let v = vertices[i];
    let x = v.x - minX + linewidth;
    let y = scaleY * v.y - minY + linewidth;
    if (i == 0)
      ctx.moveTo(x, y);
    else
      ctx.lineTo(x, y);
  }

  if (vertices.length > 2) {
    ctx.closePath();
  }

  ctx.lineCap = 'round';
  ctx.lineWidth = linewidth;
  ctx.strokeStyle = strokeStyle;
  ctx.stroke();

  ctx.restore();
};

function step() {
  // in each frame call world.step(timeStep) with fixed timeStep
  world.step(1 / 60);

  let canvas = document.getElementById('js13k_canvas');
  let context = canvas.getContext('2d');
  context.save();

  // Use the identity matrix while clearing the canvas
  context.setTransform(1, 0, 0, 1, 0, 0);
  context.clearRect(0, 0, canvas.width, canvas.height);
  
  // Restore the transform
  context.restore();

  for (let body = world.getBodyList(); body; body = body.getNext()) {
    for (let fixture = body.getFixtureList(); fixture; fixture = fixture.getNext()) {
      // draw or update fixture
      
      let type = fixture.getType();
      let shape = fixture.getShape();
      let position = body.getPosition();
      let rotation = body.getAngle();

      if (type == 'circle') {
        //f.ui = viewer.drawCircle(shape, options);
      }
      if (type == 'edge') {
        drawEdge(context, fixture, position, rotation, 2, "#FF0000");
      }
      if (type == 'polygon') {
        drawPolygon(context, shape, position, rotation, 2, "#000000", -1);
      }
      if (type == 'chain') {
        //f.ui = viewer.drawChain(shape, options);
      }
    }
  }
  window.requestAnimationFrame(step);
};

window.requestAnimationFrame(step);
