window.limitHeaderBidsByHandle = function(acpvars, acpvarsenabled) {
    var acl = AdController.getConfig().resolve('').getVar('level1'),
        includeTilesHandle = {},
        includeTiles = [];

        if (acl == "iqdmanagermagazin") {
            includeTilesHandle = {
                /*homepage: ["iqadtile41","iqadtile51","iqadtile42","iqadtile52","iqadtile43","iqadtile53","iqadtile16","iqadtile6"],*/
               /* index: ["iqadtile41","iqadtile51","iqadtile16"]*/
            }
            includeTiles = includeTilesHandle[AdController._handle] || ["iqadtile1","iqadtile4","iqadtile41","iqadtile42","iqadtile43","iqadtile5","iqadtile51","iqadtile52","iqadtile53","iqadtile8","iqadtile9","iqadtile16","iqadtile21","iqadtile20"];
        }else if (acl == "iqdmanagermagazin_mob") {
            includeTilesHandle = {
                /*homepage: ["iqadtile41","iqadtile42","iqadtile43","iqadtile5","iqadtile51","iqadtile52","iqadtile8","iqadtile6"],*/
               /* index: ["iqadtile41","iqadtile5","iqadtile6","iqadtile8"]*/
            }
            includeTiles = includeTilesHandle[AdController._handle] || ["iqadtile1","iqadtile3","iqadtile4","iqadtile41","iqadtile42","iqadtile43","iqadtile5","iqadtile51","iqadtile52","iqadtile53","iqadtile7","iqadtile8"];
        }

	for (var i in acpvars) {
        if (acpvars[i].enabled && includeTiles.indexOf(i) !== -1) {
            acpvarsenabled.push(acpvars[i]);
        }
    }
    return acpvarsenabled;
}

/*
    BiddersList(true, ["yieldlab"]) -> ALLE Bidder sind deaktiviert, nur yieldlab ist aktiviert.
    BiddersList(false, ["orbidder", "ias"]) -> ALLE Bidder sind aktiviert, nur orbidder und ias sind deaktiviert.
    BiddersList(false) -> ALLE Bidder sind aktiviert. (Nichts wird mit false überschrieben)'
    BiddersList(true) -> ALLE Bidder sind deaktiviert. (Nichts wird mit true überschrieben)
*/
window.IQD = (window.IQD) ? window.IQD : {};
window.IQD.PA_HB = (window.IQD.PA_HB) ? window.IQD.PA_HB : {};
window.IQD.PA_HB.getBiddersPerAdapterConfig = function () {
    return {
        GPT: {
            default: IQD.PA_HB.BiddersList(false),
            interaktiv: IQD.PA_HB.BiddersList(true, ["ias"])
        },
        AST: {
            default: IQD.PA_HB.BiddersList(true)
        }
    }
}