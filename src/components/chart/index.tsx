import { FC } from 'react'
import useEcharts from '../../hooks/use-echarts.ts'
import { EChartsOption } from 'echarts'

interface ChartProps {
  option?: EChartsOption
  style?: React.CSSProperties
  loading?: boolean
  group?: string
}

const defaultOption: EChartsOption = {
  xAxis: {},
  yAxis: {},
  series: [
    {
      data: [],
    },
  ],
}

const Chart: FC<ChartProps> = ({ option = defaultOption, style, loading, group }: ChartProps) => {
  const { ref, style: styles } = useEcharts({
    option,
    style,
    group,
    loading,
  })

  return <div ref={ref} style={styles} />
}

export default Chart
