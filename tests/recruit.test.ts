import { getAllRollCounts } from '../src/recruit';
import cfg from '../config.json';
import data from './data/sample.json';


describe('test getAllRollCounts function with empty array', () => {
  const coins = Object.keys(cfg.denominationMap);
  const emptyResult = coins.reduce((acc, key) => ({ [key]: { rolls: 0, rest: 0 }, ...acc }), {});
  const result = getAllRollCounts([]);

  it('needs to return the object', () => {
    expect(typeof result).toBe('object');
  });

  it('needs to return the object with [1, 2, 5, 10, 20, 50] keys', () => {
    const allKeysInResult = coins.every(k => Object.keys(result).includes(String(k)));
    expect(allKeysInResult).toBe(true);
  });

  it('returns {rolls: 0, rest:0} for every coin with empty input array', () => {
    expect(result).toMatchObject(emptyResult);
  });
});

describe('test getAllRollCounts function with coin 5 array only', () => {
  it('returns {rolls: 0, rest: 2} for coin 5 with input [5, 5]', () => {
    const result = getAllRollCounts([5, 5]);
    expect(result[5]).toMatchObject({ rolls: 0, rest: 2 });
  });

  it('returns {rolls: 1, rest: 2} for coin 5 with input [7x5]', () => {
    const result = getAllRollCounts(Array(35).fill(5));
    expect(result[5]).toMatchObject({ rolls: 1, rest: 5 });
  });
});

describe('test getAllRollCounts function with 1000 elems data input', () => {
  const result = getAllRollCounts(data.sampleInput);
  it('all rests in results are lesser than roll capacity', () => {
    const allRestsAreSmallerThanCapacity = Object.entries(result)
      .every(([key, props]) => props.rest < cfg.denominationMap[key]);
    expect(allRestsAreSmallerThanCapacity).toBe(true);
  });

  it('returns expected result for big data sample', () => {
    expect(result).toMatchObject(data.expectedResult);
  });
});