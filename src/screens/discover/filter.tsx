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

export const useFilter = (originalFilters: FilterDataType[]) => {
  const originalState: FilterStateType[] = originalFilters.map((filter) => ({
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

  return [filters, setFilter] as const
}

export const Filter = ({
  filterData,
  updater,
}: {
  filterData: FilterDataType[]
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
