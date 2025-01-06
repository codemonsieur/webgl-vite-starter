precision highp float;

uniform float uTime;
uniform vec2 uResolution;

varying vec2 vTexCoord;

float hueToRGB(float p, float q, float t) {
    if (t < 0.0) t += 1.0;
    if (t > 1.0) t -= 1.0;
    if (t < 1.0/6.0) return p + (q - p) * 6.0 * t;
    if (t < 1.0/2.0) return q;
    if (t < 2.0/3.0) return p + (q - p) * (2.0/3.0 - t) * 6.0;
    return p;
}

vec3 HSL(float h, float s, float l) {
    vec3 rgb;
    
    if (s == 0.0) {
        rgb = vec3(l);
    } else {
        float q = l < 0.5 ? l * (1.0 + s) : l + s - l * s;
        float p = 2.0 * l - q;
        
        float h1 = h / 360.0;
        rgb.r = hueToRGB(p, q, h1 + 1.0/3.0);
        rgb.g = hueToRGB(p, q, h1);
        rgb.b = hueToRGB(p, q, h1 - 1.0/3.0);
    }
    
    return rgb;
}

void main() {
    // vec2 uv = gl_FragCoord.xy / uResolution.xy;
    // vec3 color = HSL(mod(uTime * 0.1, 360.0), 1.0, 0.5);
    vec2 uv = vTexCoord;
    // vec3 color = HSL(0.0, 1.0, sin(uv.x));
    gl_FragColor = vec4(uv.x, uv.y, 1.0, 1.0);
}