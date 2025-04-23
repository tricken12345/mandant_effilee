/* ----------------------------------------------
 *  template info and building dynamic keyword
 *  ---------------------------------------------- */
const cmsObject = window.cmsObject || window.polygon.cmsObject;
const IQD_varPackCustom = {
  iqdSite: 'iqdeffilee_mob',
  iqOOP: { id: 'iqadtileOOP', isMoved: false },
  disableTranslate3d: true,
  //rotationControl: { prefix: 'MM', percentageRule: '10|0:100' },
  payedUserSlots: [],
  //initialLoadedAdTiles: ['iqadtile43', 'iqadtile15'],
  servicesToLoad: {
    dataServices: [window.myGetGlobal, window.myGetEmetriq],
    otherServices: [window.myGetGeoedge],
    //headerBiddingServices: [window.myGetAdnami],
    headerBiddingInitialize: [window.myGetHeaderBidding],
    cookielessServices: [window.initializeID5],
  },
};

window.IQD_varPack = { ...IQD_varPackCustom, ...window.IQD_varPackGlobal };

window.IQD_varPack.iqdtemplateEngine.template.getHeaderHeight = () => {
  let headerHeight = 0;
  headerHeight = window.document.getElementById('header-bar').offsetHeight;
  return headerHeight;
};

// const { level2 } = window.IQD.AdController.ExecutionContext.prototype.cvars;
// const handle = AdController._handle;
let adTile;
window.adsRendered = [];

AdController.getEventDispatcher().on('render_controller', (RenderControllerEvent) => {
  adTile = RenderControllerEvent.getPositionKey();
  const firstTile = 'iqadtile1';
  console.log('IQ - firstTile ', firstTile);

  window.IQD_varPack.renderAfterDaisyBit = window.IQD_varPack.renderAfterDaisyBit || {};

  if ((IQGDPR_handle.cmp === 'true' && window.gotDaisyBit === true) || IQGDPR_handle.cmp === 'false') {
    console.log('IQ - adsRendered ', window.adsRendered);
    if (window.adsRendered.indexOf(adTile) < 0) {
      if (adTile === firstTile) {
        console.log('IQ - firstTile ', firstTile);
        console.log('IQ - adsRendered ', window.adsRendered);
        if (RenderControllerEvent.isFirstInvocation() && RenderControllerEvent.allowsDeferring()) {
          return RenderControllerEvent.wait(RenderControllerEvent.createMutex(1500, () => {
            console.log(`%c IQ - RenderControllerEvent - wait - ${adTile}`, 'background: #222; color: #ffffff');
            return typeof window.delayedData !== 'undefined';
          }));
        }
        console.log(`%c IQ - RenderControllerEvent - render -${adTile}`, 'background: #222; color: #ffffff');
        console.log('IQ - adsRendered ', window.adsRendered);
        window.adsRendered.push(adTile);
        return RenderControllerEvent.now();
      }

      /* Skip rendering of all ad places for full paying guests */
      if ((IQD.AdController.ExecutionContext.prototype.cvars.keywords.indexOf('iqdnoads') !== -1)) {
        return RenderControllerEvent.skip();
      }
      console.log(`%c IQ - RenderControllerEvent - render -${adTile}`, 'background: #222; color: #ffffff');
      window.adsRendered.push(adTile);
      return RenderControllerEvent.now();
    }
    console.log('IQ - adTile is already been rendered');
    return RenderControllerEvent.skip();
  }
  window.IQD_varPack.renderAfterDaisyBit[RenderControllerEvent.getPositionKey()] = 'skip';
  console.log(`%c IQ - RenderControllerEvent - skip - ${adTile}`, 'background: #222; color: #ffffff');
  return RenderControllerEvent.skip();
});

/* ### Reload-Handle ### */
window.IQD_ReloadHandle = () => {
  console.log('IQ - ReloadHandle');

  window.adsRendered = [];

  if (window.IQD_varPack.hasOwnProperty('tplfn2clr') && window.IQD_varPack.tplfn2clr.hasOwnProperty('length')) {
    window.IQD_varPack.tplfn2clr.forEach((tmpObj) => {
      const [pObj, pType, pFn] = tmpObj;
      window.IQD_varPack.removeEvent(pObj, pType, pFn);
    });
  }
  if (window.IQD_varPack.hasOwnProperty('fn2clr') && window.IQD_varPack.fn2clr.hasOwnProperty('length')) {
    window.IQD_varPack.fn2clr.forEach((tmpObj) => {
      const [pObj, pType, pFn] = tmpObj;
      window.IQD_varPack.removeEvent(pObj, pType, pFn);
    });
  }

  // window.IQD.Events.clearAllEvents();
  // window.IQD.Views.resetForReloadHandle();
  // window.IQD.Slots.resetForReloadHandle();

  if (document.querySelector('#iqStyleContainer')) {
    const domIqStyleContainerChildren = document.querySelector('#iqStyleContainer').childNodes;
    const child = [];
    for (let i = 0; i < domIqStyleContainerChildren.length; i++) {
      if (typeof (domIqStyleContainerChildren[i]) === 'object') {
        child.push(domIqStyleContainerChildren[i]);
      }
    }
    for (let j = 0; j < child.length; j++) {
      document.querySelector('#iqStyleContainer').removeChild(child[j]);
    }
  }

  for (let i = 0, l = window.IQD_varPack.adReloadHandle.length; i < l; i++) {
    if (window.IQD_varPack.adReloadHandle[i].setComputedStyles === 'true') {
      if (window.IQD_varPack.adReloadHandle[i].adNodes.length >= 0) {
        console.log(`### ${window.IQD_varPack.adReloadHandle[i].adNodes.length}`);
        for (let j = 0, k = window.IQD_varPack.adReloadHandle[i].adNodes.length; j < k; j++) {
          console.log('window.IQD_varPack.adReloadHandle[i]', window.IQD_varPack.adReloadHandle[i]);
          if (document.getElementById(window.IQD_varPack.adReloadHandle[i].adNodes[j])) {
            console.log(document.getElementById(window.IQD_varPack.adReloadHandle[i].adNodes[j]));
            document.getElementById(window.IQD_varPack.adReloadHandle[i].adNodes[j]).remove();
          }
        }
      }
      document.body.style.backgroundImage = '';
      document.body.style.background = '';
    }
  }

  if (document.getElementById('iqadtile21')) {
    // window.IQD.Utils.setStyleInContainer('#iqadtile21 {width:auto !important; min-width:160px !important; top:auto !important;}');
    document.getElementById('iqadtile21').removeAttribute('style');
  }
  if (document.getElementById('iqadtile20')) {
    // window.IQD.Utils.setStyleInContainer('#iqadtile20 {width:auto !important; min-width:160px !important; top:auto !important;}');
    document.getElementById('iqadtile20').removeAttribute('style');
  }
  if (document.getElementById('iqadtile1')) {
    // window.IQD.Utils.setStyleInContainer('#iqadtile1 {width:auto !important; min-width:728px !important; top:auto !important;}');
    document.getElementById('iqadtile1').removeAttribute('style');
  }

  window.IQD_varPack.removeAllIqSlotClasses();
  // setNoAdSlotIdentifier();

  // window.IQD_varPack.iqd_TestKW = '';
  window.tile2IsRendered = false;
  window.competingSpecialAd = true;
  window.tile1Rendering = false;
  window.tile111Special = false;
  window.IQD_varPack.adReloadHandle = [];
  window.IQD_varPack.ausbuchung = {};
  window.IQD_varPack.ad = {};

  window.IQDAO.cridCache = [];
  // IQDAO.AdIdFrame.loadCridAssets();
  //  window.IQD.ReloadHandle.resetAll();

  if (window.IQD_varPack.iqd_TestKW === 'iqviewadplace') {
    window.setIqViewPlaceStyles();
  }
  AdController.reinitialize(cmsObject);
  AdController.startLoadCycle();
  window.assignIqadtileInViewObserver();
};

const startReload = (event) => {
  try {
    if (event.origin === 'https://www.effilee.de') {
      if (event.data === 'iq_refresh_ads') {
        window.consoleOutput('%c[iqd] - local.js - IQ - receive iq_refresh_ads', 'background-color: green; color: white;');
        window.IQD_ReloadHandle();
      }

      if (event.data === 'iq_create_dynamic_positions') {
        window.consoleOutput('%c[iqd] - local.js - IQ - receive iq_create_dynamic_positions', 'background-color: green; color: white;');
        window.createDynamicPositions();
        window.assignIqadtileInViewObserver();
      }

      if (event.data === 'iq_remove_dynamic_positions') {
        window.consoleOutput('%c[iqd] - local.js - IQ - receive iq_remove_dynamic_positions', 'background-color: green; color: white;');
        window.deleteDynamicPositions();
      }
    }
  } catch (e) { console.log('Error in startReload()', e); }
};

/* receive messages from publisher */
const setEvents = () => {
  window.addEventListener('message', startReload);
};
setEvents();
/* ### End Reload-Handle ### */