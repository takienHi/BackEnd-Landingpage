import { useState } from 'react';
import Textinput from 'src/components/ui/Textinput';
const GlobalFilter = ({ filter, setFilter }: any) => {
  const [value, setValue] = useState(filter);
  const onChange = (e: any) => {
    setValue(e.target.value);
    setFilter(e.target.value || undefined);
  };
  return (
    <div>
      <Textinput value={value || ''} onChange={onChange} placeholder='search...' />
    </div>
  );
};

export default GlobalFilter;
