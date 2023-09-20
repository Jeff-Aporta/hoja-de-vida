const fs = require("fs");

function interpretar_ruta(req, res, next) {
  let nodos_ruta = [];
  for (let i = 1; i < 100; i++) {
    let node = req.params[`node${i}`];
    if (node) {
      nodos_ruta.push(node);
    } else {
      break;
    }
  }
  let ultimo_nodo_ruta = nodos_ruta.pop();

  let argumentos_ruta = require("./buscar_archivo")(
    ...nodos_ruta,
    ultimo_nodo_ruta
  );

  if (!argumentos_ruta) {

    function retornar(argumentos) {
      let { profundidad } = argumentos;
      let p = [];
      for (let i = 0; i < profundidad; i++) {
        p.push("..");
      }

      let subir_a_raiz = p.join("/") + (profundidad ? "/" : "");
      return {
        info_pagina: {
          ...argumentos,
          ruta: [...nodos_ruta, ultimo_nodo_ruta].join("/"),
          extension: "",
          subir_a_raiz,
        },
      };
    }
    
    return res.redirect("/404");
  }

  let { info_pagina } = argumentos_ruta;

  if (info_pagina.extension == ".ejs") {
    return res.render(info_pagina.ruta, {
      ...argumentos_ruta,
      user: req.user,
    });
  } else {
    let { ruta } = info_pagina;
    if (fs.existsSync(ruta)) {
      let stat = fs.statSync(ruta);
      if (stat.isFile()) {
        return res.sendFile(info_pagina.ruta, { root: "./views" });
      }
    }
  }

  return res.render("ERROR", {
    info_pagina,
    titulo: "Sin vista.",
    html: `
      No hay archivo para mostrar.
    `,
  });
}

module.exports = interpretar_ruta;
