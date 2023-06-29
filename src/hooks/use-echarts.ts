import * as echarts from 'echarts'
import { useEffect, useRef } from 'react'
import { ECharts, EChartsOption } from 'echarts'
import { useSize } from 'ahooks'

interface EchartsProps {
  // EchartsOption: https://echarts.apache.org/zh/option.html
  option: EChartsOption
  // 图表容器的样式
  style?: React.CSSProperties
  // 用于将多个图表绑定在一起，以达到联动的效果
  group?: string
}

const useEcharts = ({
  option,
  style = { width: '100%', height: '400px' },
  group,
}: EchartsProps) => {
  // 图表容器的引用
  const containerRef = useRef<HTMLDivElement | null>(null)
  // 图表实例的引用
  const chartRef = useRef<ECharts | null>(null)
  // 观察窗口大小变化
  const size = useSize(containerRef)

  /* 销毁图表实例 */
  function destroyEcharts() {
    if (chartRef.current) {
      if (typeof chartRef.current.clear === 'function') chartRef.current.clear()
      if (typeof chartRef.current.dispose === 'function') chartRef.current.dispose()
      chartRef.current = null
    }
  }

  /* 调整图表实例的大小 */
  function resizeEcharts() {
    if (chartRef.current) {
      chartRef.current.resize()
    }
  }

  useEffect(() => {
    destroyEcharts()

    if (containerRef.current) {
      chartRef.current = echarts.init(containerRef.current)
    }

    return () => destroyEcharts()
  }, [])

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.setOption(option)
      // 如果 group 存在，则进行绑定实现联动
      if (group) {
        chartRef.current.group = group
      }
    }
  }, [option, group])

  useEffect(() => {
    resizeEcharts()
  }, [size])

  // 返回图表容器的引用和样式
  return { ref: containerRef, style }
}

export default useEcharts
