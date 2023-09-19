import { useState } from 'react';
import { useAsyncDebounce } from 'react-table';
import Textinput from 'src/components/ui/Textinput';

const GlobalFilter = ({ globalFilter, setGlobalFilter }: any) => {
  const [value, setValue] = useState(globalFilter);
  const onChange = (e: any) => {
    setValue(e.target.value);
    onChange2(e.target.value);
  };
  const onChange2 = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 250);
  return <Textinput value={value || ''} onChange={onChange} placeholder='search...' />;
};

export default GlobalFilter;
