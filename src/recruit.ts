import cfg from '../config.json'


type RollCount = {
  rolls: number,
  rest: number
}

type RollCounts = {
  1: RollCount,
  2: RollCount,
  5: RollCount,
  10: RollCount,
  20: RollCount,
  50: RollCount,
}


export function getAllRollCounts(inputData: number[], denominationMap = cfg.denominationMap): RollCounts {
  const initialOutput = {
    1: { rolls: 0, rest: 0 },
    2: { rolls: 0, rest: 0 },
    5: { rolls: 0, rest: 0 },
    10: { rolls: 0, rest: 0 },
    20: { rolls: 0, rest: 0 },
    50: { rolls: 0, rest: 0 }
  }

  return inputData.reduce((acc, cur) => {
    const rest = acc[cur].rest + 1
    const isRollFull = rest === denominationMap[cur]
    acc[cur].rest = isRollFull ? 0 : rest
    acc[cur].rolls = isRollFull ? acc[cur].rolls + 1 : acc[cur].rolls
    return acc
  }, initialOutput)
}