import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import Icon from 'src/components/ui/Icon';
import Button from './Button';

type ModalType = {
  activeModal?: any;
  onClose?: any;
  noFade?: any;
  disableBackdrop?: any;
  className?: string;
  children?: any;
  footerContent?: any;
  centered?: any;
  scrollContent?: any;
  themeClass?: string;
  title?: string;
  unControl?: any;
  label?: string;
  labelClass?: any;
  ref?: any;
  handleSubmit?: () => void;
  isOpen: boolean;
  closeModal: () => void;
  openModal: () => void;
};

const Modal = ({
  noFade,
  disableBackdrop,
  className,
  children,
  footerContent,
  centered,
  scrollContent,
  themeClass = 'bg-slate-900 dark:bg-slate-800 dark:border-b dark:border-slate-700',
  title = 'Basic Modal',
  unControl,
  label = 'Basic Modal',
  labelClass,
  ref,
  handleSubmit,
  isOpen,
  closeModal,
  openModal,
}: ModalType) => {
  const returnNull = () => {
    return null;
  };

  return (
    <>
      {unControl ? (
        <>
          <button type='button' onClick={openModal} className={`btn ${labelClass}`}>
            {label}
          </button>
          <Transition appear show={isOpen} as={Fragment}>
            <Dialog as='div' className='relative z-[999]' onClose={!disableBackdrop ? closeModal : returnNull}>
              {!disableBackdrop && (
                <Transition.Child
                  as={Fragment}
                  enter={noFade ? '' : 'duration-300 ease-out'}
                  enterFrom={noFade ? '' : 'opacity-0'}
                  enterTo={noFade ? '' : 'opacity-100'}
                  leave={noFade ? '' : 'duration-200 ease-in'}
                  leaveFrom={noFade ? '' : 'opacity-100'}
                  leaveTo={noFade ? '' : 'opacity-0'}
                >
                  <div className='fixed inset-0 bg-slate-900/50 backdrop-filter backdrop-blur-sm' />
                </Transition.Child>
              )}

              <div className='fixed inset-0 overflow-y-auto'>
                <div
                  className={`flex min-h-full justify-center text-center p-6 ${
                    centered ? 'items-center' : 'items-start '
                  }`}
                >
                  <Transition.Child
                    as={Fragment}
                    enter={noFade ? '' : 'duration-300  ease-out'}
                    enterFrom={noFade ? '' : 'opacity-0 scale-95'}
                    enterTo={noFade ? '' : 'opacity-100 scale-100'}
                    leave={noFade ? '' : 'duration-200 ease-in'}
                    leaveFrom={noFade ? '' : 'opacity-100 scale-100'}
                    leaveTo={noFade ? '' : 'opacity-0 scale-95'}
                  >
                    <Dialog.Panel
                      className={`${className} max-w-xl w-full transform rounded-md bg-white dark:bg-slate-800 text-left align-middle shadow-xl transition-all `}
                    >
                      <div
                        className={` ${themeClass} relative overflow-hidden py-4 px-5 text-white flex justify-between `}
                      >
                        <h2 className='capitalize leading-6 tracking-wider font-medium text-base text-white'>
                          {title}
                        </h2>
                        <button onClick={closeModal} className='text-[22px]'>
                          <Icon icon='heroicons-outline:x' />
                        </button>
                      </div>
                      <div className={`px-6 py-8 ${scrollContent ? 'overflow-y-auto max-h-[400px]' : ''}`}>
                        {children}
                      </div>

                      {footerContent && (
                        <div className='px-4 py-3 flex justify-end space-x-3 border-t border-slate-100 dark:border-slate-700'>
                          {footerContent}
                        </div>
                      )}
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        </>
      ) : (
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as='div' className='fixed inset-0 z-[99999]' onClose={closeModal}>
            <Transition.Child
              as={Fragment}
              enter={noFade ? '' : 'duration-300 ease-out'}
              enterFrom={noFade ? '' : 'opacity-0'}
              enterTo={noFade ? '' : 'opacity-100'}
              leave={noFade ? '' : 'duration-200 ease-in'}
              leaveFrom={noFade ? '' : 'opacity-100'}
              leaveTo={noFade ? '' : 'opacity-0'}
            >
              {!disableBackdrop && <div className='fixed inset-0 bg-slate-900/50 backdrop-filter backdrop-blur-sm' />}
            </Transition.Child>

            <div className='fixed inset-0 z-30 w-screen overflow-y-auto"'>
              <div
                className={`flex min-h-full justify-center text-center p-6 ${
                  centered ? 'items-center' : 'items-start '
                }`}
              >
                <Transition.Child
                  as={Fragment}
                  enter={noFade ? '' : 'duration-300  ease-out'}
                  enterFrom={noFade ? '' : 'opacity-0 scale-95'}
                  enterTo={noFade ? '' : 'opacity-100 scale-100'}
                  leave={noFade ? '' : 'duration-200 ease-in'}
                  leaveFrom={noFade ? '' : 'opacity-100 scale-100'}
                  leaveTo={noFade ? '' : 'opacity-0 scale-95'}
                >
                  <Dialog.Panel
                    className={`w-full transform rounded-md
                 bg-white dark:bg-slate-800 text-left align-middle shadow-xl transition-all max-w-xl ${className}`}
                  >
                    <div
                      className={`relative overflow-hidden py-4 px-5 text-white flex justify-between  ${themeClass}`}
                    >
                      <h2 className='capitalize leading-6 tracking-wider font-medium text-base text-white'>{title}</h2>
                      <button onClick={closeModal} className='text-[22px]'>
                        <Icon icon='heroicons-outline:x' />
                      </button>
                    </div>
                    <div className={`px-6 py-8 ${scrollContent ? 'overflow-y-auto max-h-[400px]' : ''}`}>
                      {children}
                    </div>

                    {footerContent && (
                      <div className='px-4 py-3 flex justify-end space-x-3 border-t border-slate-100 dark:border-slate-700'>
                        {footerContent}
                      </div>
                    )}
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      )}
    </>
  );
};

export default Modal;
