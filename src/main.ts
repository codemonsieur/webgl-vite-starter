import vert from './test.vert';
import frag from './test.frag';

import { initShaderProgram } from './shaders';
import { ProgramInfo } from './types';

(function () {
  const canvas = document.querySelector('.glslCanvas') as HTMLCanvasElement;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const gl = canvas.getContext('webgl');

  if (!gl) {
    throw new Error('WebGL not supported');
  } else {
    const shaderProgram = initShaderProgram(gl, vert, frag);

    const programInfo: ProgramInfo = {
      program: shaderProgram,
      attribLocations: {
        vertexPosition: gl.getAttribLocation(shaderProgram, 'aPosition'),
        texCoordinates: gl.getAttribLocation(shaderProgram, 'aTexCoord'),
      },
      uniformLocations: {
        uTime: gl.getUniformLocation(shaderProgram, 'uTime'),
        uResolution: gl.getUniformLocation(shaderProgram, 'uResolution'),
      },
    }

    gl.useProgram(programInfo.program);

    const vertices = new Float32Array([
      -1.0,  1.0,
       1.0,  1.0,
      -1.0, -1.0,

      -1.0, -1.0,
       1.0,  1.0,
       1.0, -1.0,

      -1.0,  1.0,
       1.0,  1.0,
      -1.0, -1.0,

       1.0,  1.0,
      -1.0, -1.0,
       1.0, -1.0,
    ]);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionLocation = programInfo.attribLocations.vertexPosition;
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const texCoordLocation = programInfo.attribLocations.texCoordinates;
    gl.enableVertexAttribArray(texCoordLocation);
    gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0);

    function resizeCanvas(gl: WebGLRenderingContext) {
      const displayWidth = window.innerWidth;
      const displayHeight = window.innerHeight;
      
      canvas.width = displayWidth;
      canvas.height = displayHeight;
      gl.viewport(0, 0, displayWidth, displayHeight);
      
      gl.uniform2f(gl.getUniformLocation(programInfo.program, 'uResolution'), displayWidth, displayHeight);
    }

    let render = (time: number) => {
      // console.log('drawing');
      gl.uniform1f(gl.getUniformLocation(programInfo.program, 'uTime'), time / 1000);
      
      gl.clearColor(0.0, 1.0, 1.0, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      requestAnimationFrame(render);
    }

    window.addEventListener('resize', () => resizeCanvas(gl));
    resizeCanvas(gl);
    requestAnimationFrame(render);
  }
})();