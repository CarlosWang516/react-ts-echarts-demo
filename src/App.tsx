import { EChartsOption } from 'echarts'
import * as echarts from 'echarts'
import useMockData from './hooks/use-mock-data.ts'
import dayjs, { ConfigType } from 'dayjs'
import Chart from './components/chart'

function App() {
  const { data, loading } = useMockData()

  const group = 'group1'
  const defaultOption: EChartsOption = {
    title: {
      text: 'ECharts example',
      left: '0',
      top: 'middle',
      textAlign: 'center',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'line' },
      formatter: (params: any) => {
        const date = params[0].value[0]
        const value = params[0].value[1]
        return `Time: ${dayjs(date).format('YYYY/MM/DD HH:mm')}<br/>Rain: ${value}`
      },
    },
    legend: {
      data: ['Rain'],
    },
    xAxis: {
      type: 'time',
      axisLabel: {
        formatter: (value: ConfigType) => {
          return dayjs(value).format('HH:00')
        },
      },
      splitNumber: 24,
    },
    yAxis: {},
  }

  const barChartOption: EChartsOption = {
    ...defaultOption,
    yAxis: {
      ...defaultOption.yAxis,
      inverse: true,
    },
    series: [
      {
        name: 'Rain',
        type: 'bar',
        data: data.map(i => [i.time, i.barData.toFixed(4)]),
      },
    ],
  }

  const lineChartOption: EChartsOption = {
    ...defaultOption,
    series: [
      {
        name: 'Rain',
        type: 'line',
        data: data.map(i => [i.time, i.lineData.toFixed(4)]),
      },
    ],
  }

  const scatterChartOption: EChartsOption = {
    ...defaultOption,
    series: [
      {
        name: 'Rain',
        type: 'scatter',
        data: data.map(i => [i.time, i.scatterData]),
      },
    ],
  }

  echarts.connect(group)
  return (
    <>
      <Chart option={barChartOption} loading={loading} group={group} />
      <Chart option={lineChartOption} loading={loading} group={group} />
      <Chart option={scatterChartOption} loading={loading} group={group} />
    </>
  )
}

export default App
