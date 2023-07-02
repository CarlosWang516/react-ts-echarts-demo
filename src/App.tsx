import { EChartsOption } from 'echarts'
import * as echarts from 'echarts'
import useMockData, {getMockData} from './hooks/use-mock-data.ts'
import Chart from './components/chart/chart.tsx'
import { defaultOption } from './constants'

function App() {
  const { data, loading } = useMockData()

  const group = 'group1'

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
        data: getMockData().map(i => [i.time, i.barData]),
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
