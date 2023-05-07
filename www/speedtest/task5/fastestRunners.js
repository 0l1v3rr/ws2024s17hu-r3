/**
 * Task 5 — JavaScript: Fastest runners
 */

/**
 * @typedef {Object} Runner
 * @property {String} name
 * @property {String[]} paces
 * @typedef {Object} Result
 * @property {String} name
 * @property {String} averagePace
 * @property {String} fastestPace
 */

/**
 * @param {Runner[]} runners
 * @return {Result[]}
 */

function fastestRunners(runners) {
  const res = [];
  let allPacesInSec = 0;

  for (const runner of runners) {
    let paceSumInSec = 0;
    let fastest = 1000000;

    for (const pace of runner.paces) {
      const [min, sec] = pace.split(":").map(Number);
      const curr = min * 60 + sec;

      paceSumInSec += curr;
      if (curr < fastest) fastest = curr;
    }

    allPacesInSec += paceSumInSec;

    res.push({
      name: runner.name,
      averagePace: formatMS(Math.floor(paceSumInSec / 7)),
      fastestPace: formatMS(fastest),
      sumSec: Math.floor(paceSumInSec / 7),
    });
  }

  const avg = Math.floor(allPacesInSec / (7 * runners.length));

  return res
    .filter((x) => x.sumSec < avg)
    .sort((a, z) => a.sumSec - z.sumSec)
    .map((x) => ({
      name: x.name,
      averagePace: x.averagePace,
      fastestPace: x.fastestPace,
    }));
}

function formatMS(sec) {
  const min = Math.floor(sec / 60);
  sec %= 60;
  return `${min}:${sec.toString().padStart(2, "0")}`;
}
