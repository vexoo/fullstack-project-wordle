import { Dialog, Transition } from '@headlessui/react'
import { XCircleIcon } from '@heroicons/react/outline'
import { Fragment } from 'react'

const BaseModal = ({ title, children, isOpen, handleClose }) => {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as='div'
        className='fixed inset-0 z-10 overflow-y-auto'
        open={isOpen}
        onClose={handleClose}
      >
        <div className='flex min-h-full items-center justify-center px-4 py-10 text-center sm:p-0'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 min-h-screen bg-gray-800 bg-opacity-75 transition-opacity' />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            enterTo='opacity-100 translate-y-0 sm:scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 translate-y-0 sm:scale-100'
            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
          >
            <div className='inline-block transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left align-bottom shadow-xl transition-all dark:bg-gray-900 sm:my-8 sm:w-full sm:max-w-sm sm:p-6 sm:align-middle'>
              <button
                onClick={handleClose}
                tabIndex={0}
                aria-pressed='false'
                className='absolute right-4 top-4'
              >
                <XCircleIcon className='h-6 w-6 cursor-pointer dark:stroke-white' />
              </button>
              <div>
                <div className='text-center'>
                  <Dialog.Title className='text-lg font-medium leading-6 text-gray-900 dark:text-gray-100'>
                    {title}
                  </Dialog.Title>
                  <div className='mt-2'>{children}</div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default BaseModal
