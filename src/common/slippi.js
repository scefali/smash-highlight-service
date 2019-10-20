const { default: SlippiGame } = require('slp-parser-js');

const DAMAGE_REQ_FOR_COMBO = 40;

const readSlippiBuffer = slippiBuffer => {
  const game = new SlippiGame(slippiBuffer);

  const stats = game.getStats();
  const combos = stats.combos;
  console.log('combos', combos);
  const comboJson = createComboJsonFromGame(game);
  console.log('comboJson', comboJson);
  return comboJson;
};

const createComboJsonFromGame = game => {
  const comboJson = {
    mode: 'queue',
    queue: []
  };
  const stats = game.getStats();
  const combos = stats.combos;

  for (const combo in combos) {
    let comboPct = Math.round(combos[combo].endPercent - combos[combo].startPercent);
    if (comboPct < DAMAGE_REQ_FOR_COMBO) {
      console.log('Combo damage too small: %d', comboPct);
      continue;
    }
    if (combos[combo].didKill == false) {
      console.log('Non-lethal combo: %d', comboPct);
      continue;
    }

    let comboSnip = {
      // path: slippiFile, //TODO: what goes here?
      startFrame: combos[combo].startFrame,
      endFrame: combos[combo].endFrame
    };

    comboJson.queue.push(comboSnip);
  }
  return comboJson;
};

module.exports = {
  readSlippiBuffer
};
