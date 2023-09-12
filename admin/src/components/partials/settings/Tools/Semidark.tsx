import Switch from 'src/components/ui/Switch';
import useSemiDark from 'src/hooks/useSemiDark';

const Semidark = () => {
  const [isSemiDark, setSemiDark] = useSemiDark();
  return (
    <div className=' flex justify-between'>
      <div className='text-slate-600 text-base dark:text-slate-300 font-normal'>Semi Dark</div>
      <Switch value={isSemiDark} onChange={() => setSemiDark(!isSemiDark)} id='semi_nav_tools' />
    </div>
  );
};

export default Semidark;
