// Fragment shader

varying highp vec2 vTextureCoord;

uniform sampler2D uSampler;

void main(void) {
  //0.6/0.6/0.7
  gl_FragColor = texture2D(uSampler, vTextureCoord);
}