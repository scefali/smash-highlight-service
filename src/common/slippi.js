const { default: SlippiGame } = require('slp-parser-js');


const DAMAGE_REQ_FOR_COMBO = 40;

const readSlippiBuffer = slippiBuffer => {
  const game = new SlippiGame(slippiBuffer);

  const stats = game.getStats();
  const combos = stats.combos;
  console.log('combos', combos);
  const queue = createComboQueue(game);
  console.log('queue', queue);
  const comboJson = {
    mode: 'queue',
    queue,
  }

  return comboJson;
};

const createComboQueue = game => {

  const queue = [];

  const stats = game.getStats();
  const combos = stats.combos;

  for (const combo of combos) {
    let comboPct = Math.round(combo.endPercent - combo.startPercent);
    if (comboPct < DAMAGE_REQ_FOR_COMBO) {
      console.log('Combo damage too small: %d', comboPct);
      continue;
    }
    if (combo.didKill == false) {
      console.log('Non-lethal combo: %d', comboPct);
      continue;
    }

    let comboSnip = {
      // path: slippiFile, //TODO: what goes here?
      startFrame: combo.startFrame,
      endFrame: combo.endFrame
    };
    queue.push(comboSnip);
  }
  return queue;
};

module.exports = {
  readSlippiBuffer
};
