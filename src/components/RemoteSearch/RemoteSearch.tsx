import React, { useEffect, useState } from 'react'
import { Select, Spin } from 'antd';
import { SelectProps } from 'antd/es/select';
import debounce from 'lodash/debounce';

export interface DebounceSelectProps<ValueType = any>
  extends Omit<SelectProps<ValueType>, 'options' | 'children'> {
  fetchOptions: (search: string) => Promise<ValueType[]>;
  debounceTimeout?: number;
  onFirstLoad?: (options: ValueType[]) => void
}


function RemoteSelect<ValueType extends { key?: string; label: React.ReactNode; value: string | number } = any>(
  {
    fetchOptions,
    debounceTimeout = 400,
    onFirstLoad,
    ...props
  }: DebounceSelectProps
) {
  const initRef = React.useRef<boolean>(false)
  const [fetching, setFetching] = React.useState(false)
  const [options, setOptions] = React.useState<ValueType[]>([])
  const [canSet, setCanSet] = useState<boolean>(true)
  const fetchRef = React.useRef(0)
  
  const debounceFetcher = React.useMemo(() => {
    const loadOptions = (value: string) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current
      canSet && setOptions([])
      canSet && setFetching(true)

      fetchOptions(value).then(newOptions => {
        if (fetchId !== fetchRef.current) {
          return
        }
        canSet && setOptions(newOptions);
        canSet && setFetching(false)

        initRef.current || (onFirstLoad && onFirstLoad(newOptions))

        initRef.current = true
      })
    }
    return debounce(loadOptions, debounceTimeout)
  }, [fetchOptions, debounceTimeout, canSet, onFirstLoad])

  useEffect(() => {
    debounceFetcher('')
  }, [debounceFetcher])

  useEffect(() => {
    return () => {
      setCanSet(false)
    }
  }, [])

  return (
    <Select<ValueType>
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      options={options}
      {...props}
    />
  );
}

export default RemoteSelect
