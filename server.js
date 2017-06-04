const koa = require('koa');
const router = require('koa-router');
const cors = require('koa2-cors');
const Pusher = require('pusher');
const Pug = require('koa-pug');
const app = new koa();
const Router = new router();
const pug = new Pug({
  viewPath: './public',
  basedir: './public',
  app: app 
});

let orderPair = 'BTC_XMR';

const pusher = new Pusher({
  appId: process.env.APPID,
  key: process.env.KEY,
  secret: process.env.SECRET,
  encrypted: true
});

app.use(cors());
Router.get('/',home);
Router.get('/charts/:pair',chart);

Router.get('/BTC_XMR',btcXmr);
Router.get('/BTC_XRP',btcXrp);
Router.get('/BTC_ETH',btcEth);
Router.get('/BTC_LTC',btcLtc);
Router.get('/BTC_STR',btcStr);
Router.get('/BTC_ETC',btcEtc);
Router.get('/BTC_XEM',btcXem);
Router.get('/BTC_SC',btcSc);
Router.get('/BTC_BCN',btcBcn);
Router.get('/BTC_DGB',btcDgb);
Router.get('/BTC_DOGE',btcDoge);
Router.get('/BTC_GNT',btcGnt);
Router.get('/BTC_BTS',btcBts);
Router.get('/BTC_STEEM',btcSteem);
Router.get('/BTC_DASH',btcDash);
Router.get('/BTC_GAME',btcGame);
Router.get('/BTC_DCR',btcDcr);
Router.get('/BTC_BURST',btcBurst);
Router.get('/BTC_STRAT',btcStrat);
Router.get('/BTC_FCT',btcFct);
Router.get('/BTC_ARDR',btcArdr);
Router.get('/BTC_VTC',btcVtc);
Router.get('/BTC_MAID',btcMaid);
Router.get('/BTC_SYS',btcSys);
Router.get('/BTC_ZEC',btcZec);
Router.get('/BTC_SJCX',btcSjcx);
Router.get('/BTC_CLAM',btcClam);
Router.get('/BTC_BELA',btcBela);
Router.get('/BTC_LSK',btcLsk);
Router.get('/BTC_XCP',btcXcp);
Router.get('/BTC_GNO',btcGno);
Router.get('/BTC_FLO',btcFlo);
Router.get('/BTC_LBC',btcLbc);
Router.get('/BTC_EXP',btcExp);
Router.get('/BTC_REP',btcRep);
Router.get('/BTC_GRC',btcGrc);
Router.get('/BTC_NAV',btcNav);
Router.get('/BTC_RADS',btcRads);
Router.get('/BTC_NAUT',btcNaut);
Router.get('/BTC_NEOS',btcNeos);
Router.get('/BTC_POT',btcPot);
Router.get('/BTC_FLDC',btcFldc);
Router.get('/BTC_AMP',btcAmp);
Router.get('/BTC_PINK',btcPink);
Router.get('/BTC_VIA',btcVia);
Router.get('/BTC_PPC',btcPpc);
Router.get('/BTC_BCY',btcBcy);
Router.get('/BTC_EMC2',btcEmctwo);
Router.get('/BTC_NXC',btcNxc);
Router.get('/BTC_HUC',btcHuc);
Router.get('/BTC_SBD',btcSbd);
Router.get('/BTC_PASC',btcPasc);
Router.get('/BTC_NOTE',btcNote);
Router.get('/BTC_RIC',btcRic);
Router.get('/BTC_BTCD',btcBtcd);
Router.get('/BTC_NMC',btcNmc);
Router.get('/BTC_BLK',btcBlk);
Router.get('/BTC_VRC',btcVrc);
Router.get('/BTC_XBC',btcXbc);
Router.get('/BTC_XVC',btcXvc);
Router.get('/BTC_BTM',btcBtm);
Router.get('/BTC_XPM',btcXpm);
Router.get('/BTC_OMNI',btcOmni);
Router.get('/BTC_NXT',btcNxt);

Router.get('/ETH_GNT',ethGnt);
Router.get('/ETH_ZEC',ethZec);
Router.get('/ETH_ETC',ethEtc);
Router.get('/ETH_GNO',ethGno);
Router.get('/ETH_STEEM',ethSteem);
Router.get('/ETH_REP',ethRep);
Router.get('/ETH_LSK',ethLsk);

Router.get('/XMR_LTC',xmrLtc);
Router.get('/XMR_ZEC',xmrZec);
Router.get('/XMR_DASH',xmrDash);
Router.get('/XMR_BCN',xmrBcn);
Router.get('/XMR_NXT',xmrNxt);
Router.get('/XMR_MAID',xmrMaid);
Router.get('/XMR_BTCD',xmrBtcd);
Router.get('/XMR_BLK',xmrBlk);

Router.get('/USDT_BTC',usdtBtc);
Router.get('/USDT_XRP',usdtXrp);
Router.get('/USDT_ETH',usdtEth);
Router.get('/USDT_LTC',usdtLtc);
Router.get('/USDT_STR',usdtStr);
Router.get('/USDT_ETC',usdtEtc);
Router.get('/USDT_XMR',usdtXmr);
Router.get('/USDT_DASH',usdtDash);
Router.get('/USDT_ZEC',usdtZec);
Router.get('/USDT_NXT',usdtNxt);
Router.get('/USDT_REP',usdtRep);

Router.get('/trollbox',(ctx) => {ctx.body = data.trollbox;});

let data = {
  btcxmr: [],
  btcxrp: [],
  btceth: [],
  btcltc: [],
  btcstr: [],
  btcetc: [],
  btcxem: [],
  btcsc: [],
  btcbcn: [],
  btcdgb: [],
  btcdoge: [],
  btcgnt: [],
  btcbts: [],
  btcsteem: [],
  btcdash: [],
  btcgame: [],
  btcdcr: [],
  btcburst: [],
  btcstrat: [],
  btcfct: [],
  btcardr: [],
  btcvtc: [],
  btcmaid: [],
  btcsys: [],
  btczec: [],
  btcsjcx: [],
  btcclam: [],
  btcbela: [],
  btclsk: [],
  btcxcp: [],
  btcgno: [],
  btcflo: [],
  btclbc: [],
  btcexp: [],
  btcrep: [],
  btcgrc: [],
  btcnav: [],
  btcrads: [],
  btcnaut: [],
  btcneos: [],
  btcpot: [],
  btcfldc: [],
  btcamp: [],
  btcpink: [],
  btcvia: [],
  btcppc: [],
  btcbcy: [],
  btcemctwo: [],
  btcnxc: [],
  btchuc: [],
  btcsbd: [],
  btcpasc: [],
  btcric: [],
  btcnote: [],
  btcbtcd: [],
  btcnmc: [],
  btcblk: [],
  btcvrc: [],
  btcxbc: [],
  btcxvc: [],
  btcbtm: [],
  btcxpm: [],
  btcomni: [],
  btcnxt: [],
  
  ethgnt: [],
  ethzec: [],
  ethetc: [],
  ethgno: [],
  ethsteem: [],
  ethrep: [],
  ethlsk: [],
  
  xmrltc: [],
  xmrzec: [],
  xmrdash: [], 
  xmrbcn: [], 
  xmrnxt: [],
  xmrmaid: [],
  xmrbtcd: [],
  xmrblk: [], 
  
  usdtbtc: [],
  usdtxrp: [],
  usdteth: [], 
  usdtltc: [], 
  usdtetc: [],
  usdtstr: [],
  usdtxmr: [],
  usdtdash: [], 
  usdtzec: [],
  usdtnxt: [],
  usdtrep: [],
  
  trollbox: []
};

const autobahn = require('autobahn');
const wsuri = "wss://api.poloniex.com";
const connection = new autobahn.Connection({
  url: wsuri,
  realm: "realm1"
});

connection.onopen = (session) => {
  app.use(Router.routes());
  
  function trollboxEvent (args,kwargs) {
    data.trollbox.push(args);
  }
  
	function tickerEvent (args,kwargs) {
    switch (args[0]) {
     case 'BTC_XMR':
      data.btcxmr.push(args);
      pusher.trigger('BTC_XMR', 'ticker', {
        currencyPair: args[0],
        last: args[1],
        lowestAsk: args[2],
        highestBid: args[3],
        percentChange: args[4],
        baseVolume: args[5],
        quoteVolume: args[6],
        isFrozen: args[7],
        high: args[8],
        low: args[9]
      });
      break;
     case 'BTC_XRP':
      data.btcxrp.push(args);
      pusher.trigger('BTC_XRP', 'ticker', {
        currencyPair: args[0],
        last: args[1],
        lowestAsk: args[2],
        highestBid: args[3],
        percentChange: args[4],
        baseVolume: args[5],
        quoteVolume: args[6],
        isFrozen: args[7],
        high: args[8],
        low: args[9]
      });
      break;
     case 'BTC_ETH':
      data.btceth.push(args);
      pusher.trigger('BTC_ETH', 'ticker', {
        currencyPair: args[0],
        last: args[1],
        lowestAsk: args[2],
        highestBid: args[3],
        percentChange: args[4],
        baseVolume: args[5],
        quoteVolume: args[6],
        isFrozen: args[7],
        high: args[8],
        low: args[9]
      });
      break;
     case 'BTC_LTC':
      data.btcltc.push(args);
      pusher.trigger('BTC_LTC', 'ticker', {
        currencyPair: args[0],
        last: args[1],
        lowestAsk: args[2],
        highestBid: args[3],
        percentChange: args[4],
        baseVolume: args[5],
        quoteVolume: args[6],
        isFrozen: args[7],
        high: args[8],
        low: args[9]
      });
      break;
     case 'BTC_STR':
      data.btcstr.push(args);
      pusher.trigger('BTC_STR', 'ticker', {
        currencyPair: args[0],
        last: args[1],
        lowestAsk: args[2],
        highestBid: args[3],
        percentChange: args[4],
        baseVolume: args[5],
        quoteVolume: args[6],
        isFrozen: args[7],
        high: args[8],
        low: args[9]
      });
      break;
     case 'BTC_ETC':
      data.btcetc.push(args);
      pusher.trigger('BTC_ETC', 'ticker', {
        currencyPair: args[0],
        last: args[1],
        lowestAsk: args[2],
        highestBid: args[3],
        percentChange: args[4],
        baseVolume: args[5],
        quoteVolume: args[6],
        isFrozen: args[7],
        high: args[8],
        low: args[9]
      });
      break;
     case 'BTC_XEM':
      data.btcxem.push(args);
      pusher.trigger('BTC_XEM', 'ticker', {
        currencyPair: args[0],
        last: args[1],
        lowestAsk: args[2],
        highestBid: args[3],
        percentChange: args[4],
        baseVolume: args[5],
        quoteVolume: args[6],
        isFrozen: args[7],
        high: args[8],
        low: args[9]
      });
      break;
     case 'BTC_SC':
      data.btcsc.push(args);
      pusher.trigger('BTC_SC', 'ticker', {
        currencyPair: args[0],
        last: args[1],
        lowestAsk: args[2],
        highestBid: args[3],
        percentChange: args[4],
        baseVolume: args[5],
        quoteVolume: args[6],
        isFrozen: args[7],
        high: args[8],
        low: args[9]
      });
      break;
     case 'BTC_BCN':
      data.btcbcn.push(args);
      pusher.trigger('BTC_BCN', 'ticker', {
        currencyPair: args[0],
        last: args[1],
        lowestAsk: args[2],
        highestBid: args[3],
        percentChange: args[4],
        baseVolume: args[5],
        quoteVolume: args[6],
        isFrozen: args[7],
        high: args[8],
        low: args[9]
      });
      break;
     case 'BTC_DGB':
      data.btcdgb.push(args);
      pusher.trigger('BTC_DGB', 'ticker', {
        currencyPair: args[0],
        last: args[1],
        lowestAsk: args[2],
        highestBid: args[3],
        percentChange: args[4],
        baseVolume: args[5],
        quoteVolume: args[6],
        isFrozen: args[7],
        high: args[8],
        low: args[9]
      });
      break;
     case 'BTC_DOGE':
      data.btcdoge.push(args);
      pusher.trigger('BTC_DOGE', 'ticker', {
        currencyPair: args[0],
        last: args[1],
        lowestAsk: args[2],
        highestBid: args[3],
        percentChange: args[4],
        baseVolume: args[5],
        quoteVolume: args[6],
        isFrozen: args[7],
        high: args[8],
        low: args[9]
      });
      break;
     case 'BTC_GNT':
      data.btcgnt.push(args);
      pusher.trigger('BTC_GNT', 'ticker', {
        currencyPair: args[0],
        last: args[1],
        lowestAsk: args[2],
        highestBid: args[3],
        percentChange: args[4],
        baseVolume: args[5],
        quoteVolume: args[6],
        isFrozen: args[7],
        high: args[8],
        low: args[9]
      });
      break;
     case 'BTC_STEEM':
      data.btcsteem.push(args);
      pusher.trigger('BTC_STEEM', 'ticker', {
        currencyPair: args[0],
        last: args[1],
        lowestAsk: args[2],
        highestBid: args[3],
        percentChange: args[4],
        baseVolume: args[5],
        quoteVolume: args[6],
        isFrozen: args[7],
        high: args[8],
        low: args[9]
      });
      break;
     case 'BTC_BTS':
      data.btcbts.push(args);
      pusher.trigger('BTC_BTS', 'ticker', {
        currencyPair: args[0],
        last: args[1],
        lowestAsk: args[2],
        highestBid: args[3],
        percentChange: args[4],
        baseVolume: args[5],
        quoteVolume: args[6],
        isFrozen: args[7],
        high: args[8],
        low: args[9]
      });
      break;
     case 'BTC_DASH':
      data.btcdash.push(args);
      pusher.trigger('BTC_DASH', 'ticker', {
        currencyPair: args[0],
        last: args[1],
        lowestAsk: args[2],
        highestBid: args[3],
        percentChange: args[4],
        baseVolume: args[5],
        quoteVolume: args[6],
        isFrozen: args[7],
        high: args[8],
        low: args[9]
      });
      break;
     case 'BTC_GAME':
      data.btcgame.push(args);
      pusher.trigger('BTC_GAME', 'ticker', {
        currencyPair: args[0],
        last: args[1],
        lowestAsk: args[2],
        highestBid: args[3],
        percentChange: args[4],
        baseVolume: args[5],
        quoteVolume: args[6],
        isFrozen: args[7],
        high: args[8],
        low: args[9]
      });
      break;
     case 'BTC_DCR':
      data.btcdcr.push(args);
      pusher.trigger('BTC_DCR', 'ticker', {
        currencyPair: args[0],
        last: args[1],
        lowestAsk: args[2],
        highestBid: args[3],
        percentChange: args[4],
        baseVolume: args[5],
        quoteVolume: args[6],
        isFrozen: args[7],
        high: args[8],
        low: args[9]
      });
      break;
     case 'BTC_BURST':
      data.btcburst.push(args);
      pusher.trigger('BTC_BURST', 'ticker', {
        currencyPair: args[0],
        last: args[1],
        lowestAsk: args[2],
        highestBid: args[3],
        percentChange: args[4],
        baseVolume: args[5],
        quoteVolume: args[6],
        isFrozen: args[7],
        high: args[8],
        low: args[9]
      });
      break;
     case 'BTC_STRAT':
      data.btcstrat.push(args);
      pusher.trigger('BTC_STRAT', 'ticker', {
        currencyPair: args[0],
        last: args[1],
        lowestAsk: args[2],
        highestBid: args[3],
        percentChange: args[4],
        baseVolume: args[5],
        quoteVolume: args[6],
        isFrozen: args[7],
        high: args[8],
        low: args[9]
      });
      break;
     case 'BTC_FCT':
      data.btcfct.push(args);
      pusher.trigger('BTC_FCT', 'ticker', {
        currencyPair: args[0],
        last: args[1],
        lowestAsk: args[2],
        highestBid: args[3],
        percentChange: args[4],
        baseVolume: args[5],
        quoteVolume: args[6],
        isFrozen: args[7],
        high: args[8],
        low: args[9]
      });
      break;
     case 'BTC_ARDR':
      data.btcardr.push(args);
      pusher.trigger('BTC_ARDR', 'ticker', {
        currencyPair: args[0],
        last: args[1],
        lowestAsk: args[2],
        highestBid: args[3],
        percentChange: args[4],
        baseVolume: args[5],
        quoteVolume: args[6],
        isFrozen: args[7],
        high: args[8],
        low: args[9]
      });
      break;
     case 'BTC_VTC':
      data.btcvtc.push(args);
      pusher.trigger('BTC_VTC', 'ticker', {
        currencyPair: args[0],
        last: args[1],
        lowestAsk: args[2],
        highestBid: args[3],
        percentChange: args[4],
        baseVolume: args[5],
        quoteVolume: args[6],
        isFrozen: args[7],
        high: args[8],
        low: args[9]
      });
      break;
     case 'BTC_MAID':
      data.btcmaid.push(args);
      pusher.trigger('BTC_MAID', 'ticker', {
        currencyPair: args[0],
        last: args[1],
        lowestAsk: args[2],
        highestBid: args[3],
        percentChange: args[4],
        baseVolume: args[5],
        quoteVolume: args[6],
        isFrozen: args[7],
        high: args[8],
        low: args[9]
      });
      break;
     case 'BTC_SYS':
      data.btcsys.push(args);
      pusher.trigger('BTC_SYS', 'ticker', {
        currencyPair: args[0],
        last: args[1],
        lowestAsk: args[2],
        highestBid: args[3],
        percentChange: args[4],
        baseVolume: args[5],
        quoteVolume: args[6],
        isFrozen: args[7],
        high: args[8],
        low: args[9]
      });
      break;
     case 'BTC_ZEC':
      data.btczec.push(args);
      pusher.trigger('BTC_ZEC', 'ticker', {
        currencyPair: args[0],
        last: args[1],
        lowestAsk: args[2],
        highestBid: args[3],
        percentChange: args[4],
        baseVolume: args[5],
        quoteVolume: args[6],
        isFrozen: args[7],
        high: args[8],
        low: args[9]
      });
      break;
     case 'BTC_SJCX':
      data.btcsjcx.push(args);
      pusher.trigger('BTC_SJCX', 'ticker', {
        currencyPair: args[0],
        last: args[1],
        lowestAsk: args[2],
        highestBid: args[3],
        percentChange: args[4],
        baseVolume: args[5],
        quoteVolume: args[6],
        isFrozen: args[7],
        high: args[8],
        low: args[9]
      });
      break;
     case 'BTC_CLAM':
      data.btcclam.push(args);
      pusher.trigger('BTC_CLAM', 'ticker', {
        currencyPair: args[0],
        last: args[1],
        lowestAsk: args[2],
        highestBid: args[3],
        percentChange: args[4],
        baseVolume: args[5],
        quoteVolume: args[6],
        isFrozen: args[7],
        high: args[8],
        low: args[9]
      });
      break;
     case 'BTC_BELA':
      data.btcbela.push(args);
      pusher.trigger('BTC_BELA', 'ticker', {
        currencyPair: args[0],
        last: args[1],
        lowestAsk: args[2],
        highestBid: args[3],
        percentChange: args[4],
        baseVolume: args[5],
        quoteVolume: args[6],
        isFrozen: args[7],
        high: args[8],
        low: args[9]
      });
      break;
     case 'BTC_LSK':
      data.btclsk.push(args);
      pusher.trigger('BTC_LSK', 'ticker', {
        currencyPair: args[0],
        last: args[1],
        lowestAsk: args[2],
        highestBid: args[3],
        percentChange: args[4],
        baseVolume: args[5],
        quoteVolume: args[6],
        isFrozen: args[7],
        high: args[8],
        low: args[9]
      });
      break;
     case 'BTC_XCP':
      data.btcxcp.push(args);
      pusher.trigger('BTC_XCP', 'ticker', {
        currencyPair: args[0],
        last: args[1],
        lowestAsk: args[2],
        highestBid: args[3],
        percentChange: args[4],
        baseVolume: args[5],
        quoteVolume: args[6],
        isFrozen: args[7],
        high: args[8],
        low: args[9]
      });
      break;
     case 'BTC_GNO':
      data.btcgno.push(args);
      pusher.trigger('BTC_GNO', 'ticker', {
        currencyPair: args[0],
        last: args[1],
        lowestAsk: args[2],
        highestBid: args[3],
        percentChange: args[4],
        baseVolume: args[5],
        quoteVolume: args[6],
        isFrozen: args[7],
        high: args[8],
        low: args[9]
      });
      break;
     case 'BTC_FLO':
      data.btcflo.push(args);
      pusher.trigger('BTC_FLO', 'ticker', {
        currencyPair: args[0],
        last: args[1],
        lowestAsk: args[2],
        highestBid: args[3],
        percentChange: args[4],
        baseVolume: args[5],
        quoteVolume: args[6],
        isFrozen: args[7],
        high: args[8],
        low: args[9]
      });
      break;
     case 'BTC_LBC':
      data.btclbc.push(args);
      pusher.trigger('BTC_LBC', 'ticker', {
        currencyPair: args[0],
        last: args[1],
        lowestAsk: args[2],
        highestBid: args[3],
        percentChange: args[4],
        baseVolume: args[5],
        quoteVolume: args[6],
        isFrozen: args[7],
        high: args[8],
        low: args[9]
      });
      break;
     case 'BTC_EXP':
      data.btcexp.push(args);
      pusher.trigger('BTC_EXP', 'ticker', {
        currencyPair: args[0],
        last: args[1],
        lowestAsk: args[2],
        highestBid: args[3],
        percentChange: args[4],
        baseVolume: args[5],
        quoteVolume: args[6],
        isFrozen: args[7],
        high: args[8],
        low: args[9]
      });
      break;
     case 'BTC_REP':
      data.btcrep.push(args);
      pusher.trigger('BTC_REP', 'ticker', {
        currencyPair: args[0],
        last: args[1],
        lowestAsk: args[2],
        highestBid: args[3],
        percentChange: args[4],
        baseVolume: args[5],
        quoteVolume: args[6],
        isFrozen: args[7],
        high: args[8],
        low: args[9]
      });
      break;
     case 'BTC_GRC':
      data.btcgrc.push(args);
      pusher.trigger('BTC_GRC', 'ticker', {
        currencyPair: args[0],
        last: args[1],
        lowestAsk: args[2],
        highestBid: args[3],
        percentChange: args[4],
        baseVolume: args[5],
        quoteVolume: args[6],
        isFrozen: args[7],
        high: args[8],
        low: args[9]
      });
      break;
     case 'BTC_NAV':
      data.btcnav.push(args);
      pusher.trigger('BTC_NAV', 'ticker', {
        currencyPair: args[0],
        last: args[1],
        lowestAsk: args[2],
        highestBid: args[3],
        percentChange: args[4],
        baseVolume: args[5],
        quoteVolume: args[6],
        isFrozen: args[7],
        high: args[8],
        low: args[9]
      });
      break;
     case 'BTC_RADS':
      data.btcrads.push(args);
      pusher.trigger('BTC_RADS', 'ticker', {
        currencyPair: args[0],
        last: args[1],
        lowestAsk: args[2],
        highestBid: args[3],
        percentChange: args[4],
        baseVolume: args[5],
        quoteVolume: args[6],
        isFrozen: args[7],
        high: args[8],
        low: args[9]
      });
      break;
     case 'BTC_NAUT':
      data.btcnaut.push(args);
      pusher.trigger('BTC_NAUT', 'ticker', {
        currencyPair: args[0],
        last: args[1],
        lowestAsk: args[2],
        highestBid: args[3],
        percentChange: args[4],
        baseVolume: args[5],
        quoteVolume: args[6],
        isFrozen: args[7],
        high: args[8],
        low: args[9]
      });
      break;
     case 'BTC_NEOS':
      data.btcneos.push(args);
      pusher.trigger('BTC_NEOS', 'ticker', {
        currencyPair: args[0],
        last: args[1],
        lowestAsk: args[2],
        highestBid: args[3],
        percentChange: args[4],
        baseVolume: args[5],
        quoteVolume: args[6],
        isFrozen: args[7],
        high: args[8],
        low: args[9]
      });
      break;
     case 'BTC_POT':
      data.btcpot.push(args);
      pusher.trigger('BTC_POT', 'ticker', {
        currencyPair: args[0],
        last: args[1],
        lowestAsk: args[2],
        highestBid: args[3],
        percentChange: args[4],
        baseVolume: args[5],
        quoteVolume: args[6],
        isFrozen: args[7],
        high: args[8],
        low: args[9]
      });
      break;
     case 'BTC_FLDC':
      data.btcfldc.push(args);
      pusher.trigger('BTC_FLDC', 'ticker', {
        currencyPair: args[0],
        last: args[1],
        lowestAsk: args[2],
        highestBid: args[3],
        percentChange: args[4],
        baseVolume: args[5],
        quoteVolume: args[6],
        isFrozen: args[7],
        high: args[8],
        low: args[9]
      });
      break;
     case 'BTC_AMP':
      data.btcamp.push(args);
      pusher.trigger('BTC_AMP', 'ticker', {
        currencyPair: args[0],
        last: args[1],
        lowestAsk: args[2],
        highestBid: args[3],
        percentChange: args[4],
        baseVolume: args[5],
        quoteVolume: args[6],
        isFrozen: args[7],
        high: args[8],
        low: args[9]
      });
      break;
     case 'BTC_PINK':
      data.btcpink.push(args);
      pusher.trigger('BTC_PINK', 'ticker', {
        currencyPair: args[0],
        last: args[1],
        lowestAsk: args[2],
        highestBid: args[3],
        percentChange: args[4],
        baseVolume: args[5],
        quoteVolume: args[6],
        isFrozen: args[7],
        high: args[8],
        low: args[9]
      });
      break;
     case 'BTC_PPC':
      data.btcppc.push(args);
      pusher.trigger('BTC_PPC', 'ticker', {
        currencyPair: args[0],
        last: args[1],
        lowestAsk: args[2],
        highestBid: args[3],
        percentChange: args[4],
        baseVolume: args[5],
        quoteVolume: args[6],
        isFrozen: args[7],
        high: args[8],
        low: args[9]
      });
      break;
     case 'BTC_VIA':
      data.btcvia.push(args);
      pusher.trigger('BTC_VIA', 'ticker', {
        currencyPair: args[0],
        last: args[1],
        lowestAsk: args[2],
        highestBid: args[3],
        percentChange: args[4],
        baseVolume: args[5],
        quoteVolume: args[6],
        isFrozen: args[7],
        high: args[8],
        low: args[9]
      });
      break;
     case 'BTC_BCY':
      data.btcbcy.push(args);
      pusher.trigger('BTC_BCY', 'ticker', {
        currencyPair: args[0],
        last: args[1],
        lowestAsk: args[2],
        highestBid: args[3],
        percentChange: args[4],
        baseVolume: args[5],
        quoteVolume: args[6],
        isFrozen: args[7],
        high: args[8],
        low: args[9]
      });
      break;
     case 'BTC_EMC2':
      data.btcemc2.push(args);
      pusher.trigger('BTC_EMC2', 'ticker', {
        currencyPair: args[0],
        last: args[1],
        lowestAsk: args[2],
        highestBid: args[3],
        percentChange: args[4],
        baseVolume: args[5],
        quoteVolume: args[6],
        isFrozen: args[7],
        high: args[8],
        low: args[9]
      });
      break;
     case 'BTC_NXC':
      data.btcnxc.push(args);
      pusher.trigger('BTC_NXC', 'ticker', {
        currencyPair: args[0],
        last: args[1],
        lowestAsk: args[2],
        highestBid: args[3],
        percentChange: args[4],
        baseVolume: args[5],
        quoteVolume: args[6],
        isFrozen: args[7],
        high: args[8],
        low: args[9]
      });
      break;
     case 'BTC_HUC':
      data.btchuc.push(args);
       pusher.trigger('BTC_HUC', 'ticker', {
        currencyPair: args[0],
        last: args[1],
        lowestAsk: args[2],
        highestBid: args[3],
        percentChange: args[4],
        baseVolume: args[5],
        quoteVolume: args[6],
        isFrozen: args[7],
        high: args[8],
        low: args[9]
      });
      break;
     case 'BTC_SBD':
      data.btcsbd.push(args);
      pusher.trigger('BTC_SBD', 'ticker', {
        currencyPair: args[0],
        last: args[1],
        lowestAsk: args[2],
        highestBid: args[3],
        percentChange: args[4],
        baseVolume: args[5],
        quoteVolume: args[6],
        isFrozen: args[7],
        high: args[8],
        low: args[9]
      });
      break;
     case 'BTC_PASC':
      data.btcpasc.push(args);
      pusher.trigger('BTC_PASC', 'ticker', {
        currencyPair: args[0],
        last: args[1],
        lowestAsk: args[2],
        highestBid: args[3],
        percentChange: args[4],
        baseVolume: args[5],
        quoteVolume: args[6],
        isFrozen: args[7],
        high: args[8],
        low: args[9]
      });
      break;
     case 'BTC_RIC':
      data.btcric.push(args);
      pusher.trigger('BTC_RIC', 'ticker', {
        currencyPair: args[0],
        last: args[1],
        lowestAsk: args[2],
        highestBid: args[3],
        percentChange: args[4],
        baseVolume: args[5],
        quoteVolume: args[6],
        isFrozen: args[7],
        high: args[8],
        low: args[9]
      });
      break;
     case 'BTC_NOTE':
      data.btcnote.push(args);
      pusher.trigger('BTC_NOTE', 'ticker', {
        currencyPair: args[0],
        last: args[1],
        lowestAsk: args[2],
        highestBid: args[3],
        percentChange: args[4],
        baseVolume: args[5],
        quoteVolume: args[6],
        isFrozen: args[7],
        high: args[8],
        low: args[9]
      });
      break;
     case 'BTC_BTCD':
      data.btcbtcd.push(args);
      pusher.trigger('BTC_BTCD', 'ticker', {
        currencyPair: args[0],
        last: args[1],
        lowestAsk: args[2],
        highestBid: args[3],
        percentChange: args[4],
        baseVolume: args[5],
        quoteVolume: args[6],
        isFrozen: args[7],
        high: args[8],
        low: args[9]
      });
      break;
     case 'BTC_NMC':
      data.btcnmc.push(args);
      pusher.trigger('BTC_NMC', 'ticker', {
        currencyPair: args[0],
        last: args[1],
        lowestAsk: args[2],
        highestBid: args[3],
        percentChange: args[4],
        baseVolume: args[5],
        quoteVolume: args[6],
        isFrozen: args[7],
        high: args[8],
        low: args[9]
      });
      break;
     case 'BTC_BLK':
      data.btcblk.push(args);
      pusher.trigger('BTC_BLK', 'ticker', {
        currencyPair: args[0],
        last: args[1],
        lowestAsk: args[2],
        highestBid: args[3],
        percentChange: args[4],
        baseVolume: args[5],
        quoteVolume: args[6],
        isFrozen: args[7],
        high: args[8],
        low: args[9]
      });
      break;
     case 'BTC_VRC':
      data.btcvrc.push(args);
      pusher.trigger('BTC_VRC', 'ticker', {
        currencyPair: args[0],
        last: args[1],
        lowestAsk: args[2],
        highestBid: args[3],
        percentChange: args[4],
        baseVolume: args[5],
        quoteVolume: args[6],
        isFrozen: args[7],
        high: args[8],
        low: args[9]
      });
      break;
      case 'BTC_XBC':
      data.btcxbc.push(args);
      pusher.trigger('BTC_XBC', 'ticker', {
        currencyPair: args[0],
        last: args[1],
        lowestAsk: args[2],
        highestBid: args[3],
        percentChange: args[4],
        baseVolume: args[5],
        quoteVolume: args[6],
        isFrozen: args[7],
        high: args[8],
        low: args[9]
      });
      break;
     case 'BTC_XVC':
      data.btcxvc.push(args);
      pusher.trigger('BTC_XVC', 'ticker', {
        currencyPair: args[0],
        last: args[1],
        lowestAsk: args[2],
        highestBid: args[3],
        percentChange: args[4],
        baseVolume: args[5],
        quoteVolume: args[6],
        isFrozen: args[7],
        high: args[8],
        low: args[9]
      });
      break;
     case 'BTC_BTM':
      data.btcbtm.push(args);
      pusher.trigger('BTC_BTM', 'ticker', {
        currencyPair: args[0],
        last: args[1],
        lowestAsk: args[2],
        highestBid: args[3],
        percentChange: args[4],
        baseVolume: args[5],
        quoteVolume: args[6],
        isFrozen: args[7],
        high: args[8],
        low: args[9]
      });
      break;
     case 'BTC_XPM':
      data.btcxpm.push(args);
      pusher.trigger('BTC_XPM', 'ticker', {
        currencyPair: args[0],
        last: args[1],
        lowestAsk: args[2],
        highestBid: args[3],
        percentChange: args[4],
        baseVolume: args[5],
        quoteVolume: args[6],
        isFrozen: args[7],
        high: args[8],
        low: args[9]
      });
      break;
      case 'BTC_OMNI':
      data.btcomni.push(args);
      pusher.trigger('BTC_OMNI', 'ticker', {
        currencyPair: args[0],
        last: args[1],
        lowestAsk: args[2],
        highestBid: args[3],
        percentChange: args[4],
        baseVolume: args[5],
        quoteVolume: args[6],
        isFrozen: args[7],
        high: args[8],
        low: args[9]
      });
      break;
     case 'BTC_NXT':
      data.btcnxt.push(args);
      pusher.trigger('BTC_NXT', 'ticker', {
        currencyPair: args[0],
        last: args[1],
        lowestAsk: args[2],
        highestBid: args[3],
        percentChange: args[4],
        baseVolume: args[5],
        quoteVolume: args[6],
        isFrozen: args[7],
        high: args[8],
        low: args[9]
      });
      break;
        
     case 'ETH_GNT':
      data.ethgnt.push(args);
      pusher.trigger('ETH_GNT', 'ticker', {
        currencyPair: args[0],
        last: args[1],
        lowestAsk: args[2],
        highestBid: args[3],
        percentChange: args[4],
        baseVolume: args[5],
        quoteVolume: args[6],
        isFrozen: args[7],
        high: args[8],
        low: args[9]
      });
      break;
     case 'ETH_ZEC':
      data.ethzec.push(args);
      pusher.trigger('ETH_ZEC', 'ticker', {
        currencyPair: args[0],
        last: args[1],
        lowestAsk: args[2],
        highestBid: args[3],
        percentChange: args[4],
        baseVolume: args[5],
        quoteVolume: args[6],
        isFrozen: args[7],
        high: args[8],
        low: args[9]
      });
      break;
     case 'ETH_ETC':
      data.ethetc.push(args);
      pusher.trigger('ETH_ETC', 'ticker', {
        currencyPair: args[0],
        last: args[1],
        lowestAsk: args[2],
        highestBid: args[3],
        percentChange: args[4],
        baseVolume: args[5],
        quoteVolume: args[6],
        isFrozen: args[7],
        high: args[8],
        low: args[9]
      });
      break;
     case 'ETH_GNO':
      data.ethgno.push(args);
      pusher.trigger('ETH_GNO', 'ticker', {
        currencyPair: args[0],
        last: args[1],
        lowestAsk: args[2],
        highestBid: args[3],
        percentChange: args[4],
        baseVolume: args[5],
        quoteVolume: args[6],
        isFrozen: args[7],
        high: args[8],
        low: args[9]
      });
      break;
     case 'ETH_STEEM':
      data.ethsteem.push(args);
      pusher.trigger('ETH_STEEM', 'ticker', {
        currencyPair: args[0],
        last: args[1],
        lowestAsk: args[2],
        highestBid: args[3],
        percentChange: args[4],
        baseVolume: args[5],
        quoteVolume: args[6],
        isFrozen: args[7],
        high: args[8],
        low: args[9]
      });
      break;
     case 'ETH_REP':
      data.ethrep.push(args);
      pusher.trigger('ETH_REP', 'ticker', {
        currencyPair: args[0],
        last: args[1],
        lowestAsk: args[2],
        highestBid: args[3],
        percentChange: args[4],
        baseVolume: args[5],
        quoteVolume: args[6],
        isFrozen: args[7],
        high: args[8],
        low: args[9]
      });
      break;
     case 'ETH_LSK':
      data.ethlsk.push(args);
      pusher.trigger('ETH_LSK', 'ticker', {
        currencyPair: args[0],
        last: args[1],
        lowestAsk: args[2],
        highestBid: args[3],
        percentChange: args[4],
        baseVolume: args[5],
        quoteVolume: args[6],
        isFrozen: args[7],
        high: args[8],
        low: args[9]
      });
      break;
        
     case 'XMR_LTC':
      data.xmrltc.push(args);
      pusher.trigger('XMR_LTC', 'ticker', {
        currencyPair: args[0],
        last: args[1],
        lowestAsk: args[2],
        highestBid: args[3],
        percentChange: args[4],
        baseVolume: args[5],
        quoteVolume: args[6],
        isFrozen: args[7],
        high: args[8],
        low: args[9]
      });
      break;
     case 'XMR_ZEC':
      data.xmrzec.push(args);
      pusher.trigger('XMR_ZEC', 'ticker', {
        currencyPair: args[0],
        last: args[1],
        lowestAsk: args[2],
        highestBid: args[3],
        percentChange: args[4],
        baseVolume: args[5],
        quoteVolume: args[6],
        isFrozen: args[7],
        high: args[8],
        low: args[9]
      });
      break;
     case 'XMR_DASH':
      data.xmrdash.push(args);
      pusher.trigger('XMR_DASH', 'ticker', {
        currencyPair: args[0],
        last: args[1],
        lowestAsk: args[2],
        highestBid: args[3],
        percentChange: args[4],
        baseVolume: args[5],
        quoteVolume: args[6],
        isFrozen: args[7],
        high: args[8],
        low: args[9]
      });
      break;
     case 'XMR_BCN':
      data.xmrbcn.push(args);
      pusher.trigger('XMR_BCN', 'ticker', {
        currencyPair: args[0],
        last: args[1],
        lowestAsk: args[2],
        highestBid: args[3],
        percentChange: args[4],
        baseVolume: args[5],
        quoteVolume: args[6],
        isFrozen: args[7],
        high: args[8],
        low: args[9]
      });
      break;
     case 'XMR_NXT':
      data.xmrnxt.push(args);
      pusher.trigger('XMR_NXT', 'ticker', {
        currencyPair: args[0],
        last: args[1],
        lowestAsk: args[2],
        highestBid: args[3],
        percentChange: args[4],
        baseVolume: args[5],
        quoteVolume: args[6],
        isFrozen: args[7],
        high: args[8],
        low: args[9]
      });
      break;
     case 'XMR_MAID':
      data.xmrmaid.push(args);
      pusher.trigger('XMR_MAID', 'ticker', {
        currencyPair: args[0],
        last: args[1],
        lowestAsk: args[2],
        highestBid: args[3],
        percentChange: args[4],
        baseVolume: args[5],
        quoteVolume: args[6],
        isFrozen: args[7],
        high: args[8],
        low: args[9]
      });
      break;
     case 'XMR_BTCD':
      data.xmrbtcd.push(args);
      pusher.trigger('XMR_BTCD', 'ticker', {
        currencyPair: args[0],
        last: args[1],
        lowestAsk: args[2],
        highestBid: args[3],
        percentChange: args[4],
        baseVolume: args[5],
        quoteVolume: args[6],
        isFrozen: args[7],
        high: args[8],
        low: args[9]
      });
      break;   
     case 'XMR_BLK':
      data.xmrblk.push(args);
      pusher.trigger('XMR_BLK', 'ticker', {
        currencyPair: args[0],
        last: args[1],
        lowestAsk: args[2],
        highestBid: args[3],
        percentChange: args[4],
        baseVolume: args[5],
        quoteVolume: args[6],
        isFrozen: args[7],
        high: args[8],
        low: args[9]
      });
      break;
        
     case 'USDT_BTC':
      data.usdtbtc.push(args);
      pusher.trigger('USDT_BTC', 'ticker', {
        currencyPair: args[0],
        last: args[1],
        lowestAsk: args[2],
        highestBid: args[3],
        percentChange: args[4],
        baseVolume: args[5],
        quoteVolume: args[6],
        isFrozen: args[7],
        high: args[8],
        low: args[9]
      });
      break;
     case 'USDT_XRP':
      data.usdtxrp.push(args);
      pusher.trigger('USDT_XRP', 'ticker', {
        currencyPair: args[0],
        last: args[1],
        lowestAsk: args[2],
        highestBid: args[3],
        percentChange: args[4],
        baseVolume: args[5],
        quoteVolume: args[6],
        isFrozen: args[7],
        high: args[8],
        low: args[9]
      });
      break;
     case 'USDT_ETH':
      data.usdteth.push(args);
      pusher.trigger('USDT_ETH', 'ticker', {
        currencyPair: args[0],
        last: args[1],
        lowestAsk: args[2],
        highestBid: args[3],
        percentChange: args[4],
        baseVolume: args[5],
        quoteVolume: args[6],
        isFrozen: args[7],
        high: args[8],
        low: args[9]
      });
      break;
     case 'USDT_LTC':
      data.usdtltc.push(args);
      pusher.trigger('USDT_LTC', 'ticker', {
        currencyPair: args[0],
        last: args[1],
        lowestAsk: args[2],
        highestBid: args[3],
        percentChange: args[4],
        baseVolume: args[5],
        quoteVolume: args[6],
        isFrozen: args[7],
        high: args[8],
        low: args[9]
      });
      break;
     case 'USDT_STR':
      data.usdtstr.push(args);
      pusher.trigger('USDT_STR', 'ticker', {
        currencyPair: args[0],
        last: args[1],
        lowestAsk: args[2],
        highestBid: args[3],
        percentChange: args[4],
        baseVolume: args[5],
        quoteVolume: args[6],
        isFrozen: args[7],
        high: args[8],
        low: args[9]
      });
      break;
     case 'USDT_ETC':
      data.usdtetc.push(args);
      pusher.trigger('USDT_ETC', 'ticker', {
        currencyPair: args[0],
        last: args[1],
        lowestAsk: args[2],
        highestBid: args[3],
        percentChange: args[4],
        baseVolume: args[5],
        quoteVolume: args[6],
        isFrozen: args[7],
        high: args[8],
        low: args[9]
      });
      break;
     case 'USDT_XMR':
      data.usdtxmr.push(args);
      pusher.trigger('USDT_XMR', 'ticker', {
        currencyPair: args[0],
        last: args[1],
        lowestAsk: args[2],
        highestBid: args[3],
        percentChange: args[4],
        baseVolume: args[5],
        quoteVolume: args[6],
        isFrozen: args[7],
        high: args[8],
        low: args[9]
      });
      break;   
     case 'USDT_DASH':
      data.usdtdash.push(args);
      pusher.trigger('USDT_DASH', 'ticker', {
        currencyPair: args[0],
        last: args[1],
        lowestAsk: args[2],
        highestBid: args[3],
        percentChange: args[4],
        baseVolume: args[5],
        quoteVolume: args[6],
        isFrozen: args[7],
        high: args[8],
        low: args[9]
      });
      break;
     case 'USDT_ZEC':
      data.usdtzec.push(args);
      pusher.trigger('USDT_ZEC', 'ticker', {
        currencyPair: args[0],
        last: args[1],
        lowestAsk: args[2],
        highestBid: args[3],
        percentChange: args[4],
        baseVolume: args[5],
        quoteVolume: args[6],
        isFrozen: args[7],
        high: args[8],
        low: args[9]
      });
      break;
     case 'USDT_NXT':
      data.usdtnxt.push(args);
      pusher.trigger('USDT_NXT', 'ticker', {
        currencyPair: args[0],
        last: args[1],
        lowestAsk: args[2],
        highestBid: args[3],
        percentChange: args[4],
        baseVolume: args[5],
        quoteVolume: args[6],
        isFrozen: args[7],
        high: args[8],
        low: args[9]
      });
      break;
     case 'USDT_REP':
      data.usdtrep.push(args);
      pusher.trigger('USDT_REP', 'ticker', {
        currencyPair: args[0],
        last: args[1],
        lowestAsk: args[2],
        highestBid: args[3],
        percentChange: args[4],
        baseVolume: args[5],
        quoteVolume: args[6],
        isFrozen: args[7],
        high: args[8],
        low: args[9]
      });
      break;
   }
	}
  function marketEvent (args,kwargs) {
    if (args[0].type === 'orderBookModify' && args[0].data.type === 'ask') {
      console.log(`${orderPair}BUY ORDER: ${JSON.stringify(args)}`);
      pusher.trigger('channel','buyorders',args);
    }
    if (args[0].type === 'orderBookModify' && args[0].data.type === 'bid') {
      console.log(`${orderPair}SELL ORDER: ${JSON.stringify(args)}`);
      pusher.trigger('channel','sellorders',args);
    }/*
    if (args[0].type === 'newTrade' && args.data.type === 'buy') {
      console.log(`BUY: ${JSON.stringify(args)}`);
    }
    if (args[0].type === 'newTrade' && args.data.type === 'sell') {
      console.log(`SELL: ${JSON.stringify(args)}`);
    }
    //console.log(args);*/
  }
  app.use(() => {Router.get('/orders/:pair', async (ctx) => {
  orderPair = ctx.params.pair;
  ctx.body = 'success!'; 
  session.subscribe(orderPair,marketEvent);
  })});
  //session.subscribe(orderPair,marketEvent);
	session.subscribe('ticker', tickerEvent);
  session.subscribe('trollbox',trollboxEvent);
}

connection.onclose = () => {
  console.log("Websocket connection closed");
}
		       
connection.open();

async function home (ctx) {
  ctx.body = '<h6>Example: </h6> <code> https://bright-element.glitch.me/[currency-pair-here] </code> <br> <p>Pair in the format <code>BTC_XMR</code> </p> <h6>Example: </h6> <code>https://bright-element.glitch.me/trollbox </code> <br> <code>https://bright-element.glitch.me/charts/[currency-pair-here] </code>';
}

async function btcXmr (ctx) {
  ctx.body = data.btcxmr;
}
async function btcXrp (ctx) {
  ctx.body = data.btcxrp;
}
async function btcEth (ctx) {
  ctx.body = data.btceth;
}
async function btcLtc (ctx) {
  ctx.body = data.btcltc;
}
async function btcStr (ctx) {
  ctx.body = data.btcstr;
}
async function btcEtc (ctx) {
  ctx.body = data.btcetc;
}
async function btcXem (ctx) {
  ctx.body = data.btcxem;
}
async function btcSc (ctx) {
  ctx.body = data.btcsc;
}
async function btcDash (ctx) {
  ctx.body = data.btcdash;
}
async function btcBcn (ctx) {
  ctx.body = data.btcbcn;
}
async function btcDgb (ctx) {
  ctx.body = data.btcdgb;
}
async function btcDoge (ctx) {
  ctx.body = data.btcdoge;
}
async function btcGnt (ctx) {
  ctx.body = data.btcgnt;
}
async function btcBts (ctx) {
  ctx.body = data.btcbts;
}
async function btcSteem (ctx) {
  ctx.body = data.btcsteem;
}
async function btcDash (ctx) {
  ctx.body = data.btcdash;
}
async function btcGame (ctx) {
  ctx.body = data.btcgame;
}
async function btcDcr (ctx) {
  ctx.body = data.btcdcr;
}
async function btcBurst (ctx) {
  ctx.body = data.btcburst;
}
async function btcStrat (ctx) {
  ctx.body = data.btcstrat;
}
async function btcFct (ctx) {
  ctx.body = data.btcfct;
}
async function btcArdr (ctx) {
  ctx.body = data.btcardr;
}
async function btcVtc (ctx) {
  ctx.body = data.btcvtc;
}
async function btcMaid (ctx) {
  ctx.body = data.btcmaid;
}
async function btcSys (ctx) {
  ctx.body = data.btcsys;
}
async function btcNeos (ctx) {
  ctx.body = data.btcneos;
}
async function btcZec (ctx) {
  ctx.body = data.btczec;
}
async function btcSjcx (ctx) {
  ctx.body = data.btcsjcx;
}
async function btcClam (ctx) {
  ctx.body = data.btcclam;
}
async function btcBela (ctx) {
  ctx.body = data.btcbela;
}
async function btcLsk (ctx) {
  ctx.body = data.btclsk;
}
async function btcXcp (ctx) {
  ctx.body = data.btcxcp;
}
async function btcGno (ctx) {
  ctx.body = data.btcgno;
}
async function btcFlo (ctx) {
  ctx.body = data.btcflo;
}
async function btcLbc (ctx) {
  ctx.body = data.btclbc;
}
async function btcExp (ctx) {
  ctx.body = data.btcexp;
}
async function btcRep (ctx) {
  ctx.body = data.btcrep;
}
async function btcGrc (ctx) {
  ctx.body = data.btcgrc;
}
async function btcNav (ctx) {
  ctx.body = data.btcnav;
}
async function btcRads (ctx) {
  ctx.body = data.btcrads;
}
async function btcNaut (ctx) {
  ctx.body = data.btcnaut;
}
async function btcPot (ctx) {
  ctx.body = data.btcpot;
}
async function btcFldc (ctx) {
  ctx.body = data.btcfldc;
}
async function btcAmp (ctx) {
  ctx.body = data.btcamp;
}
async function btcPink (ctx) {
  ctx.body = data.btcpink;
}
async function btcVia (ctx) {
  ctx.body = data.btcvia;
}
async function btcPpc (ctx) {
  ctx.body = data.btcppc;
}
async function btcBcy (ctx) {
  ctx.body = data.btcbcy;
}
async function btcEmctwo (ctx) {
  ctx.body = data.btcemctwo;
}
async function btcNxc (ctx) {
  ctx.body = data.btcnxc;
}
async function btcHuc (ctx) {
  ctx.body = data.btchuc;
}
async function btcSbd (ctx) {
  ctx.body = data.btcsbd;
}
async function btcPasc (ctx) {
  ctx.body = data.btcpasc;
}
async function btcNote (ctx) {
  ctx.body = data.btcnote;
}
async function btcRic (ctx) {
  ctx.body = data.btcric;
}
async function btcBtcd (ctx) {
  ctx.body = data.btcbtcd;
}
async function btcNmc (ctx) {
  ctx.body = data.btcnmc;
}
async function btcBlk (ctx) {
  ctx.body = data.btcblk;
}
async function btcVrc (ctx) {
  ctx.body = data.btcvrc;
}
async function btcXbc (ctx) {
  ctx.body = data.btcxbc;
}
async function btcXvc (ctx) {
  ctx.body = data.btcxvc;
}
async function btcBtm (ctx) {
  ctx.body = data.btcbtm;
}
async function btcXpm (ctx) {
  ctx.body = data.btcxpm;
}
async function btcOmni (ctx) {
  ctx.body = data.btcomni;
}
async function btcNxt (ctx) {
  ctx.body = data.btcnxt;
}

async function ethGnt (ctx) {
  ctx.body = data.ethgnt;
}
async function ethZec (ctx) {
  ctx.body = data.ethzec;
}
async function ethEtc (ctx) {
  ctx.body = data.ethetc;
}
async function ethGno (ctx) {
  ctx.body = data.ethgno;
}
async function ethSteem (ctx) {
  ctx.body = data.ethsteem;
}
async function ethRep (ctx) {
  ctx.body = data.ethrep;
}
async function ethLsk (ctx) {
  ctx.body = data.ethlsk;
}

async function xmrLtc (ctx) {
  ctx.body = data.xmrltc;
}
async function xmrZec (ctx) {
  ctx.body = data.xmrzec;
}
async function xmrDash (ctx) {
  ctx.body = data.xmrdash;
}
async function xmrBcn (ctx) {
  ctx.body = data.xmrbcn;
}
async function xmrNxt (ctx) {
  ctx.body = data.xmrnxt;
}
async function xmrMaid (ctx) {
  ctx.body = data.xmrmaid;
}
async function xmrBtcd (ctx) {
  ctx.body = data.xmrbtcd;
}
async function xmrBlk (ctx) {
  ctx.body = data.xmrblk;
}

async function usdtLtc (ctx) {
  ctx.body = data.usdtltc;
}
async function usdtZec (ctx) {
  ctx.body = data.usdtzec;
}
async function usdtDash (ctx) {
  ctx.body = data.usdtdash;
}
async function usdtBtc (ctx) {
  ctx.body = data.usdtbtc;
}
async function usdtNxt (ctx) {
  ctx.body = data.usdtnxt;
}
async function usdtXrp (ctx) {
  ctx.body = data.usdtxrp;
}
async function usdtEth (ctx) {
  ctx.body = data.usdteth;
}
async function usdtXmr (ctx) {
  ctx.body = data.usdtxmr;
}
async function usdtStr (ctx) {
  ctx.body = data.usdtstr;
}
async function usdtEtc (ctx) {
  ctx.body = data.usdtetc;
}
async function usdtRep (ctx) {
  ctx.body = data.usdtrep;
}
async function chart (ctx) {
  ctx.render('charts',{
    pair: ctx.params.pair
  });
}

app.listen(process.env.PORT,() => {
  console.log(`listening ${process.env.PORT}`);
})
