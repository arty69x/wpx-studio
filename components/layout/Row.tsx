import type {ReactNode} from 'react';
export function Row({children,className=''}:{children:ReactNode;className?:string}){return <div className={`flex flex-wrap gap-6 ${className}`}>{children}</div>}
