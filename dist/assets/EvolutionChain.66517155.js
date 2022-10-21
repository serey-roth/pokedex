import{a as l,j as t,B as d,e as _,F as x,R as g,_ as N,f as y,g as k,I as h,h as b,t as v,P as z,r as p,u,i as j}from"./index.1ae79bdc.js";const E=({details:e})=>{var s;return l("div",{className:"flex flex-col items-center w-[150px] h-[120px] lg:w-50px break-words",children:[e&&t("p",{className:"font-[400] text-md text-center",children:"Level Up"}),t(d,{className:"lg:block hidden w-full text-3xl"}),t(_,{className:"block lg:hidden w-full text-3xl"}),(e==null?void 0:e.min_level)&&l("p",{className:"font-[400] capitalize  text-md text-center",children:["At ",e.min_level," ",t("br",{}),e.turn_upside_down&&"(Turn Console Upside Down)"]}),(e==null?void 0:e.item)&&l("p",{className:"font-[400] capitalize text-md text-center",children:["Use ",e.item.name.replace(/\-/g," ")]}),(e==null?void 0:e.min_happiness)&&(e==null?void 0:e.time_of_day)&&l(x,{children:[l("p",{className:"font-[400] capitalize text-md text-center",children:["Happiness ",e.min_happiness,"+"]}),l("p",{className:"font-[400] capitalize text-md text-center",children:["At ",e.time_of_day,"time"]})]}),(e==null?void 0:e.location)&&l("p",{className:"font-[400] capitalize text-md text-center",children:["At ",e.location.name.replace(/\-/g," ")]}),(e==null?void 0:e.known_move)&&l("p",{className:"font-[400] capitalize text-md text-center",children:["Know ",e.known_move.name.replace(/\-/g," ")]}),(e==null?void 0:e.known_move_type)&&(e==null?void 0:e.min_affection)&&l(x,{children:[l("p",{className:"font-[400] capitalize text-md text-center",children:["Know ",e.known_move_type.name.replace(/\-/g," ")," Move"]}),l("p",{className:"font-[400] capitalize text-md text-center",children:["Affection ",e.min_affection,"+"]})]}),((s=e==null?void 0:e.trigger)==null?void 0:s.name)==="trade"&&t("p",{className:"font-[400] capitalize text-md text-center",children:"By Trading"})]})},A=g.lazy(()=>N(()=>import("./PokemonImage.42e1e67d.js"),["assets/PokemonImage.42e1e67d.js","assets/index.1ae79bdc.js","assets/index.c33c1d89.css"])),f=({name:e,details:s})=>{var i;const r=y(),{data:n,isFetching:c}=k(e);return c?t("div",{className:"w-[150px] lg:w-50px flex relative flex-col items-center justify-center",children:t(h,{children:t(b,{className:"absolute inset-0 w-[50px] h-[50px] animate-spin"})})}):l("div",{className:"flex lg:flex-row flex-col items-center justify-center",children:[s&&t(E,{details:s}),l("div",{className:"flex flex-col items-center justify-center gap-2",children:[t(g.Suspense,{fallback:t(h,{}),children:t("div",{className:"w-[150px] lg:w-50px",children:t(A,{src:(i=n==null?void 0:n.sprites)==null?void 0:i.other["official-artwork"].front_default})})}),l("div",{className:"flex flex-col items-center gap-1",children:[l("p",{children:["#",n==null?void 0:n.id]}),t("p",{className:`font-semibold capitalize cursor-pointer
                    ${n&&v[n.types[0].type.name].backgroundColor}
                    text-white rounded-lg p-2`,onClick:()=>r(`/pokemon/${n==null?void 0:n.id}`),children:n==null?void 0:n.name})]}),t("div",{className:"flex items-center gap-1",children:n==null?void 0:n.types.map(o=>t(z,{size:"w-[35px] h-[35px]",type:o.type.name},o.type.name))})]})]})},S=()=>{const[e,s]=p.exports.useState(null),[r,n]=p.exports.useState(null),c=u(m=>m.pokemon.species),i=u(m=>m.pokemon.type),{data:o}=j(e||null);return p.exports.useEffect(()=>{var m,a;if(c){const w=(a=(m=c.evolution_chain)==null?void 0:m.url)==null?void 0:a.match(/\/(\d+)\//g)[0].replace(/\//g,"");s(w)}},[c]),p.exports.useEffect(()=>{o!=null&&o.chain&&n(P(o))},[o]),l("div",{className:"flex flex-col w-full lg:items-center py-5 gap-5",children:[t("h1",{className:`font-bold text-xl uppercase w-fit self-center
            ${i&&v[i].backgroundColor} text-white
            rounded-lg p-2`,children:"Evolution Chain"}),(r==null?void 0:r.length)===1?t("p",{className:"w-full text-center font-semibold text-lg",children:"This pokemon does not evolve."}):t("div",{className:"flex flex-1 lg:flex-row lg:flex-wrap flex-col w-full gap-5 justify-center items-center lg:h-[200px]",children:C(r)})]})},C=e=>{let s=[],r=0;if(!e)return null;for(;r<e.length;){let n=e[r];if(n.children<=1)s.push(t(f,{name:n.name,details:n.details},n.name)),r++;else{let c=[];for(let i=1;i<=n.children;i++){const o=e[r+i];if(c.push(t(f,{name:o.name,details:o.details},o.name)),i%2===0){const m=l("div",{className:"flex lg:flex-row flex-col gap-1  items-center justify-center",children:[t(f,{name:n.name,details:n.details},n.name),t("div",{className:"flex lg:flex-col flex-row gap-2  items-center justify-center",children:c})]});s.push(m),c=[]}}s.push(c.length===1&&l("div",{className:"flex lg:flex-col flex-row gap-2  items-center justify-center",children:[t(f,{name:n.name,details:n.details},n.name),c[0]]})),r=n.children+1}}return s},P=e=>{let s=e.chain;const r=[],n=[];for(n.push(s);n.length>0;){const c=n.shift();let i=0;if(c.evolves_to.length>0)for(let m of c.evolves_to)i+=1,n.push(m);let o={};c.evolution_details.length>0&&Object.entries(c.evolution_details[0]).map(([m,a])=>{a&&(o[m]=a)}),Object.keys(o).length===0&&(o=null),r.push({name:c.species.name,id:e==null?void 0:e.id,details:o,children:i})}return r};export{S as default};
