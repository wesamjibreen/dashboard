import type { ChartOptions } from 'billboard.js'
import { themeColors } from '/@src/utils/themeColors'
import { step, areaStep } from 'billboard.js'

export const options: ChartOptions = {
  data: {
    columns: [
      ['data1', 300, 350, 300, 0, 0, 100],
      ['data2', 130, 100, 140, 200, 150, 50],
    ],
    colors: {
      data1: themeColors.accent,
      data2: themeColors.primary,
      data3: themeColors.orange,
      data4: themeColors.purple,
    },
    types: {
      data1: step(),
      data2: areaStep(),
    },
  },
  size: {
    height: 280,
  },
  padding: {
    bottom: 20,
  },
  title: {
    text: 'Step Chart',
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
