import{r as n,j as e,t as u,c as m,J as y}from"./app-CQrCt728.js";import{z as N}from"./transition-DgAuGOuz.js";const v=n.createContext(),c=({children:a})=>{const[o,r]=n.useState(!1),s=()=>{r(i=>!i)};return e.jsx(v.Provider,{value:{open:o,setOpen:r,toggleOpen:s},children:e.jsx("div",{className:"relative",children:a})})},C=({children:a})=>{const{open:o,setOpen:r,toggleOpen:s}=n.useContext(v);return e.jsxs(e.Fragment,{children:[e.jsx("div",{onClick:s,children:a}),o&&e.jsx("div",{className:"fixed inset-0 z-40",onClick:()=>r(!1)})]})},L=({align:a="right",width:o="48",contentClasses:r="py-1 bg-white",children:s})=>{const{open:i,setOpen:x}=n.useContext(v);let d="origin-top";a==="left"?d="ltr:origin-top-left rtl:origin-top-right start-0":a==="right"&&(d="ltr:origin-top-right rtl:origin-top-left end-0");let l="";return o==="48"&&(l="w-48"),e.jsx(e.Fragment,{children:e.jsx(N,{show:i,enter:"transition ease-out duration-200",enterFrom:"opacity-0 scale-95",enterTo:"opacity-100 scale-100",leave:"transition ease-in duration-75",leaveFrom:"opacity-100 scale-100",leaveTo:"opacity-0 scale-95",children:e.jsx("div",{className:`absolute z-50 mt-2 rounded-md shadow-lg ${d} ${l}`,onClick:()=>x(!1),children:e.jsx("div",{className:"rounded-md ring-1 ring-black ring-opacity-5 "+r,children:s})})})})},F=({className:a="",children:o,...r})=>e.jsx(u,{...r,className:"block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:bg-gray-100 focus:outline-none "+a,children:o});c.Trigger=C;c.Content=L;c.Link=F;function p({active:a=!1,className:o="",children:r,...s}){return e.jsx(u,{...s,className:"inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none "+(a?"border-indigo-400 text-gray-900 focus:border-indigo-700":"border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 focus:border-gray-300 focus:text-gray-700")+o,children:r})}function h({active:a=!1,className:o="",children:r,...s}){return e.jsx(u,{...s,className:`flex w-full items-start border-l-4 py-2 pe-4 ps-3 ${a?"border-indigo-400 bg-indigo-50 text-indigo-700 focus:border-indigo-700 focus:bg-indigo-100 focus:text-indigo-800":"border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800 focus:border-gray-300 focus:bg-gray-50 focus:text-gray-800"} text-base font-medium transition duration-150 ease-in-out focus:outline-none ${o}`,children:r})}function z({title:a,titleId:o,...r},s){return n.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:s,"aria-labelledby":o},r),a?n.createElement("title",{id:o},a):null,n.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"}))}const b=n.forwardRef(z);function M({title:a,titleId:o,...r},s){return n.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor","aria-hidden":"true","data-slot":"icon",ref:s,"aria-labelledby":o},r),a?n.createElement("title",{id:o},a):null,n.createElement("path",{fillRule:"evenodd",d:"M5.25 9a6.75 6.75 0 0 1 13.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 0 1-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 1 1-7.48 0 24.585 24.585 0 0 1-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 4.496 0 25.057 25.057 0 0 1-4.496 0Z",clipRule:"evenodd"}))}const B=n.forwardRef(M);function A(){const[a,o]=n.useState(0),[r,s]=n.useState([]),[i,x]=n.useState(!1);n.useEffect(()=>{d();const t=setInterval(d,3e4);return()=>clearInterval(t)},[]);const d=async()=>{try{const t=await m.get("/notifications/unread-count");o(t.data.count)}catch{o(0)}},l=async()=>{try{const t=await m.get("/notifications");s(t.data.notifications)}catch{s([])}},g=async t=>{try{await m.post(`/notifications/${t}/read`),d(),l()}catch{}},f=async()=>{try{await m.post("/notifications/mark-all-read"),o(0),l()}catch{}},w=()=>{x(!i),i||l()},j=t=>{switch(t){case"sale_approved":return"✅";case"sale_rejected":return"❌";case"new_sale":return"📋";case"goal_reached":return"🎯";default:return"📢"}},k=t=>{switch(t){case"sale_approved":return"bg-green-100 text-green-800";case"sale_rejected":return"bg-red-100 text-red-800";case"new_sale":return"bg-blue-100 text-blue-800";case"goal_reached":return"bg-yellow-100 text-yellow-800";default:return"bg-gray-100 text-gray-800"}};return e.jsxs("div",{className:"relative",children:[e.jsxs("button",{onClick:w,className:"relative p-2 rounded-full hover:bg-gray-100 transition-colors duration-200",children:[a>0?e.jsx(B,{className:"h-6 w-6 text-pink-600"}):e.jsx(b,{className:"h-6 w-6 text-gray-600"}),a>0&&e.jsx("span",{className:"absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-gradient-to-r from-pink-500 to-purple-500 rounded-full transform translate-x-1/2 -translate-y-1/2",children:a>9?"9+":a})]}),i&&e.jsxs("div",{className:"absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden",children:[e.jsx("div",{className:"bg-gradient-to-r from-pink-50 to-purple-50 px-4 py-3 border-b border-gray-100",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("h3",{className:"text-lg font-semibold text-gray-800",children:"Notificações"}),a>0&&e.jsx("button",{onClick:f,className:"text-sm text-pink-600 hover:text-pink-800 font-medium",children:"Marcar todas como lidas"})]})}),e.jsx("div",{className:"max-h-96 overflow-y-auto",children:r.length>0?r.map(t=>e.jsx("div",{className:`px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200 ${t.read?"":"bg-pink-50"}`,onClick:()=>!t.read&&g(t.id),children:e.jsxs("div",{className:"flex items-start space-x-3",children:[e.jsx("div",{className:`p-2 rounded-full ${k(t.type)}`,children:e.jsx("span",{className:"text-lg",children:j(t.type)})}),e.jsxs("div",{className:"flex-1",children:[e.jsx("p",{className:"text-sm text-gray-800",children:t.message}),e.jsx("p",{className:"text-xs text-gray-500 mt-1",children:new Date(t.created_at).toLocaleString("pt-BR")})]}),!t.read&&e.jsx("div",{className:"w-2 h-2 bg-pink-500 rounded-full mt-2"})]})},t.id)):e.jsxs("div",{className:"px-4 py-8 text-center",children:[e.jsx("div",{className:"w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3",children:e.jsx(b,{className:"h-8 w-8 text-gray-400"})}),e.jsx("p",{className:"text-gray-500",children:"Nenhuma notificação no momento"})]})}),r.length>0&&e.jsx("div",{className:"px-4 py-3 bg-gray-50 border-t border-gray-100",children:e.jsx("a",{href:"/notifications",className:"text-sm text-pink-600 hover:text-pink-800 font-medium block text-center",children:"Ver todas as notificações"})})]}),i&&e.jsx("div",{className:"fixed inset-0 z-40",onClick:()=>x(!1)})]})}function $({header:a,children:o}){const r=y().props.auth.user,[s,i]=n.useState(!1),[x,d]=n.useState(!1);return n.useEffect(()=>{const l=()=>{d(window.scrollY>50)};return window.addEventListener("scroll",l),()=>window.removeEventListener("scroll",l)},[]),e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
                
                :root {
                    --primary-color: #D4A574;
                    --secondary-color: #F5E6D3;
                    --accent-color: #E8B4CB;
                    --accent-dark: #C8869B;
                    --text-dark: #2C2C2C;
                    --text-light: #666;
                    --white: #FFFFFF;
                    --gradient: linear-gradient(135deg, #D4A574 0%, #E8B4CB 100%);
                    --gradient-soft: linear-gradient(135deg, #F5E6D3 0%, #FFFFFF 100%);
                    --gradient-hero: linear-gradient(135deg, rgba(212, 165, 116, 0.95) 0%, rgba(232, 180, 203, 0.95) 100%);
                    --shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
                    --shadow-hover: 0 25px 50px rgba(0, 0, 0, 0.2);
                    --shadow-glow: 0 0 30px rgba(212, 165, 116, 0.3);
                }

                * {
                    font-family: 'Poppins', sans-serif;
                }

                .premium-bg {
                    background: linear-gradient(135deg, #F5E6D3 0%, #FFFFFF 30%, #F0F9FF 70%, #FDF2F8 100%);
                    position: relative;
                    overflow: hidden;
                }

                .floating-particles {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                    pointer-events: none;
                    z-index: 0;
                }

                .particle {
                    position: absolute;
                    background: rgba(212, 165, 116, 0.1);
                    border-radius: 50%;
                    animation: float 15s infinite linear;
                }

                @keyframes float {
                    0% {
                        transform: translateY(100vh) rotate(0deg);
                        opacity: 0;
                    }
                    10% {
                        opacity: 0.3;
                    }
                    90% {
                        opacity: 0.3;
                    }
                    100% {
                        transform: translateY(-100px) rotate(360deg);
                        opacity: 0;
                    }
                }

                .navbar-glass {
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(20px);
                    border-bottom: 1px solid rgba(212, 165, 116, 0.2);
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
                    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .navbar-scrolled {
                    background: rgba(255, 255, 255, 0.98);
                    backdrop-filter: blur(25px);
                    box-shadow: var(--shadow);
                    border-bottom: 2px solid var(--primary-color);
                }

                .logo-container {
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    position: relative;
                }

                .logo-container::before {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 0;
                    height: 0;
                    background: var(--gradient);
                    border-radius: 50%;
                    transform: translate(-50%, -50%);
                    opacity: 0;
                    transition: all 0.4s ease;
                    z-index: -1;
                }

                .logo-container:hover::before {
                    width: 120%;
                    height: 120%;
                    opacity: 0.1;
                }

                .logo-container:hover {
                    transform: scale(1.1) rotate(5deg);
                    filter: drop-shadow(0 0 20px rgba(212, 165, 116, 0.4));
                }

                .nav-link {
                    position: relative;
                    padding: 12px 20px;
                    border-radius: 15px;
                    font-weight: 600;
                    color: var(--text-dark);
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    overflow: hidden;
                }

                .nav-link::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: var(--gradient-soft);
                    transition: left 0.5s ease;
                    z-index: -1;
                }

                .nav-link:hover::before,
                .nav-link.active::before {
                    left: 0;
                }

                .nav-link:hover {
                    color: var(--primary-color);
                    transform: translateY(-3px);
                    box-shadow: 0 10px 25px rgba(212, 165, 116, 0.2);
                }

                .nav-link.active {
                    color: var(--primary-color);
                    background: var(--gradient-soft);
                    box-shadow: 0 8px 20px rgba(212, 165, 116, 0.3);
                }

                .user-dropdown {
                    background: var(--gradient-soft);
                    border: 2px solid transparent;
                    background-clip: padding-box;
                    border-radius: 20px;
                    padding: 8px 16px;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    position: relative;
                    overflow: hidden;
                }

                .user-dropdown::before {
                    content: '';
                    position: absolute;
                    top: -2px;
                    left: -2px;
                    right: -2px;
                    bottom: -2px;
                    background: var(--gradient);
                    border-radius: 20px;
                    z-index: -1;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }

                .user-dropdown:hover::before {
                    opacity: 1;
                }

                .user-dropdown:hover {
                    transform: translateY(-2px) scale(1.05);
                    box-shadow: var(--shadow-hover);
                }

                .user-avatar {
                    background: var(--gradient);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-weight: bold;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 15px rgba(212, 165, 116, 0.3);
                }

                .user-avatar:hover {
                    transform: scale(1.1) rotate(10deg);
                    box-shadow: var(--shadow-glow);
                }

                .dropdown-content {
                    background: rgba(255, 255, 255, 0.98);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(212, 165, 116, 0.2);
                    border-radius: 20px;
                    box-shadow: var(--shadow-hover);
                    overflow: hidden;
                    margin-top: 8px;
                }

                .dropdown-header {
                    background: var(--gradient-soft);
                    padding: 16px;
                    border-bottom: 1px solid rgba(212, 165, 116, 0.1);
                }

                .dropdown-link {
                    padding: 12px 16px;
                    transition: all 0.3s ease;
                    border-radius: 0;
                    margin: 4px 8px;
                    border-radius: 12px;
                }

                .dropdown-link:hover {
                    background: var(--gradient-soft);
                    color: var(--primary-color);
                    transform: translateX(5px);
                }

                .mobile-menu {
                    background: rgba(255, 255, 255, 0.98);
                    backdrop-filter: blur(20px);
                    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                    border-bottom: 1px solid rgba(212, 165, 116, 0.2);
                }

                .mobile-toggle {
                    background: var(--gradient-soft);
                    border-radius: 15px;
                    padding: 8px;
                    transition: all 0.3s ease;
                    border: 2px solid transparent;
                }

                .mobile-toggle:hover {
                    background: var(--gradient);
                    color: white;
                    transform: scale(1.1);
                    box-shadow: 0 5px 15px rgba(212, 165, 116, 0.3);
                }

                .header-section {
                    background: var(--gradient-soft);
                    border-bottom: 2px solid var(--primary-color);
                    box-shadow: var(--shadow);
                    position: relative;
                    overflow: hidden;
                }

                .header-section::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: linear-gradient(45deg, rgba(212, 165, 116, 0.05) 0%, rgba(232, 180, 203, 0.05) 100%);
                    pointer-events: none;
                }

                .main-content {
                    position: relative;
                    z-index: 1;
                }

                .animate-fadeInUp {
                    animation: fadeInUp 0.8s ease-out forwards;
                    opacity: 0;
                    transform: translateY(30px);
                }

                .animate-fadeInUp.delay-200 {
                    animation-delay: 0.2s;
                }

                @keyframes fadeInUp {
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .icon-hover {
                    transition: all 0.3s ease;
                }

                .icon-hover:hover {
                    transform: scale(1.2) rotate(10deg);
                    color: var(--primary-color);
                }

                /* Mobile responsive menu animations */
                .mobile-nav-item {
                    transition: all 0.3s ease;
                    margin: 4px 0;
                }

                .mobile-nav-item:hover {
                    transform: translateX(10px) scale(1.02);
                    background: var(--gradient-soft);
                    border-radius: 15px;
                }

                /* Scroll indicator */
                .scroll-indicator {
                    position: fixed;
                    top: 0;
                    left: 0;
                    height: 4px;
                    background: var(--gradient);
                    z-index: 9999;
                    transition: width 0.3s ease;
                }

                /* Custom scrollbar */
                ::-webkit-scrollbar {
                    width: 8px;
                }

                ::-webkit-scrollbar-track {
                    background: #f1f1f1;
                }

                ::-webkit-scrollbar-thumb {
                    background: var(--gradient);
                    border-radius: 4px;
                }

                ::-webkit-scrollbar-thumb:hover {
                    background: var(--accent-color);
                }
            `}),e.jsxs("div",{className:"min-h-screen premium-bg",children:[e.jsx("div",{className:"floating-particles",children:Array.from({length:25},(l,g)=>e.jsx("div",{className:"particle",style:{left:Math.random()*100+"%",width:Math.random()*10+4+"px",height:Math.random()*10+4+"px",animationDelay:Math.random()*15+"s",animationDuration:Math.random()*10+15+"s"}},g))}),e.jsxs("nav",{className:`fixed top-0 w-full z-50 navbar-glass ${x?"navbar-scrolled":""}`,children:[e.jsx("div",{className:"mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",children:e.jsxs("div",{className:"flex h-16 justify-between items-center",children:[e.jsxs("div",{className:"flex items-center",children:[e.jsx("div",{className:"flex shrink-0 items-center",children:e.jsx(u,{href:"/",className:"logo-container",children:e.jsx("img",{src:"/images/logo.webp",alt:"BBKits Logo",className:"object-contain drop-shadow-xl hover:drop-shadow-2xl transition-all duration-500 hover:scale-110 hover:rotate-3 filter hover:brightness-110 hover:saturate-125 cursor-pointer animate-pulse hover:animate-none rounded-xl bg-white from-white/20 to-transparent backdrop-blur-sm border border-white/30 p-1 shadow-xl hover:shadow-yellow-400/50"})})}),e.jsxs("div",{className:"hidden space-x-2 sm:-my-px sm:ms-10 sm:flex",children:[e.jsxs(p,{href:route("dashboard"),active:route().current("dashboard"),className:`nav-link flex items-center gap-2 ${route().current("dashboard")?"active":""}`,children:[e.jsx("svg",{className:"w-4 h-4 icon-hover",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"})}),"Dashboard"]}),e.jsxs(p,{href:route("sales.index"),active:route().current("sales.*"),className:`nav-link flex items-center gap-2 ${route().current("sales.*")?"active":""}`,children:[e.jsx("svg",{className:"w-4 h-4 icon-hover",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"})}),"💼 Vendas"]}),(r.role==="admin"||r.role==="financeiro")&&e.jsxs(e.Fragment,{children:[e.jsxs(p,{href:route("admin.dashboard"),active:route().current("admin.dashboard"),className:`nav-link flex items-center gap-2 ${route().current("admin.dashboard")?"active":""}`,children:[e.jsx("svg",{className:"w-4 h-4 icon-hover",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"})}),"🛡️ Admin"]}),e.jsxs(p,{href:route("admin.sales.index"),active:route().current("admin.sales.*"),className:`nav-link flex items-center gap-2 ${route().current("admin.sales.*")?"active":""}`,children:[e.jsx("svg",{className:"w-4 h-4 icon-hover",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"})}),"💰 Financeiro"]})]})]})]}),e.jsxs("div",{className:"hidden sm:ms-6 sm:flex sm:items-center gap-3",children:[e.jsx(A,{}),e.jsx("div",{className:"relative ms-3",children:e.jsxs(c,{children:[e.jsx(c.Trigger,{children:e.jsx("span",{className:"inline-flex rounded-md",children:e.jsx("button",{type:"button",className:"user-dropdown",children:e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("div",{className:"user-avatar w-8 h-8 text-xs",children:r.name.charAt(0).toUpperCase()}),e.jsx("span",{className:"hidden md:block font-semibold text-gray-700",children:r.name}),e.jsx("svg",{className:"-me-0.5 ms-2 h-4 w-4 transition-transform duration-300 group-hover:rotate-180",fill:"currentColor",viewBox:"0 0 20 20",children:e.jsx("path",{fillRule:"evenodd",d:"M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",clipRule:"evenodd"})})]})})})}),e.jsxs(c.Content,{className:"dropdown-content w-64",children:[e.jsx("div",{className:"dropdown-header",children:e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("div",{className:"user-avatar w-12 h-12 text-sm",children:r.name.charAt(0).toUpperCase()}),e.jsxs("div",{children:[e.jsx("div",{className:"font-bold text-gray-800",children:r.name}),e.jsx("div",{className:"text-sm text-gray-600",children:r.email}),e.jsxs("div",{className:"text-xs text-purple-600 font-medium mt-1",children:["✨"," ",r.role==="vendedora"?"Vendedora BBKits":r.role==="admin"?"Administrador":"Financeiro"]})]})]})}),e.jsxs(c.Link,{href:route("profile.edit"),className:"dropdown-link flex items-center gap-3",children:[e.jsx("svg",{className:"w-4 h-4 icon-hover",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"})}),"👤 Meu Perfil"]}),e.jsxs(c.Link,{href:route("logout"),method:"post",as:"button",className:"dropdown-link flex items-center gap-3 text-red-600 hover:text-red-700 hover:bg-red-50 w-full text-left",children:[e.jsx("svg",{className:"w-4 h-4 icon-hover",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"})}),"🚪 Sair"]})]})]})})]}),e.jsx("div",{className:"-me-2 flex items-center sm:hidden",children:e.jsx("button",{onClick:()=>i(!s),className:"mobile-toggle",children:e.jsxs("div",{className:"relative w-6 h-6",children:[e.jsx("div",{className:`absolute inset-0 transition-all duration-300 ${s?"opacity-0 rotate-45":"opacity-100 rotate-0"}`,children:e.jsx("svg",{className:"h-6 w-6",stroke:"currentColor",fill:"none",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M4 6h16M4 12h16M4 18h16"})})}),e.jsx("div",{className:`absolute inset-0 transition-all duration-300 ${s?"opacity-100 rotate-0":"opacity-0 -rotate-45"}`,children:e.jsx("svg",{className:"h-6 w-6",stroke:"currentColor",fill:"none",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M6 18L18 6M6 6l12 12"})})})]})})})]})}),e.jsxs("div",{className:`sm:hidden mobile-menu transition-all duration-500 ease-in-out overflow-hidden ${s?"max-h-screen opacity-100":"max-h-0 opacity-0"}`,children:[e.jsxs("div",{className:"space-y-2 pb-4 pt-4 px-4",children:[e.jsxs(h,{href:route("dashboard"),active:route().current("dashboard"),className:"mobile-nav-item flex items-center gap-3 px-4 py-3 rounded-xl",children:[e.jsx("svg",{className:"w-4 h-4 icon-hover",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"})}),"📊 Dashboard"]}),e.jsxs(h,{href:route("sales.index"),active:route().current("sales.*"),className:"mobile-nav-item flex items-center gap-3 px-4 py-3 rounded-xl",children:[e.jsx("svg",{className:"w-4 h-4 icon-hover",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"})}),"💼 Minhas Vendas"]}),(r.role==="admin"||r.role==="financeiro")&&e.jsxs(e.Fragment,{children:[e.jsxs(h,{href:route("admin.dashboard"),active:route().current("admin.dashboard"),className:"mobile-nav-item flex items-center gap-3 px-4 py-3 rounded-xl",children:[e.jsx("svg",{className:"w-4 h-4 icon-hover",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"})}),"🛡️ Admin Dashboard"]}),e.jsxs(h,{href:route("admin.sales.index"),active:route().current("admin.sales.*"),className:"mobile-nav-item flex items-center gap-3 px-4 py-3 rounded-xl",children:[e.jsx("svg",{className:"w-4 h-4 icon-hover",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"})}),"💰 Painel Financeiro"]})]})]}),e.jsxs("div",{className:"border-t border-pink-200 mx-4 py-4",children:[e.jsx("div",{className:"px-4 pb-4",children:e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("div",{className:"user-avatar w-12 h-12 text-sm",children:r.name.charAt(0).toUpperCase()}),e.jsxs("div",{children:[e.jsx("div",{className:"text-base font-bold text-gray-800",children:r.name}),e.jsx("div",{className:"text-sm text-gray-600",children:r.email}),e.jsxs("div",{className:"text-xs text-purple-600 font-medium mt-1",children:["✨"," ",r.role==="vendedora"?"Vendedora BBKits":r.role==="admin"?"Administrador":"Financeiro"]})]})]})}),e.jsxs("div",{className:"space-y-2",children:[e.jsxs(h,{href:route("profile.edit"),className:"mobile-nav-item flex items-center gap-3 px-4 py-3 rounded-xl",children:[e.jsx("svg",{className:"w-4 h-4 icon-hover",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"})}),"👤 Meu Perfil"]}),e.jsxs(h,{method:"post",href:route("logout"),as:"button",className:"mobile-nav-item flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:text-red-700 hover:bg-red-50 w-full text-left",children:[e.jsx("svg",{className:"w-4 h-4 icon-hover",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"})}),"🚪 Sair"]})]})]})]})]}),a&&e.jsx("header",{className:"header-section mt-16 border-b border-pink-100/50 relative z-10",children:e.jsx("div",{className:"mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 relative z-10",children:e.jsx("div",{className:"animate-fadeInUp",children:a})})}),e.jsx("main",{className:"pt-16 min-h-screen main-content",children:e.jsx("div",{className:"animate-fadeInUp delay-200 relative z-10",children:o})})]})]})}export{$ as A};
