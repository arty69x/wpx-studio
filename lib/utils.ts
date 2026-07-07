export const slugify=(v:string)=>v.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
export const cx=(...v:(string|false|undefined|null)[])=>v.filter(Boolean).join(' ');
