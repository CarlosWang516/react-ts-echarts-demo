import {EChartsOption} from "echarts";
import dayjs, {ConfigType} from "dayjs";

export type MockData = {
  // 时间
  time: Date
  // 线图数据
  lineData: number
  // 柱状图数据
  barData: number
  // 散点图数据
  scatterData: number
}

export const defaultOption: EChartsOption = {
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
