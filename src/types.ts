type ProgramInfo = {
    program: WebGLProgram;
    attribLocations: {
        vertexPosition: number;
        texCoordinates: number;
    };
    uniformLocations: {
        uTime: WebGLUniformLocation | null;
        uResolution: WebGLUniformLocation | null;
    };
}

export type { ProgramInfo };