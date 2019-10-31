const fs = require('fs').promises;

class Utils {
  static async loadObjFile(path) {
    let f = await fs.readFile(__dirname + path, { encoding: 'utf-8' });
    let model = {
      vertices: [],
      normal_vertices: [],
      texture_vertices: [],
      faces: []
    };
    f = f.split('\n');
    f.forEach(line => {
      switch (line.charAt(0)) {
        case 'v':
          if (line.charAt(1) == 'n') {
            let vn = line.split(' ');
            vn.shift();
            model.normal_vertices.push([+vn[0], +vn[1], +vn[2]]);
          } else if (line.charAt(1) == 't') {
            let vt = line.split(' ');
            vt.shift();
            model.texture_vertices.push([+vt[0], +vt[1]]);
          } else {
            // Vertex
            let v = line.split(' ');
            v.shift();
            model.vertices.push([+v[0], +v[1], +v[2]]);
          }
          break;
        case 'f':
          let face = line.split(' ');
          face.shift();
          let p = [];
          face.forEach(fRef => {
            let ref = fRef.split('/');
            p.push([+ref[0], +ref[1], +ref[2]]);
          });
          model.faces.push(p);
          break;
        default:
          break;
      }
    });
    return model;
  }

  static async loadObjFile2(path) {
    let f = await fs.readFile(__dirname + path, { encoding: 'utf-8' });
    let model = {
      v: { v_components: 0, vertices: [], total: 0 },
      vn: { vn_components: 0, vertices: [], total: 0 },
      vt: { vt_components: 0, vertices: [], total: 0 },
      faces: []
    };
    f = f.split('\n');
    f.forEach(line => {
      let l = line.split(' ');
      switch (l[0]) {
        case 'v':
          l.shift();
          if (!model.v.v_components) model.v.v_components = l.length;
          for (let v of l) {
            model.v.vertices.push(+v);
            model.v.total++;
          }
          break;
        case 'vn':
          l.shift();
          if (!model.vn.vn_components) model.vn.vn_components = l.length;
          for (let vn of l) {
            model.vn.vertices.push(+vn);
            model.vn.total++;
          }
          break;
        case 'vt':
          l.shift();
          if (!model.vt.vt_components) model.vt.vt_components = l.length;
          for (let vt of l) {
            model.vt.vertices.push(+vt);
            model.vt.total++;
          }
          break;
        case 'f':
          l.shift();
          let p = [];
          l.forEach(fRef => {
            let ref = fRef.split('/');
            p.push([+ref[0], +ref[1], +ref[2]]);
          });
          model.faces.push(p);
          break;

        default:
          break;
      }
    });
    return model;
  }
}

module.exports = {
  Utils: Utils
};
