import styled from '@emotion/styled'
import { Checkbox as AntCheckbox, Row } from 'antd'
import { useState } from 'react'
import { color } from 'style/color'

const CheckboxGroup = AntCheckbox.Group

export type FilterDataType = {
  name: string
  title: string
  options: { label: string; value: string }[]
}

export type FilterStateType = {
  name: string
  values: string[]
}

export type SetFilter = (filtername: string, values: string[]) => void

export type FilterGroupProp = {
  updater: SetFilter
  data: FilterDataType
}

const filterData: FilterDataType[] = [
  {
    name: 'licenses',
    title: '版权许可',
    options: [
      { label: '允许修改', value: 'to-change' },
      { label: '允许商用', value: 'to-commertial' },
      { label: '允许分享', value: 'to-share' },
      { label: '允许个人使用', value: 'to-personal' },
    ],
  },
  {
    name: 'instruments',
    title: '乐器',
    options: [
      { label: '键盘', value: 'keyboard' },
      { label: '弦乐', value: 'string' },
      { label: '管乐', value: 'wind' },
      { label: '打击乐', value: 'percussion' },
      { label: '声乐', value: 'vocal' },
      { label: '乐队', value: 'band' },
      { label: '其他', value: 'other' },
    ],
  },
  {
    name: 'genres',
    title: '风格',
    options: [
      { label: '古典', value: 'classical' },
      { label: '流行', value: 'pop' },
      { label: '爵士', value: 'jazz' },
      { label: '乡村', value: 'country' },
      { label: '摇滚', value: 'rock' },
      { label: '民乐', value: 'chinese' },
      { label: '世界音乐', value: 'world-music' },
      { label: '其他', value: 'other' },
    ],
  },
]

export const useFilter = () => {
  const originalState: FilterStateType[] = filterData.map((filter) => ({
    name: filter.name,
    values: [],
  }))

  const [filters, setState] = useState(originalState)
  const setFilter: SetFilter = (filterName: string, values: string[]) => {
    const newFilters = [...filters]
    const index = filters.findIndex((filter) => filter.name === filterName)
    newFilters[index].values = values
    setState(newFilters)
  }
  const filterQuery = filters
    .filter((each) => each.values.length !== 0)
    .map((each) => `${each.name}=${each.values.join(',')}`)
    .join('&')

  return [filters, filterQuery, setFilter] as const
}

export const Filter = ({
  updater,
}: {
  filterState: FilterStateType[]
  updater: SetFilter
}) => {
  return (
    <Container>
      {filterData.map((filter) => (
        <FilterGroup key={filter.name} data={filter} updater={updater} />
      ))}
    </Container>
  )
}

const FilterGroup = ({ data, updater: setFilter }: FilterGroupProp) => {
  return (
    <Group>
      <Title>{data.title}</Title>
      <CheckboxGroup
        onChange={(values) => setFilter(data.name, values as string[])}
      >
        {data.options.map((filter) => (
          <Row key={filter.value}>
            <Checkbox value={filter.value}>{filter.label}</Checkbox>
          </Row>
        ))}
      </CheckboxGroup>
    </Group>
  )
}

const Container = styled.div``

const Group = styled.div`
  margin-bottom: 2rem;
`

const Title = styled.h4`
  padding-bottom: 0.6rem;
  margin-bottom: 0.7rem;
  font-size: 1.4rem;
  font-weight: 500;
  border-bottom: 1px solid #dbe3e9;
  color: #8691a6;
`

const Checkbox = styled(AntCheckbox)`
  padding-left: 2rem;
  font-size: 1.2rem;
  color: ${color.somber};
`
