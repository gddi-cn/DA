import React, { useEffect, useState } from 'react'
import { Divider, Select, Spin } from 'antd'
import { SelectProps } from 'antd/es/select';
import debounce from 'lodash/debounce';


export interface RemoteSearchProps<ValueType = any>
  extends Omit<SelectProps<ValueType>, 'options' | 'children'> {
  fetchOptions: (search: string) => Promise<ValueType[]>;
  debounceTimeout?: number;
  onFirstLoad?: (options: ValueType[]) => void
  getExtendOptions?: (refresh: () => void) => React.ReactNode;
}

export interface RemoteSearchRef {
  refresh(): void
}

interface ValueType {
  key?: string | number
  label: React.ReactNode
  value: string| number
}

function RemoteSearchInner<T extends ValueType = any> (
  {
    fetchOptions,
    debounceTimeout = 400,
    onFirstLoad,
    getExtendOptions,
    ...props
  }: RemoteSearchProps<T>,
  ref: React.ForwardedRef<RemoteSearchRef>,
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

  const refresh = () => {
    fetchOptions('').then(newOptions => {
      canSet && setOptions(newOptions);
      canSet && setFetching(false)

      initRef.current || (onFirstLoad && onFirstLoad(newOptions))

      initRef.current = true
    })
  }

  React.useImperativeHandle(ref, () => ({
    refresh,
  }))

  useEffect(() => {
    debounceFetcher('')
  }, [debounceFetcher])

  useEffect(() => {
    debounceFetcher('')
  }, [debounceFetcher])

  useEffect(() => {
    return () => {
      setCanSet(false)
    }
  }, [])

  return (
    <Select<T>
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      options={options}
      optionLabelProp='label'
      dropdownRender={menu => (
        <>
          {
            getExtendOptions ? (
              <>
                <div style={{ padding: '4px 8px 0' }}>
                  { getExtendOptions(() => { debounceFetcher('') } ) }
                </div>
                <Divider style={{ margin: '8px 0' }} />
              </>
            ) : null
          }
          {menu}
        </>
      )}
      {...props}
    />
  );
}

const RemoteSearch = React.forwardRef(RemoteSearchInner) as <T>(
  props: RemoteSearchProps<T> & { ref?: React.ForwardedRef<RemoteSearchRef> }
) => ReturnType<typeof RemoteSearchInner>

export default RemoteSearch

