/* ---------------------------------------------- *template info and building dynamic keyword* ---------------------------------------------- */
const cmsObject = window.cmsObject || window.polygon.cmsObject;
window.tile2IsRendered = false;
window.competingSpecialAd = true;
window.tile1Rendering = false;
window.tile111Special = false;

const IQD_varPackCustom = {
  iqdSite: 'iqdeffilee',
  iqdSiteWrapper: 'iqd_topAd',
  iqdSiteInfo: [
    [
      1020,
      0,
      0,
    ],
    [
      0,
      0,
      1020,
    ],
    [
      0,
      0,
      1020,
    ],
    [
      'center',
      'fullBodyBg',
    ],
    [
      'y',
      'y',
      'y',
    ],
  ],
  //initialLoadedAdTiles: ['iqadtile53', 'iqadtile15'],
  //rotationControl: { prefix: 'MM', percentageRule: '10|0:100' },
  adSlotLabelCss: {
    cssSitebar: "content: 'Anzeige';position: relative;display: block;width: 100%; max-width: 1000px; margin: 0 auto;font-size: 12px;text-indent: 0.5rem; text-transform: uppercase; font-family: SPIEGEL Sans UI, Arial, Verdana, Helvetica, sans-serif;line-height: 32px; white-space: nowrap; color: #807E7C;}",
    cssStickyBB: "content: 'Anzeige';position: relative;display: block;width: 100%; max-width: 1000px; margin: 0 auto;font-size: 12px;text-indent: 0.5rem; text-transform: uppercase; font-family: SPIEGEL Sans UI, Arial, Verdana, Helvetica, sans-serif;line-height: 32px; white-space: nowrap; color: #807E7C; background-color: #F1EFED;}",
  },
  outsideTop: parseInt(0, 10),
  outsideLeft: parseInt(0, 10),
  outsideRight: parseInt(0, 10),
  outsideSafeArea: parseInt(10, 10),
  outsideBottom: 'auto',
  intersectionElements: {
    header: 'header',
    headerInitial: 'nav',
    footer: 'footer',
  },
  headerStickyDetector: '.is-headerbar-collapsed',
  adSlotLabelHeight: 7,
  availableInnerHeight: window.innerHeight,
  availableInnerHeightPur: window.innerHeight,
  servicesToLoad: {
    dataServices: [window.myGetGlobal, window.myGetEmetriq],
    otherServices: [window.myGetGeoedge],
    //headerBiddingServices: [window.myGetAdnami],
    headerBiddingInitialize: [window.myGetHeaderBidding],
    cookielessServices: [window.initializeID5],
  },
};

window.IQD_varPack = { ...IQD_varPackCustom, ...window.IQD_varPackGlobal };

/* Override standard  window.IQD_varPack.adSlotLabel values für tile1,111,20,21 */
window.IQD_varPack.adSlotLabel.iqadtile1 = true;
window.IQD_varPack.adSlotLabel.iqadtile111 = false;
window.IQD_varPack.adSlotLabel.iqadtile21 = false;
window.IQD_varPack.adSlotLabel.iqadtile20 = false;

// const header = document.querySelector(window.IQD_varPack.intersectionElements.header);
// const footer = document.querySelector(window.IQD_varPack.intersectionElements.footer);

// const { level2 } = window.IQD.AdController.ExecutionContext.prototype.cvars;
// const handle = AdController._handle;
let adTile;
window.adsRendered = [];

AdController.getEventDispatcher().on('render_controller', (RenderControllerEvent) => {
  adTile = RenderControllerEvent.getPositionKey();
  const firstTile = (AdController._handle === 'homepage') ? 'iqadtile111' : 'iqadtile1';

  window.IQD_varPack.renderAfterDaisyBit = window.IQD_varPack.renderAfterDaisyBit || {};

  if ((IQGDPR_handle.cmp === 'true' && window.gotDaisyBit === true) || IQGDPR_handle.cmp === 'false') {
    window.consoleOutput('%c[iqd] - local.js - IQ - adsRendered', 'background-color: green; color: white;', window.adsRendered);
    if (window.adsRendered.indexOf(adTile) < 0) {
      if (adTile === firstTile) {
        if (RenderControllerEvent.isFirstInvocation() && RenderControllerEvent.allowsDeferring()) {
          return RenderControllerEvent.wait(RenderControllerEvent.createMutex(2000, () => {
            window.consoleOutput(`%c[iqd] - local.js - IQ - RenderControllerEvent - wait - ${adTile}`, 'background: #222; color: #ffffff');
            return typeof window.delayedData !== 'undefined';
          }));
        }
        window.consoleOutput(`%c[iqd] - local.js - IQ - RenderControllerEvent - render - ${adTile}`, 'background: #222; color: #ffffff');
        window.adsRendered.push(adTile);
        return RenderControllerEvent.now();
      } if (AdController._handle === 'homepage' && adTile === 'iqadtile1' && !window.tile1Rendering) {
        return RenderControllerEvent.skip();
      } if (adTile === 'iqadtile20' && !window.tile2IsRendered) {
        window.consoleOutput(`%c[iqd] - local.js - IQ - RenderControllerEvent - skip - ${adTile}`, 'background: #222; color: #ffffff');
        return RenderControllerEvent.skip();
      } if (adTile === 'iqadtile21' && !window.tile2IsRendered) {
        window.consoleOutput(`%c[iqd] - local.js - IQ - RenderControllerEvent - skip - ${adTile}`, 'background: #222; color: #ffffff');
        return RenderControllerEvent.skip();
      }
      window.consoleOutput(`%c[iqd] - local.js - IQ - RenderControllerEvent - render - ${adTile}`, 'background: #222; color: #ffffff');
      window.adsRendered.push(adTile);
      return RenderControllerEvent.now();
    }
    window.consoleOutput('%c[iqd] - local.js - IQ - adTile is already been rendered', 'background-color: green; color: white;');
    return RenderControllerEvent.skip();
  }
  window.IQD_varPack.renderAfterDaisyBit[RenderControllerEvent.getPositionKey()] = 'skip';
  window.consoleOutput(`%c[iqd] - local.js - IQ - RenderControllerEvent - skip - ${adTile}`, 'background: #222; color: #ffffff');
  return RenderControllerEvent.skip();
});

const setSkyTop = () => {
  const topContainer = document.querySelector('[data-advertisement^="pos_1 desktop"]');
  const navigation = document.querySelector('body > nav');
  const navigationSticky = document.querySelector('header.sticky');

  const topContainerTop = topContainer.getBoundingClientRect().top;
  const navigationBottom = navigation.getBoundingClientRect().bottom;
  const navigationStickyBottom = navigationSticky.getBoundingClientRect().bottom;

  const highest = Math.max(topContainerTop, navigationBottom, navigationStickyBottom, 0);
  //console.log('#### HighestValue #### :', highest);
  return highest;
};

window.IQD_varPack.skyConfig = {
  align: '#iqd_align_Ad',
  margin: 10,
  headerBottomCallback: setSkyTop,
};

let itmst0;
const acLast = () => {
  const itm = document.body || false;
  if (itm) {
    const mys = document.createElement('script');
    mys.type = 'text/javascript';
    mys.innerHTML = 'var IQDComplete = {init: function () {return true;}};if(typeof AdController !== "undefined"){AdController.finalize();}';
    itm.appendChild(mys);

    clearInterval(itmst0);
  }
};

itmst0 = setInterval(acLast, 200);

/* ### Reload-Handle ### */
window.IQD_ReloadHandle = () => {
  window.consoleOutput('%c[iqd] - local.js - IQ - ReloadHandle', 'background-color: green; color: white;');

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
        window.consoleOutput(`%c[iqd] - local.js - ### ${window.IQD_varPack.adReloadHandle[i].adNodes.length}`, 'background-color: green; color: white;');
        for (let j = 0, k = window.IQD_varPack.adReloadHandle[i].adNodes.length; j < k; j++) {
          window.consoleOutput('%c[iqd] - local.js - window.IQD_varPack.adReloadHandle[i]', 'background-color: green; color: white;', window.IQD_varPack.adReloadHandle[i]);
          if (document.getElementById(window.IQD_varPack.adReloadHandle[i].adNodes[j])) {
            window.consoleOutput('%c[iqd] - local.js - document.getElementById(window.IQD_varPack.adReloadHandle[i].adNodes[j])', 'background-color: green; color: white;', document.getElementById(window.IQD_varPack.adReloadHandle[i].adNodes[j]));
            document.getElementById(window.IQD_varPack.adReloadHandle[i].adNodes[j]).remove();
          }
        }
      }
      document.body.style.backgroundImage = '';
      document.body.style.background = '';
    }
  }

  if (document.getElementById('iqadtile21')) {
    document.getElementById('iqadtile21').removeAttribute('style');
  }
  if (document.getElementById('iqadtile20')) {
    document.getElementById('iqadtile20').removeAttribute('style');
  }
  if (document.getElementById('iqadtile1')) {
    document.getElementById('iqadtile1').removeAttribute('style');
  }

  window.IQD_varPack.removeAllIqSlotClasses();

  // window.IQD_varPack.iqd_TestKW = '';
  window.tile2IsRendered = false;
  window.competingSpecialAd = true;
  window.tile1Rendering = false;
  window.tile111Special = false;
  window.IQD_varPack.adReloadHandle = [];
  window.IQD_varPack.ausbuchung = {};
  window.IQD_varPack.ad = {};

  window.IQDAO.cridCache = [];

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
  if (document.querySelector('#header-bar')) {
    document.querySelector('#header-bar').addEventListener('transitionend', () => {
      window.IQD.SkyMover.computeTopPositions();
      window.IQD.SkyMover.announcePosition();
    });
    document.querySelector('#header-bar').addEventListener('transitionstart', () => {
      window.IQD.SkyMover.computeTopPositions();
      window.IQD.SkyMover.announcePosition();
    });
  }
  window.addEventListener('message', startReload);
};
setEvents();
/* ### End Reload-Handle ### */