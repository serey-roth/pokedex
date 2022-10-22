import{u as v,a as d,j as s,t as f,r as p}from"./index.18bf823a.js";const m=({label:l,proportion:r,value:a})=>{const o=v(e=>e.pokemon.type);return d("div",{className:"flex flex-row gap-1 flex-1 items-center",children:[s("p",{className:"text-center font-semibold w-[70px]",children:l}),s("div",{className:"flex-1 rounded-[50px] bg-slate-300/50 mr-2",children:s("div",{style:{width:`${r||0}%`,transition:"width 1s ease-in-out"},className:`w-1/2 h-full rounded-[50px]
                text-right py-1 ${o&&f[o].backgroundColor}`,children:s("span",{className:"mr-2 font-bold text-white",children:a})})})]})},w=(l,r,a,o)=>Math.floor((2*l+r+Math.floor(a/4))*o/100)+o+10,k=(l,r,a,o,e)=>Math.floor((Math.floor((2*l+r+Math.floor(a/4))*o/100)+5)*e),g=({mode:l,active:r,setMode:a})=>{const o=v(e=>e.pokemon.type);return s("button",{className:`capitalize font-bold w-1/2
        ${r&&`${o&&f[o].backgroundColor}
        text-white`}
        rounded-xl p-2 ${o&&f[o].textColor}
        hover:text-white ${o&&f[o].hoverColor}
        transition duration-300 ease-in-out`,onClick:a,children:l})},y=()=>{const[l,r]=p.exports.useState("base"),[a,o]=p.exports.useState(null),[e,N]=p.exports.useState(null),[n,M]=p.exports.useState(1),{type:x,base:u}=v(t=>t.pokemon);return p.exports.useEffect(()=>{let t,h;if(u){switch(l){case"min":{t=u.stats.map((c,b)=>b===0?w(c.base_stat,0,0,n):k(c.base_stat,0,0,n,.9));break}case"max":{t=u.stats.map((c,b)=>b===0?w(c.base_stat,31,252,n):k(c.base_stat,31,252,n,1.1));break}default:t=u.stats.map(c=>c.base_stat)}const i=Math.max(...t);h={hp:Math.floor(t[0]/i*100),atk:Math.floor(t[1]/i*100),def:Math.floor(t[2]/i*100),sp_atk:Math.floor(t[3]/i*100),sp_def:Math.floor(t[4]/i*100),spd:Math.floor(t[5]/i*100)}}o(t),N(h)},[n,l,u]),d("div",{className:"flex flex-col flex-1 w-full py-5 gap-3 items-center",children:[s("h1",{className:`font-bold text-xl uppercase
            ${x&&f[x].backgroundColor} text-white
            rounded-lg p-2`,children:"Pokemon Stats"}),d("div",{className:"flex gap-3 items-center justify-evenly",children:[s(g,{mode:"base",active:l==="base",setMode:t=>r(t.target.innerText.toLowerCase())}),s(g,{mode:"min",active:l==="min",setMode:t=>{console.log(t.target.innerText),r(t.target.innerText.toLowerCase())}}),s(g,{mode:"max",active:l==="max",setMode:t=>r(t.target.innerText.toLowerCase())})]}),d("div",{className:"w-full lg:w-[80%] flex flex-col gap-1",children:[l!=="base"&&s("p",{className:"break-words max-w-full text-center",children:l==="min"?"*based on a hindering nature, 0 EVs, 0 IVs":"*based on a beneficial nature, 252 EVs, 31 IVs"}),l!=="base"&&d("div",{className:"w-full flex items-center py-1 gap-2",children:[d("p",{className:"w-[70px] font-semibold text-center",children:["Level: ",n]}),s("input",{type:"range",min:1,max:100,value:n,onChange:t=>M(Number.parseInt(t.target.value)),className:`flex-1 mr-2 appearance-none rounded-lg h-2
                    ${x&&f[x].backgroundColor} cursor-pointer`})]}),s(m,{label:"HP",proportion:e==null?void 0:e.hp,value:a&&a[0]}),s(m,{label:"Attack",proportion:e==null?void 0:e.atk,value:a&&a[1]}),s(m,{label:"Defense",proportion:e==null?void 0:e.def,value:a&&a[2]}),s(m,{label:"Sp. Atk",proportion:e==null?void 0:e.sp_atk,value:a&&a[3]}),s(m,{label:"Sp. Def",proportion:e==null?void 0:e.sp_def,value:a&&a[4]}),s(m,{label:"Speed",proportion:e==null?void 0:e.spd,value:a&&a[5]}),d("div",{className:"flex items-center w-full gap-1",children:[s("p",{className:"text-center w-[70px] font-semibold",children:"Total"}),s("p",{className:"flex-1 text-left font-semibold",children:a&&Object.keys(a).reduce((t,h)=>t+a[h],0)})]})]})]})};export{y as default};