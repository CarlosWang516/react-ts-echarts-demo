import { useEffect, useState } from 'react'
import Mock from 'mockjs'

/* 生成全天数据(间隔 5 分钟) */
function generateAllDayData() {
  const start = new Date()
  start.setHours(0, 0, 0, 0)
  const data = []
  for (let i = 0; i < (24 * 60) / 5; i++) {
    const time = new Date(start.getTime() + 5 * 60 * 1000 * i)
    data.push(time)
  }
  return data
}

type MockData = {
  // 时间
  time: Date
  // 线图数据
  lineData: number
  // 柱状图数据
  barData: number
  // 散点图数据
  scatterData: number
}

const useMockData = () => {
  const [data, setData] = useState<MockData[]>([])

  useEffect(() => {
    const timeSeries = generateAllDayData()
    const mockData = timeSeries.map(time => ({
      time,
      lineData: Mock.Random.float(10, 100),
      barData: Mock.Random.integer(10, 100),
      scatterData: Mock.Random.integer(10, 100),
    }))
    setData(mockData)
  }, [])

  return data
}

export default useMockData
