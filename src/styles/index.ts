export type predefinedStyle = {
  symbol: {
    symbolType: string,
    src: string,
    size: [number, number],
    color: string,
    rotateWithView: boolean,
    offset: [number, number]
  }
}
export const predefinedStyles = {
  'icons': {
    symbol: {
      symbolType: 'image',
      src: 'data/icon.png',
      size: [18, 28],
      color: 'lightyellow',
      rotateWithView: false,
      offset: [0, 9],
    },
  },
  'triangles': {
    symbol: {
      symbolType: 'triangle',
      size: 18,
      color: [
        'interpolate',
        ['linear'],
        ['get', 'population'],
        20000,
        '#5aca5b',
        300000,
        '#ff6a19'],
      rotateWithView: true,
    },
  },
  'triangles-latitude': {
    symbol: {
      symbolType: 'triangle',
      size: [
        'interpolate',
        ['linear'],
        ['get', 'population'],
        40000,
        12,
        2000000,
        24],
      color: [
        'interpolate',
        ['linear'],
        ['get', 'latitude'],
        -60,
        '#ff14c3',
        -20,
        '#ff621d',
        20,
        '#ffed02',
        60,
        '#00ff67'],
      offset: [0, 0],
      opacity: 0.95,
    },
  },
  'circles': {
    symbol: {
      symbolType: 'circle',
      size: [
        'interpolate',
        ['linear'],
        ['get', 'population'],
        40000,
        8,
        2000000,
        28],
      color: '#006688',
      rotateWithView: false,
      offset: [0, 0],
      opacity: [
        'interpolate',
        ['linear'],
        ['get', 'population'],
        40000,
        0.6,
        2000000,
        0.92],
    },
  },
  'circles-zoom': {
    symbol: {
      symbolType: 'circle',
      size: ['interpolate', ['exponential', 2.5], ['zoom'], 2, 1, 14, 32],
      color: '#240572',
      offset: [0, 0],
      opacity: 0.95,
    },
  },
  'rotating-bars': {
    symbol: {
      symbolType: 'square',
      rotation: ['*', ['time'], 0.1],
      size: [
        'array',
        4,
        [
          'interpolate',
          ['linear'],
          ['get', 'population'],
          20000,
          4,
          300000,
          28]],
      color: [
        'interpolate',
        ['linear'],
        ['get', 'population'],
        20000,
        '#ffdc00',
        300000,
        '#ff5b19'],
      offset: [
        'array',
        0,
        [
          'interpolate',
          ['linear'],
          ['get', 'population'],
          20000,
          2,
          300000,
          14]],
    },
  },
};

