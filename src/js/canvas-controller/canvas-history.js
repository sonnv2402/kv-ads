(function () {

    var canvasLocalStorageKey = 'Kv_Ads_canvas';

    function CanvasHistory() {
        this.canvasIndex = 0;
    }


    CanvasHistory.prototype = {
        addHistory: function (canvas) {
            addCanvasHistory(canvasLocalStorageKey, canvas);
        }
        , getPreviousCanvas: function () {
            var canvases = getCanvasHistory(canvasLocalStorageKey);
            if (canvases && this.canvasIndex < canvases.length) {
                var json = getCanvasHistory(canvasLocalStorageKey, canvases.length - 1 - this.canvasIndex - 1);
                this.canvasIndex++;
                return json;
            }

            return null;
        }
        , getNextCanvas: function () {
            var canvases = getCanvasHistory(canvasLocalStorageKey);
            if (canvases && this.canvasIndex > 0) {
                var json = getCanvasHistory(canvasLocalStorageKey, canvases.length - 1 - this.canvasIndex + 1);
                this.canvasIndex--;
                return json;
            }

            return null;
        }
        , deleteLastItem: function () {
            setTimeout(function () {
                var canvases = getCanvasHistory(canvasLocalStorageKey);
                if (!canvases) {
                    return;
                }
                canvases.pop();
                saveCanvasHistory(canvasLocalStorageKey, canvases);
            }, 0);
        }
        , clearCanvasHistory: function () {
            clearHistory(canvasLocalStorageKey);
        }
    }
    
    function getCanvasHistory(key, index) {
        var existCanvas = localStorage.getItem(key);
        if (!existCanvas) {
            return null;
        }

        var canvases = JSON.parse(existCanvas);
        return typeof(index) != 'undefined' ? canvases[index] : canvases;
    }

    function addCanvasHistory(key, canvas) {
        var canvases = [];
        var existCanvas = localStorage.getItem(key);
        if (existCanvas) {
            canvases = JSON.parse(existCanvas);
        }

        canvases.push(canvas);
        localStorage.setItem(key, JSON.stringify(canvases));
    }

    function saveCanvasHistory(key, canvases) {
        localStorage.setItem(key, JSON.stringify(canvases));
    }

    function clearHistory(key) {
        localStorage.removeItem(key);
    }

    window.CanvasHistory = CanvasHistory;
})()