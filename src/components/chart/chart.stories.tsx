import Chart from './chart.tsx'
import { Meta, StoryObj } from '@storybook/react'
import { defaultOption } from '../../constants'
import { getMockData } from '../../hooks'

const meta = {
  title: 'Chart',
  component: Chart,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Chart>

export default meta
type Story = StoryObj<typeof Chart>

export const BarChart: Story = {
  args: {
    option: {
      ...defaultOption,
      yAxis: {
        ...defaultOption.yAxis,
        inverse: true,
      },
      series: [
        {
          name: 'Rain',
          type: 'bar',
          data: getMockData().map(i => [i.time, i.barData]),
        },
      ],
    },
    loading: true,
  },
}

export const LineChart: Story = {
  args: {
    option: {
      ...defaultOption,
      series: [
        {
          name: 'Rain',
          type: 'line',
          data: getMockData().map(i => [i.time, i.barData]),
        },
      ],
    },
    loading: true,
  },
}

export const ScatterChart: Story = {
  args: {
    option: {
      ...defaultOption,
      series: [
        {
          name: 'Rain',
          type: 'scatter',
          data: getMockData().map(i => [i.time, i.scatterData]),
        },
      ],
    },
    loading: true,
  },
}
