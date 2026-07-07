import type {ReactNode} from 'react';
export function Column({children,className=''}:{children:ReactNode;className?:string}){return <div className={`min-w-0 flex-1 ${className}`}>{children}</div>}
