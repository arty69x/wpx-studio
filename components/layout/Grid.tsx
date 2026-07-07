import type {ReactNode} from 'react';
export function Grid({children,className=''}:{children:ReactNode;className?:string}){return <div className={`grid gap-6 ${className}`}>{children}</div>}
