import type { ChartOptions } from 'billboard.js'
import { themeColors } from '/@src/utils/themeColors'
import { radar } from 'billboard.js'

export const options: ChartOptions = {
  data: {
    x: 'x',
    columns: [
      ['x', 'Data A', 'Data B', 'Data C', 'Data D', 'Data E'],
      ['data1', 330, 350, 200, 380, 150],
      ['data2', 130, 100, 30, 200, 80],
      ['data3', 230, 153, 85, 300, 250],
    ],
    colors: {
      data1: themeColors.accent,
      data2: themeColors.primary,
      data3: themeColors.info,
      data4: themeColors.purple,
    },
    type: radar(),
    labels: true,
  },
  radar: {
    axis: {
      max: 400,
    },
    level: {
      depth: 4,
    },
    direction: {
      clockwise: true,
    },
  },
  size: {
    height: 280,
  },
  padding: {
    bottom: 20,
  },
  title: {
    text: 'Radar Chart',
    position: 'left',
    padding: {
      bottom: 20,
      right: 20,
      top: 0,
      left: 20,
    },
  },
  legend: {
    position: 'inset',
  },
}
