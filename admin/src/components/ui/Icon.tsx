import { Icon as ReactIcon } from '@iconify/react';
const Icon = ({ icon, className, width, rotate, hFlip, vFlip }: any) => {
  return (
    <>
      <ReactIcon width={width} rotate={rotate} hFlip={hFlip} icon={icon} className={className} vFlip={vFlip} />
    </>
  );
};

export default Icon;
