import Switch from 'src/components/ui/Switch';
import useRtl from 'src/hooks/useRtl';

const RtlSwicth = () => {
  const [isRtl, setRtl] = useRtl();
  return (
    <div className='flex justify-between'>
      <div className='text-slate-600 text-base dark:text-slate-300'>Rtl</div>
      <Switch value={isRtl} onChange={() => setRtl(!isRtl)} id='rtl_nav_tools' />
    </div>
  );
};

export default RtlSwicth;
