import type {ReactNode} from 'react';
export function Stack({children,className=''}:{children:ReactNode;className?:string}){return <div className={`flex flex-col gap-4 ${className}`}>{children}</div>}
