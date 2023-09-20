Date.prototype.yyyymmddhhmmss = function () {
        let formateado = [[this.getFullYear(), this.getMonth() + 1, this.getDate()], [this.getHours(), this.getMinutes(), this.getSeconds()]].map(e => e.map(e => e.toString().padStart(2, 0)));
        return formateado[0].join("-") + " " + formateado[1].join(":");
    };
    
    Date.prototype.yyyymmdd = function () {
        let formateado = [this.getFullYear(), this.getMonth() + 1, this.getDate()].map(e => e.toString().padStart(2, 0));
        return formateado.join("-");
    };
    
    Number.prototype.formatMoney = function (n, x) {
        var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
        return "$" + this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&.');
    };
    
    String.prototype.eliminarHTML = function() {
        return this.replace( /(<([^>]+)>)/ig, '');
    };
    
    String.prototype.parsearAFecha = function () {
        return new Date(Date.parse(this));
    };
    
    String.prototype.yyyymmdd = function () {
        return this.parsearAFecha().yyyymmdd();
    };
    
    String.prototype.yyyymmddhhmmss = function () {
        return this.parsearAFecha().yyyymmddhhmmss();
    };
    