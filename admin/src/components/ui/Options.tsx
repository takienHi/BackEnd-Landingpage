import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const fruits = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
  { value: 'orange', label: 'Orange' },
  { value: 'apple', label: 'Apple' },
];

const animatedComponents = makeAnimated();

// Fixed Options Select

const styles = {
  multiValue: (base: any, state: any) => {
    return state.data.isFixed ? { ...base, opacity: '0.5' } : base;
  },
  multiValueLabel: (base: any, state: any) => {
    return state.data.isFixed ? { ...base, color: '#626262', paddingRight: 6 } : base;
  },
  multiValueRemove: (base: any, state: any) => {
    return state.data.isFixed ? { ...base, display: 'none' } : base;
  },
  option: (provided: any, state: any) => ({
    ...provided,
    fontSize: '14px',
  }),
  // menuPortal: (base: any) => ({ ...base, zIndex: 999999 }),
  menu: (provided: any) => ({ ...provided, zIndex: 9999999 }),
};

type OptionsSelectProps = {
  options: { value: any; label: string }[];
  name: string;
};
// start component
const OptionsSelect = ({ options, name }: OptionsSelectProps) => {
  return (
    <div>
      <label className='form-label' htmlFor='animated_1'>
        Animated Select
      </label>
      <Select
        isClearable={false}
        closeMenuOnSelect={false}
        components={animatedComponents}
        defaultValue={[options[0]]}
        name={name}
        isMulti
        options={options}
        styles={styles}
        className='react-select '
        classNamePrefix='select'
        id='animated_1'
      />
    </div>
  );
};

export default OptionsSelect;
