import{u as m,a as r,j as a,k as c,F as f,t as i,P as x}from"./index.18bf823a.js";const o=({mainType:l,effect:e,relation:s})=>r("div",{className:"flex flex-col gap-1",children:[a("p",{className:"w-full font-semibold text-md text-center",children:e}),a("div",{className:"flex flex-wrap h-[50px] overflow-auto gap-1 w-full items-center justify-center py-1",children:s.length>0?s.map(n=>a(x,{type:n.name,size:"w-[40px] h-[40px]"},`${l}-${e}-${n.name}`)):a("p",{className:"w-full text-center my-1",children:"None"})})]}),p=({type:l})=>{var s,n,t;const{data:e}=c(l);return a(f,{children:(e==null?void 0:e.damage_relations)&&r("div",{className:"flex flex-col border border-slate-400/50 rounded-lg px-3 py-2 lg:max-w-[300px] max-w-full",children:[a("p",{className:`font-bold text-md capitalize
                w-full text-center ${l&&i[l].backgroundColor}
                text-white rounded-lg p-2 backdrop-blur-sm`,children:l}),a(o,{mainType:l,effect:"0x",relation:(s=e==null?void 0:e.damage_relations)==null?void 0:s.no_damage_from}),a(o,{mainType:l,effect:"0.5x",relation:(n=e==null?void 0:e.damage_relations)==null?void 0:n.half_damage_from}),a(o,{mainType:l,effect:"2x",relation:(t=e==null?void 0:e.damage_relations)==null?void 0:t.double_damage_from})]})})},u=()=>{var e;const l=m(s=>s.pokemon.base);return r("div",{className:"w-full flex flex-col items-center justify-center gap-1",children:[a("h2",{className:"font-semibold text-lg w-full text-center",children:"Type Defenses"}),a("p",{className:"max-w-full flex flex-wrap text-center",children:"*effectiveness of types on this pokemon based on types"}),a("div",{className:"flex lg:flex-row flex-col gap-3 flex-wrap",children:(e=l==null?void 0:l.types)==null?void 0:e.map(s=>{var n,t;return a(p,{type:(n=s.type)==null?void 0:n.name},(t=s.type)==null?void 0:t.name)})})]})};export{u as default};
