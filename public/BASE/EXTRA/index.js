const EXTRA = (() => {
        let ELEMENTO_EN_PANTALLA_COMPLETA;

        var fs = function () {
                if (document.fullscreenElement !== undefined) {
                        return document.fullscreenElement;
                }
                if (document.webkitFullscreenElement !== undefined) {
                        return document.webkitFullscreenElement;
                }
                if (document.mozFullScreenElement !== undefined) {
                        return document.mozFullScreenElement;
                }
                if (document.msFullscreenElement !== undefined) {
                        return document.msFullscreenElement;
                }
        }
        if (fs() === undefined) {
                ELEMENTO_EN_PANTALLA_COMPLETA = undefined;
        } else {
                ELEMENTO_EN_PANTALLA_COMPLETA = fs;
        }

        const SEGUNDOS_A_STRING = (segundos) => {
                return [parseInt(segundos / 60 / 60), parseInt(segundos / 60) % 60, segundos % 60].map(e => e.toString().padStart(2, 0)).join(":");
        }

        const STRING_A_SEGUNDOS = (cadenaTiempo) => {
                let [horas, minutos, segundos] = cadenaTiempo.split(":").map(e => parseFloat(e))
                return horas * 60 * 60 + minutos * 60 + segundos;
        }

        const CONCAT = (...objetos) => {
                return objetos.reduce((retorno, objeto) => {
                        return { ...retorno, ...objeto };
                }, {});
        }

        const ID_ALEATORIO = () => {
                return Math.random().toString().replaceAll("0.", "id-")
        }

        const HOY = () => {
                let fecha = new Date();
                let diaSemanaNombre = ['Domingo', 'Lunes', 'Martes', 'Mi&eacute;rcoles', 'Jueves', 'Viernes', 'S&aacute;bado'][fecha.getDay()];
                let diaMes = fecha.getDate();
                let mesNombre = new Intl.DateTimeFormat('es-ES', { month: 'long' }).format(fecha);
                let Y = fecha.getFullYear();
                return {
                        fecha,
                        diaSemanaNombre,
                        diaMes,
                        mesNombre,
                        Y
                }
        }

        return {
                ELEMENTO_EN_PANTALLA_COMPLETA,
                OBJETOS: {
                        CONCAT
                },
                TEXTO: {
                        NOMBRADO: {
                                kebab2camel: s => s.replace(/-./g, x => x[1].toUpperCase()),
                                camel2kebab: str => str.replace(/[A-Z]+(?![a-z])|[A-Z]/g, ($, ofs) => (ofs ? "-" : "") + $.toLowerCase()),
                        },
                        ID_ALEATORIO
                },
                TIEMPO: {
                        HOY,
                        HOY_FORMATO: {
                                //Jueves / 15 de junio de 2023
                                diaSemanaNombre_S_diaMes_de_mesNombre_de_Y: () => {
                                        let fecha = HOY();
                                        return fecha.diaSemanaNombre + " / " + fecha.diaMes + " de " + fecha.mesNombre + " de " + fecha.Y;
                                }
                        },
                        SEGUNDOS_A_STRING,
                        STRING_A_SEGUNDOS,
                        HORA_ACTUAL: {
                                STRING: () => {//00:00:00
                                        let fecha = new Date();
                                        return [fecha.getHours(), fecha.getMinutes(), fecha.getSeconds()].map(e => e.toString().padStart(2, 0)).join(":");
                                },
                                SEGUNDOS: () => {//01:01:01 -> 3661
                                        let fecha = new Date();
                                        return [fecha.getHours() * 60 * 60, fecha.getMinutes() * 60, fecha.getSeconds()].reduce((suma, s) => suma + s, 0)
                                }
                        },
                }
        };
})();