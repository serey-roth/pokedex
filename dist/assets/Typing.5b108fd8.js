import{u as c,a as o,j as a,k as m,F as i,t as f,P as x}from"./index.5dc16375.js";const r=({mainType:l,effect:e,relation:s})=>o("div",{className:"flex flex-col gap-1",children:[a("p",{className:"w-full font-semibold text-md text-center",children:e}),a("div",{className:"flex h-[50px] gap-1 w-full items-center justify-center",children:s.length>0?s.map(n=>a(x,{type:n.name,size:"w-[40px] h-[40px]"},`${l}-${e}-${n.name}`)):a("p",{className:"w-full text-center my-1",children:"None"})})]}),d=({type:l})=>{var s,n,t;const{data:e}=m(l);return a(i,{children:(e==null?void 0:e.damage_relations)&&o("div",{className:"flex flex-col border border-slate-400/50 rounded-lg px-3 py-2",children:[a("p",{className:`font-bold text-md capitalize
                w-full text-center ${l&&f[l].backgroundColor}
                text-white rounded-lg p-2 backdrop-blur-sm`,children:l}),a(r,{mainType:l,effect:"0x",relation:(s=e==null?void 0:e.damage_relations)==null?void 0:s.no_damage_from}),a(r,{mainType:l,effect:"0.5x",relation:(n=e==null?void 0:e.damage_relations)==null?void 0:n.half_damage_from}),a(r,{mainType:l,effect:"2x",relation:(t=e==null?void 0:e.damage_relations)==null?void 0:t.double_damage_from})]})})},g=()=>{var e;const l=c(s=>s.pokemon.base);return o("div",{className:"w-full flex flex-col items-center justify-center gap-1",children:[a("h2",{className:"font-semibold text-lg w-full text-center",children:"Type Defenses"}),a("p",{className:"max-w-full flex flex-wrap text-center",children:"*effectiveness of types on this pokemon based on types"}),a("div",{className:"flex lg:flex-row flex-col gap-3 flex-wrap",children:(e=l==null?void 0:l.types)==null?void 0:e.map(s=>{var n,t;return a(d,{type:(n=s.type)==null?void 0:n.name},(t=s.type)==null?void 0:t.name)})})]})};export{g as default};
