import { useEffect, useState } from 'react'
import Mock from 'mockjs'
import { MockData } from '../constants'

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

export function getMockData() {
  const timeSeries = generateAllDayData()
  return timeSeries.map(time => ({
    time,
    lineData: Mock.Random.float(10, 100),
    barData: Mock.Random.integer(10, 100),
    scatterData: Mock.Random.integer(10, 100),
  }))
}

const useMockData = () => {
  const [data, setData] = useState<MockData[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      const mockData = getMockData()
      setData(mockData)
      setLoading(false)
    }, 2000)
  }, [])

  return { data, loading }
}

export default useMockData
