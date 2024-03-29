import clsx from 'clsx';
import Image from 'next/image';
import Price from '../price';

export function GridTileImage({
  isInteractive = true,
  active,
  label,
  ...props
}) {
  return (
    <div
      className={clsx(
        'group flex h-full w-full items-center justify-center overflow-hidden rounded-lg border hover:border-[#7A26C1] bg-[#030014] backdrop-blur-2xl',
        {
          relative: label,
          'border-2 border-blue-600': active,
          'border-neutral-200 dark:border-neutral-800': !active
        }
      )}
    >
      {props.src ? (
        // eslint-disable-next-line jsx-a11y/alt-text -- `alt` is inherited from `props`, which is being enforced with TypeScript
        <Image
          className={clsx('relative h-full w-full object-contain', {
            'transition duration-300 ease-in-out group-hover:scale-105': isInteractive
          })}
          {...props}
        />
      ) : null}
      {label ? (
        <div
        className={clsx('absolute bottom-0 left-0 flex w-full px-4 pb-4 @container/label', {
          'lg:px-20': 'center'
        })}
      >
        <div className="flex items-center rounded-full border bg-white/70 p-1 text-xs font-semibold text-black backdrop-blur-md dark:border-neutral-800 dark:bg-black/70 dark:text-white">
          <h3 className="mr-4 line-clamp-2 flex-grow pl-2 leading-none tracking-tight">{label.title}</h3>
          <Price
            className="flex-none rounded-full bg-blue-600 p-2 text-white"
            amount={label.amount}
            currencyCode={label.currencyCode}
            currencyCodeClassName="hidden @[275px]/label:inline"
          />
        </div>
      </div>
      ) : null}
    </div>
  );
}